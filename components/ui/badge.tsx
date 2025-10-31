import * as React from 'react';
import { cn } from '@/lib/utils';

type Variant = 'default' | 'success' | 'warning' | 'outline';

export function Badge({ className, variant = 'default', ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  const styles: Record<Variant, string> = {
    default: 'bg-pg.primary text-white',
    success: 'bg-pg-success text-white',
    warning: 'bg-pg-accent text-white',
    outline: 'ring-1 ring-black/10 text-pg-text'
  };
  return (
    <span
      className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', styles[variant], className)}
      {...props}
    />
  );
}

