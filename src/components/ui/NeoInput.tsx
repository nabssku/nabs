import React from 'react';
import { cn } from '@/lib/utils';

interface NeoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

interface NeoTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function NeoInput({ label, className, ...props }: NeoInputProps) {
  return (
    <div>
      <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1.5">
        {label}
      </label>
      <input
        className={cn(
          'w-full px-4 py-3 bg-pop-cream border-[2px] border-black rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pop-yellow shadow-pop-sm',
          className
        )}
        {...props}
      />
    </div>
  );
}

export function NeoTextarea({ label, className, ...props }: NeoTextareaProps) {
  return (
    <div>
      <label className="block text-xs font-display font-bold uppercase tracking-wider text-slate-700 mb-1.5">
        {label}
      </label>
      <textarea
        className={cn(
          'w-full px-4 py-3 bg-pop-cream border-[2px] border-black rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pop-yellow shadow-pop-sm',
          className
        )}
        {...props}
      />
    </div>
  );
}
