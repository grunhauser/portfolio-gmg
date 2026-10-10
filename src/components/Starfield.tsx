import { useMemo } from 'react';

interface Star {
  left: number;
  top: number;
  size: number;
  delay: number;
  color: string;
}

const STAR_COLORS = ['bg-ice', 'bg-text', 'bg-violet', 'bg-teal'];

/** Deterministic pseudo-random generator so stars stay stable across renders. */
function seeded(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

function createStars(count: number, seed: number): Star[] {
  const random = seeded(seed);
  return Array.from({ length: count }, () => ({
    left: random() * 100,
    top: random() * 100,
    size: random() > 0.85 ? 4 : 2,
    delay: random() * 3,
    color: STAR_COLORS[Math.floor(random() * STAR_COLORS.length)] ?? 'bg-ice',
  }));
}

/**
 * Fixed, decorative background: twinkling stars drifting slowly sideways
 * plus a layer of pixel clouds. Animations are disabled by the global
 * `prefers-reduced-motion` rule.
 */
export function Starfield() {
  const near = useMemo(() => createStars(70, 7), []);
  const far = useMemo(() => createStars(90, 42), []);

  const renderLayer = (stars: Star[], animation: string, opacity: string) => (
    <div className={`absolute inset-y-0 left-0 flex w-[200%] ${animation} ${opacity}`}>
      {[0, 1].map((copy) => (
        <div key={copy} className="relative h-full w-1/2">
          {stars.map((star, index) => (
            <span
              key={index}
              className={`absolute animate-twinkle ${star.color}`}
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: star.size,
                height: star.size,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(var(--color-violet)/0.12),transparent_60%),radial-gradient(ellipse_at_bottom,rgb(var(--color-teal)/0.10),transparent_55%)]" />
      {renderLayer(far, 'animate-drift-slow', 'opacity-60')}
      {renderLayer(near, 'animate-drift', 'opacity-90')}
      <div className="absolute inset-x-0 top-[18%] flex w-[200%] animate-drift-slow opacity-20">
        {[0, 1].map((copy) => (
          <div key={copy} className="relative h-24 w-1/2">
            <PixelCloud className="absolute left-[8%] top-0 w-40" />
            <PixelCloud className="absolute left-[55%] top-10 w-56" />
            <PixelCloud className="absolute left-[80%] top-2 w-32" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Small pixel-art cloud drawn with rects. */
function PixelCloud({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 10"
      className={`pixelated ${className}`}
      shapeRendering="crispEdges"
      fill="rgb(var(--color-ice))"
    >
      <rect x="6" y="0" width="8" height="2" />
      <rect x="16" y="2" width="8" height="2" />
      <rect x="2" y="2" width="26" height="4" />
      <rect x="0" y="6" width="32" height="4" />
    </svg>
  );
}
