import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'nabssku_super_secret_jwt_key_2026_q2_malang';

export interface AdminPayload {
  userId?: string;
  id?: string;
  email: string;
  name: string;
  role: string;
}

export function signAdminToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyAdminToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch (error) {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminPayload | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('admin_session')?.value;
    if (!token) return null;

    return verifyAdminToken(token);
  } catch (error) {
    return null;
  }
}
