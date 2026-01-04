import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SpotlightGridProps extends React.HTMLAttributes<HTMLDivElement> {
  gridSize?: number; // Size of grid cells (default: 50)
  spotlightRadius?: number; // Radius of spotlight (default: 300)
  opacity?: number; // Opacity of the grid lines (default: 0.1)
  spotlightColor?: string; // Color of spotlight (default: white)
}

export function SpotlightGrid({
  className,
  gridSize = 50,
  spotlightRadius = 300,
  opacity = 0.1,
  spotlightColor = "white",
  ...props
}: SpotlightGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    // Move spotlight off-screen when mouse leaves the area
    const handleMouseLeave = () => {
       setPosition({ x: -1000, y: -1000 });
    };

    const container = containerRef.current;
    if (container && container.parentElement) {
        container.parentElement.addEventListener("mousemove", handleMouseMove);
        container.parentElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
        if (container && container.parentElement) {
            container.parentElement.removeEventListener("mousemove", handleMouseMove);
            container.parentElement.removeEventListener("mouseleave", handleMouseLeave);
        }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      {...props}
    >
      <div
        className="absolute inset-0"
        style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, ${opacity}) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, ${opacity}) 1px, transparent 1px)
            `,
            backgroundSize: `${gridSize}px ${gridSize}px`,
            maskImage: `radial-gradient(circle ${spotlightRadius}px at ${position.x}px ${position.y}px, black, transparent)`,
            WebkitMaskImage: `radial-gradient(circle ${spotlightRadius}px at ${position.x}px ${position.y}px, black, transparent)`,
        }}
      />

      {/* Base grid (always visible but faint) */}
       <div
        className="absolute inset-0"
        style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, ${opacity * 0.3}) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, ${opacity * 0.3}) 1px, transparent 1px)
            `,
            backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />
    </div>
  );
}
