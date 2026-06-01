import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
    
    const baseStyles = "inline-flex items-center justify-center rounded-md text-technical-sm font-mono transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";
    
    const variants = {
      primary: "bg-primary text-on-primary hover:brightness-110 border border-transparent shadow-sm",
      secondary: "bg-surface-container border border-outline-variant text-on-surface hover:bg-surface-variant",
      outline: "bg-transparent border border-primary text-primary hover:bg-primary/5",
      ghost: "bg-transparent text-on-surface hover:bg-surface-variant border border-transparent",
    };
    
    const sizes = {
      sm: "h-8 px-4 text-[10px]",
      md: "h-11 px-6",
      lg: "h-14 px-8 text-base tracking-widest",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
