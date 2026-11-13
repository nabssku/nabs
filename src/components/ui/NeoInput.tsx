'use client';

import React, { useId } from 'react';
import { cn } from '@/lib/utils';

interface NeoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface NeoTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function NeoInput({ label, id, className, ...props }: NeoInputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-xs font-display font-bold uppercase tracking-wider text-slate-800 mb-1.5"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={cn(
          'w-full px-4 py-3 bg-pop-cream border-[2px] border-black rounded-2xl text-sm font-medium text-pop-dark placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pop-orange shadow-pop-sm',
          className
        )}
        {...props}
      />
    </div>
  );
}

export function NeoTextarea({ label, id, className, ...props }: NeoTextareaProps) {
  const generatedId = useId();
  const textareaId = id || generatedId;

  return (
    <div>
      <label
        htmlFor={textareaId}
        className="block text-xs font-display font-bold uppercase tracking-wider text-slate-800 mb-1.5"
      >
        {label}
      </label>
      <textarea
        id={textareaId}
        className={cn(
          'w-full px-4 py-3 bg-pop-cream border-[2px] border-black rounded-2xl text-sm font-medium text-pop-dark placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pop-orange shadow-pop-sm',
          className
        )}
        {...props}
      />
    </div>
  );
}
