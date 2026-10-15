import React from 'react';
import { cn } from '@/lib/utils';
import NeoBadge from './NeoBadge';
import { LucideIcon } from 'lucide-react';

type NeoBadgeColor = 'yellow' | 'orange' | 'blue' | 'green' | 'pink' | 'purple' | 'white' | 'black';

interface SectionHeaderProps {
  badge: string;
  badgeColor?: NeoBadgeColor;
  badgeIcon?: LucideIcon;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({
  badge,
  badgeColor = 'yellow',
  badgeIcon,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('space-y-3', align === 'center' && 'text-center', className)}>
      <NeoBadge color={badgeColor} icon={badgeIcon}>
        {badge}
      </NeoBadge>
      <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-pop-dark">
        {title}
      </h2>
      {description && (
        <p className={cn(
          'text-slate-600 font-medium text-sm sm:text-base',
          align === 'center' ? 'max-w-xl mx-auto' : 'max-w-xl'
        )}>
          {description}
        </p>
      )}
    </div>
  );
}
