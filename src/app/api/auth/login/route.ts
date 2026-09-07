import { NextRequest, NextResponse } from 'next/server';
import { sql, initDatabase } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { signAdminToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    await initDatabase();
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email dan password wajib diisi' }, { status: 400 });
    }

    const users = await sql`
      SELECT id, email, password_hash, name, role FROM users WHERE email = ${email} LIMIT 1;
    `;

    if (users.length === 0) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return NextResponse.json({ error: 'Email atau password salah' }, { status: 401 });
    }

    const token = signAdminToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const response = NextResponse.json({
      success: true,
      message: 'Login berhasil!',
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });

    response.cookies.set('nabs_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: error.message || 'Gagal login' }, { status: 500 });
  }
}
