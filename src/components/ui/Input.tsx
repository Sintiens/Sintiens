import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`flex h-12 w-full bg-surface-dim/20 border-b border-outline-variant px-4 py-2 text-body-md font-sans placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:bg-surface-dim/40 transition-all disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
