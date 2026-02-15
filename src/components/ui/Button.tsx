import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  to?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  href,
  to,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium tracking-wide uppercase transition-all duration-300 rounded-none';

  const variants = {
    primary:
      'bg-black text-white hover:bg-accent dark:bg-white dark:text-black dark:hover:bg-accent dark:hover:text-white',
    secondary:
      'border border-black/20 text-black hover:border-accent hover:text-accent dark:border-white/20 dark:text-white dark:hover:border-accent dark:hover:text-accent',
    ghost:
      'text-black hover:text-accent dark:text-white dark:hover:text-accent underline-offset-4 hover:underline',
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
