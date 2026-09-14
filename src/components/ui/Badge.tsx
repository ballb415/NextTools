import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "yellow" | "purple" | "muted" | "success" | "outline";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "purple",
  size = "sm",
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-medium rounded-full shrink-0 tracking-wide";

  const variants = {
    yellow: "bg-[#181716] text-white shadow-xs",
    purple: "bg-[#EAE6DE] text-[#3A3833] border border-[#DDD7CC]",
    muted: "bg-black/[0.04] text-text-secondary border border-black/[0.06]",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200/80",
    outline: "bg-white/60 text-text-secondary border border-[#E2DDD5]",
  };

  const sizes = {
    sm: "text-[11px] px-2.5 py-0.5 font-medium",
    md: "text-xs px-3 py-1 font-medium",
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}
