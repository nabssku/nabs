import { NextRequest, NextResponse } from 'next/server';
import { sql, initDatabase, syncEnvAdminUser } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { signAdminToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json(
        {
          error:
            'Konfigurasi server belum lengkap: DATABASE_URL belum diatur di Environment Variables.',
        },
        { status: 503 }
      );
    }

    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 16) {
      return NextResponse.json(
        {
          error:
            'Konfigurasi server belum lengkap: JWT_SECRET belum diatur atau kurang dari 16 karakter.',
        },
        { status: 503 }
      );
    }

    const initResult = await initDatabase();
    if (!initResult.success) {
      throw initResult.error instanceof Error
        ? initResult.error
        : new Error('Database initialization failed');
    }

    await syncEnvAdminUser();

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Email dan password wajib diisi' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    const users = await sql`
      SELECT * FROM users 
      WHERE LOWER(email) = ${trimmedEmail} 
      LIMIT 1;
    `;

    if (users.length === 0) {
      const anyUsers = await sql`SELECT id FROM users LIMIT 1;`;
      if (anyUsers.length === 0) {
        return NextResponse.json(
          {
            error:
              'Akun admin belum tersedia. Set ADMIN_EMAIL dan ADMIN_PASSWORD di Environment Variables lalu redeploy.',
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    const user = users[0];

    const isValid = await bcrypt.compare(password, user.password_hash as string);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    const token = signAdminToken({
      userId: user.id as string,
      email: user.email as string,
      name: user.name as string,
      role: (user.role as string) || 'admin',
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    const isHttps =
      req.nextUrl.protocol === 'https:' ||
      req.headers.get('x-forwarded-proto') === 'https';

    response.cookies.set({
      name: 'admin_session',
      value: token,
      httpOnly: true,
      secure: isHttps,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}
