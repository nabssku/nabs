import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

type NeoBadgeColor = 'yellow' | 'orange' | 'blue' | 'green' | 'pink' | 'purple' | 'white' | 'black';

interface NeoBadgeProps {
  children: React.ReactNode;
  color?: NeoBadgeColor;
  icon?: LucideIcon;
  className?: string;
}

const colorMap: Record<NeoBadgeColor, string> = {
  yellow: 'bg-pop-yellow',
  orange: 'bg-pop-orange',
  blue: 'bg-pop-blue',
  green: 'bg-pop-green',
  pink: 'bg-pop-pink',
  purple: 'bg-pop-purple',
  white: 'bg-white',
  black: 'bg-black text-white',
};

export default function NeoBadge({ children, color = 'yellow', icon: Icon, className }: NeoBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 border-[2px] border-black rounded-xl shadow-pop-sm font-display font-bold text-xs uppercase tracking-wider text-black',
        colorMap[color],
        color === 'black' && 'text-white',
        className
      )}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </div>
  );
}
