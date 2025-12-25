import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  glow?: "primary" | "secondary" | "none";
  hover?: boolean;
  accent?: "green" | "teal" | "purple" | "none";
  active?: boolean;
}

export function GlassPanel({ 
  children, 
  className, 
  glow = "none",
  hover = false,
  accent = "none",
  active = false
}: GlassPanelProps) {
  const accentStyles = {
    green: "before:bg-gradient-to-br before:from-primary/10 before:to-transparent border-primary/20 shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.15)]",
    teal: "before:bg-gradient-to-br before:from-secondary/10 before:to-transparent border-secondary/20 shadow-[0_8px_32px_-8px_hsl(var(--secondary)/0.15)]",
    purple: "before:bg-gradient-to-br before:from-chart-3/10 before:to-transparent border-chart-3/20 shadow-[0_8px_32px_-8px_hsl(var(--chart-3)/0.15)]",
    none: ""
  };

  const activeStyles = {
    green: "shadow-[0_0_40px_-4px_hsl(var(--primary)/0.4),0_8px_32px_-8px_hsl(var(--primary)/0.3)] border-primary/40",
    teal: "shadow-[0_0_40px_-4px_hsl(var(--secondary)/0.4),0_8px_32px_-8px_hsl(var(--secondary)/0.3)] border-secondary/40",
    purple: "shadow-[0_0_40px_-4px_hsl(var(--chart-3)/0.4),0_8px_32px_-8px_hsl(var(--chart-3)/0.3)] border-chart-3/40",
    none: ""
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl p-6 transition-all duration-300",
        "bg-background/40 backdrop-blur-xl",
        "border border-border/30",
        "before:absolute before:inset-0 before:rounded-xl before:pointer-events-none",
        hover && "hover:scale-[1.02] hover:shadow-lg cursor-pointer hover:border-border/50",
        glow === "primary" && "shadow-glow",
        glow === "secondary" && "shadow-glow-secondary",
        accent !== "none" && accentStyles[accent],
        active && accent !== "none" && activeStyles[accent],
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
