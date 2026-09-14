import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glowOnHover?: "purple" | "yellow" | "none";
}

export function Card({
  className,
  hoverEffect = false,
  glowOnHover = "none",
  children,
  ...props
}: CardProps) {
  const glowStyles = {
    purple: "hover:border-black/15 hover:shadow-card-hover",
    yellow: "hover:border-black/15 hover:shadow-card-hover",
    none: "hover:border-black/10",
  };

  return (
    <div
      className={cn(
        "bg-white/80 backdrop-blur-xl border border-white/90 rounded-3xl p-6 sm:p-7 shadow-card transition-all duration-300",
        hoverEffect && "hover:-translate-y-1 hover:bg-white cursor-pointer hover:shadow-card-hover",
        hoverEffect && glowStyles[glowOnHover],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
