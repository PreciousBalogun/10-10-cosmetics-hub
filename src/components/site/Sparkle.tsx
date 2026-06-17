import type { CSSProperties } from "react";

export function Sparkle({
  size = 18,
  className = "",
  style,
}: {
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path
        d="M12 0c.6 5.6 6.4 11.4 12 12-5.6.6-11.4 6.4-12 12-.6-5.6-6.4-11.4-12-12C5.6 11.4 11.4 5.6 12 0z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SparkleField({ density = 8 }: { density?: number }) {
  // deterministic scatter for SSR stability
  const dots = Array.from({ length: density }, (_, i) => {
    const seed = (i + 1) * 9301;
    const x = ((seed * 49297) % 100);
    const y = ((seed * 233280) % 100);
    const s = 10 + ((seed * 7) % 16);
    const delay = ((seed * 3) % 30) / 10;
    return { x, y, s, delay, key: i };
  });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <Sparkle
          key={d.key}
          size={d.s}
          className="absolute text-gold animate-twinkle"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            animationDelay: `${d.delay}s`,
            opacity: 0.65,
          }}
        />
      ))}
    </div>
  );
}
