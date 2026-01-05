import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";

interface MagneticButtonProps extends ButtonProps {
  strength?: number; // How strong the magnetic pull is (default: 0.5)
  activeScale?: number; // Scale when clicked (default: 0.95)
}

export function MagneticButton({
  strength = 0.5,
  activeScale = 0.95,
  className,
  children,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

    const x = (clientX - (left + width / 2)) * strength;
    const y = (clientY - (top + height / 2)) * strength;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsPressed(false);
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  return (
    <Button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={cn(
        "relative transition-transform duration-200 ease-out will-change-transform",
        className
      )}
      style={{
        transform: `translate(${position.x}px, ${position.y}px) scale(${isPressed ? activeScale : 1})`,
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
