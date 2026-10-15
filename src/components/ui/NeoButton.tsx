import React from 'react';
import { cn } from '@/lib/utils';

type NeoButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon';
type NeoButtonSize = 'sm' | 'md' | 'lg';

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: NeoButtonVariant;
  size?: NeoButtonSize;
  asChild?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

const variantStyles: Record<NeoButtonVariant, string> = {
  primary:
    'bg-pop-orange text-black border-[3px] border-black shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-sm active:shadow-none',
  secondary:
    'bg-white text-black border-[3px] border-black shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-sm active:shadow-none',
  ghost:
    'bg-pop-yellow border-[2px] border-black shadow-pop-sm hover:bg-pop-yellow/80',
  icon:
    'bg-white border-[2px] border-black shadow-pop-sm hover:bg-slate-100',
};

const sizeStyles: Record<NeoButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-xl gap-1',
  md: 'px-4 py-2.5 text-xs rounded-xl gap-1.5',
  lg: 'px-6 py-3.5 text-base rounded-2xl gap-2',
};

export default function NeoButton({
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  className,
  children,
  ...props
}: NeoButtonProps) {
  const classes = cn(
    'font-display font-bold transition cursor-pointer flex items-center justify-center',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
