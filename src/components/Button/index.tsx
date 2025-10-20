import React, { memo } from 'react';

import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';

export const buttonClasses = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  destructive:
    'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
  outline:
    'border bg-background text-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
  link: 'text-primary underline-offset-4 hover:underline',
};

export const buttonSizes = {
  sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
  md: 'h-9 px-4 py-2 has-[>svg]:px-3',
  lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
  icon: 'size-9 rounded-md',
};

type Props = {
  variant?: keyof typeof buttonClasses;
  size?: keyof typeof buttonSizes;
  className?: string;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  className,
  variant = 'default',
  size = 'md',
  loading,
  children,
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        "flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        buttonClasses[variant],
        buttonSizes[size],
        className,
      )}
      data-slot="button"
      {...props}
    >
      {loading ? <LoaderCircle className="animate-spin size-4" /> : children}
    </button>
  );
}

export default memo(Button);
