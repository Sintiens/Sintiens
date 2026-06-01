import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'solid' | 'glass' | 'outline' | 'flat';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'solid', ...props }, ref) => {
    const baseStyles = "rounded-md overflow-hidden transition-all duration-500";
    const variants = {
      solid: "bg-surface-container border border-outline-variant text-on-surface",
      glass: "bg-surface/70 backdrop-blur-xl border border-outline-variant/50 text-on-surface",
      outline: "bg-transparent border border-outline-variant text-on-surface",
      flat: "bg-surface-dim/30 text-on-surface",
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`px-8 py-5 border-b border-outline-variant/30 flex flex-col gap-1 ${className}`}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', ...props }, ref) => (
    <h3
      ref={ref}
      className={`text-technical-sm tracking-widest text-primary font-bold ${className}`}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`p-8 ${className}`} {...props} />
  )
);
CardContent.displayName = 'CardContent';
