import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export const dynamic = 'force-dynamic';

// Simple in-memory rate limit per IP (5 submissions per 10 minutes)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const ipRequests = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipRequests.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) {
    ipRequests.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  ipRequests.set(ip, timestamps);
  return false;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, website } = body;

    // Honeypot check: silently return success for automated bots
    if (typeof website === 'string' && website.trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Thank you! Your message has been sent.',
      });
    }

    const clientIp =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: 'Too many messages sent. Please wait a few minutes before trying again.' },
        { status: 429 }
      );
    }

    const cleanName = typeof name === 'string' ? name.trim() : '';
    const cleanEmail = typeof email === 'string' ? email.trim() : '';
    const cleanMessage = typeof message === 'string' ? message.trim() : '';

    if (cleanName.length < 2 || cleanName.length > 100) {
      return NextResponse.json(
        { error: 'Please enter a valid name (2–100 characters).' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(cleanEmail) || cleanEmail.length > 255) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (cleanMessage.length < 10 || cleanMessage.length > 2000) {
      return NextResponse.json(
        { error: 'Please write a message between 10 and 2000 characters.' },
        { status: 400 }
      );
    }

    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    await sql`
      INSERT INTO contact_messages (id, sender_name, sender_email, message, is_read)
      VALUES (${messageId}, ${cleanName}, ${cleanEmail}, ${cleanMessage}, false);
    `;

    return NextResponse.json({
      success: true,
      message: 'Message sent! Thanks for reaching out — I will reply within 24 hours.',
    });
  } catch (error) {
    console.error('Contact submit error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or reach out via email directly.' },
      { status: 500 }
    );
  }
}
