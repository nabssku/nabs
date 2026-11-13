'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageOff } from 'lucide-react';

const ALLOWED_NEXT_IMAGE_HOSTS = new Set([
  'images.unsplash.com',
  'res.cloudinary.com',
  'raw.githubusercontent.com',
  'avatars.githubusercontent.com',
]);

function isNextImageOptimizedHost(src: string): boolean {
  if (src.startsWith('/')) return true;
  try {
    const parsed = new URL(src);
    return parsed.protocol === 'https:' && ALLOWED_NEXT_IMAGE_HOSTS.has(parsed.hostname);
  } catch {
    return false;
  }
}

interface SmartImageProps {
  src?: string | null;
  alt: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  fallbackText?: string;
}

/**
 * Renders Next.js <Image> for whitelisted CDN hosts and safely falls back to standard <img>
 * or a Neo-Brutalist placeholder if the URL is from an unlisted domain, empty, or fails to load.
 */
export default function SmartImage({
  src,
  alt,
  fill = true,
  sizes = '100vw',
  priority = false,
  className = 'object-cover',
  fallbackText,
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);

  const trimmed = src?.trim() || '';
  const isValidSrc =
    trimmed.length > 0 &&
    (trimmed.startsWith('/') || trimmed.startsWith('https://') || trimmed.startsWith('http://'));

  if (!isValidSrc || hasError) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-pop-yellow/40 text-pop-dark p-4 text-center">
        {fallbackText ? (
          <span className="font-display font-black text-4xl sm:text-5xl tracking-tight">
            {fallbackText}
          </span>
        ) : (
          <>
            <ImageOff className="w-8 h-8 mb-1.5 opacity-70" aria-hidden="true" />
            <span className="font-comic text-xs font-bold opacity-80">Preview Unavailable</span>
          </>
        )}
      </div>
    );
  }

  if (isNextImageOptimizedHost(trimmed)) {
    return (
      <Image
        src={trimmed}
        alt={alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={className}
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <img
      src={trimmed}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
      className={fill ? `absolute inset-0 w-full h-full ${className}` : className}
    />
  );
}
