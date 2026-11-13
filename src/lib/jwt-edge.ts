/**
 * Edge-compatible HS256 JWT verification using Web Crypto API (crypto.subtle).
 * Used by Next.js middleware where Node's `crypto` module is unavailable.
 */

function base64UrlToUint8Array(base64Url: string): Uint8Array {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(base64 + padding);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function decodeJwtPayload(base64Url: string): Record<string, unknown> | null {
  try {
    const bytes = base64UrlToUint8Array(base64Url);
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function verifyAdminTokenEdge(token: string): Promise<boolean> {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 16) return false;

    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const [headerB64, payloadB64, signatureB64] = parts;
    const header = decodeJwtPayload(headerB64);
    if (!header || header.alg !== 'HS256') return false;

    const payload = decodeJwtPayload(payloadB64);
    if (!payload) return false;

    // Check token expiration if present
    if (typeof payload.exp === 'number') {
      const nowSeconds = Math.floor(Date.now() / 1000);
      if (payload.exp <= nowSeconds) return false;
    }

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const data = encoder.encode(`${headerB64}.${payloadB64}`);
    const signature = base64UrlToUint8Array(signatureB64);

    return await crypto.subtle.verify(
      'HMAC',
      key,
      signature as unknown as BufferSource,
      data
    );
  } catch {
    return false;
  }
}
