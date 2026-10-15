import React from 'react';
import { cn } from '@/lib/utils';

type NeoCardVariant = 'default' | 'interactive' | 'static';

interface NeoCardProps {
  children: React.ReactNode;
  variant?: NeoCardVariant;
  className?: string;
  padding?: boolean;
}

const variantStyles: Record<NeoCardVariant, string> = {
  default: 'bg-white border-[3px] border-black rounded-3xl shadow-pop',
  interactive:
    'bg-white border-[3px] border-black rounded-3xl shadow-pop hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-pop-sm transition',
  static: 'bg-white border-[3px] border-black rounded-3xl shadow-pop',
};

export default function NeoCard({ children, variant = 'default', className, padding = true }: NeoCardProps) {
  return (
    <div className={cn(variantStyles[variant], padding && 'p-6 sm:p-8', className)}>
      {children}
    </div>
  );
}
