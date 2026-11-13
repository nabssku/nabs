import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      'JWT_SECRET environment variable is missing or too short (minimum 16 characters).'
    );
  }
  return secret;
}

export interface AdminPayload {
  userId?: string;
  id?: string;
  email: string;
  name: string;
  role: string;
}

export function signAdminToken(payload: AdminPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '7d' });
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, getJwtSecret()) as AdminPayload;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminPayload | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('admin_session')?.value;
    if (!token) return null;

    return verifyAdminToken(token);
  } catch {
    return null;
  }
}
