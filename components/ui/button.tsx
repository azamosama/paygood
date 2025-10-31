import * as React from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'ghost';

export function Button({ className, variant = 'primary', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const styles: Record<Variant, string> = {
    primary: 'bg-pg-primary text-white hover:bg-pg-primaryDark',
    outline: 'ring-1 ring-black/10 hover:bg-black/5',
    ghost: 'hover:bg-black/5'
  };
  return (
    <button
      className={cn('inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors', styles[variant], className)}
      {...props}
    />
  );
}

