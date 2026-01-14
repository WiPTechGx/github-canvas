import { useEffect, useState } from "react";

export function NoiseOverlay() {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Fade in to avoid harsh transition
    const timer = setTimeout(() => setOpacity(1), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[50] transition-opacity duration-1000"
      style={{
        opacity,
        mixBlendMode: "overlay",
      }}
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}
