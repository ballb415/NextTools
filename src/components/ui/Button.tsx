import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "yellow" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-charcoal/20 focus-visible:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none rounded-full active:scale-[0.98]";

    const variants = {
      primary:
        "bg-brand-charcoal hover:bg-neutral-800 text-white shadow-pill hover:shadow-md border border-black/10",
      yellow:
        "bg-brand-charcoal hover:bg-neutral-800 text-white font-semibold shadow-pill hover:shadow-md border border-black/10",
      secondary:
        "bg-white/90 hover:bg-white text-text-primary border border-black/[0.08] shadow-xs hover:shadow-sm",
      outline:
        "bg-white/70 hover:bg-white text-text-primary border border-black/[0.12] hover:border-black/25 shadow-xs",
      ghost:
        "bg-transparent hover:bg-black/[0.04] text-text-secondary hover:text-text-primary",
      danger:
        "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200",
    };

    const sizes = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-6 py-3 gap-2.5 font-semibold",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
