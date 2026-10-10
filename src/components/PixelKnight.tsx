import { useMemo } from 'react';

/**
 * Sprite map (18×22). Each character is one pixel:
 * `.` transparent, `K` outline, `S` steel, `L` steel light, `D` steel dark,
 * `V` visor glow, `P` plum cape, `Q` plum dark, `G` gold, `B` blade,
 * `W` blade highlight, `H` hilt, `T` teal tunic, `A` boot.
 */
const SPRITE: readonly string[] = [
  '..............W...',
  '.............WB...',
  '......KKKK...WB...',
  '.....KLLSSK..WB...',
  '....KLLSSSDK.WB...',
  '....KSSSSSDK.WB...',
  '....KVVVVVDK.WB...',
  '....KSSSSSDK.WB...',
  '...QKDSSSDDKQWB...',
  '..QPKKKKKKKKGGGG..',
  '..QPKLSGGSDKKHK...',
  '.QPPKLSTTSDKKHK...',
  '.QPKKLSTTSDKKK....',
  '.QPKSKSTTSDKSK....',
  '.QPKKKGGGGKKKK....',
  'QPPPKDTTTTDK......',
  'QPPPKTTKKTTK......',
  'QQPPKDDKKDDK......',
  '.QQQKSSK.KSSK.....',
  '....KDDK.KDDK.....',
  '...KAAAK.KAAAK....',
  '...KKKKK.KKKKK....',
];

const COLORS: Readonly<Record<string, string>> = {
  K: '#08111a',
  S: '#5d7f9e',
  L: '#9cc1d9',
  D: '#36506b',
  V: '#7fdcf0',
  P: '#a8648f',
  Q: '#6c3d5d',
  G: '#b8975a',
  B: '#7fb7d6',
  W: '#e4f4ff',
  H: '#4b3a2a',
  T: '#5fa8a0',
  A: '#2a3440',
};

interface PixelKnightProps {
  /** Accessible label; when omitted the sprite is treated as decorative. */
  label?: string;
  className?: string;
}

/**
 * Pixel-art knight sprite rendered as crisp SVG rects, with an idle
 * bobbing animation, a flickering visor and a glowing blade.
 */
export function PixelKnight({ label, className = '' }: PixelKnightProps) {
  const pixels = useMemo(
    () =>
      SPRITE.flatMap((row, y) =>
        [...row].flatMap((cell, x) => {
          const fill = COLORS[cell];
          return fill ? [{ x, y, fill, cell }] : [];
        }),
      ),
    [],
  );

  const width = SPRITE[0]?.length ?? 0;
  const height = SPRITE.length;

  return (
    <div className={`relative ${className}`}>
      {/* Ground shadow */}
      <div
        aria-hidden="true"
        className="absolute -bottom-2 left-1/2 h-3 w-2/3 -translate-x-1/2 bg-black/50 [clip-path:polygon(10%_0,90%_0,100%_50%,90%_100%,10%_100%,0_50%)]"
      />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        shapeRendering="crispEdges"
        className="pixelated relative h-full w-full animate-bob"
        role={label ? 'img' : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
      >
        {pixels.map(({ x, y, fill, cell }) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width={1.02}
            height={1.02}
            fill={fill}
            className={cell === 'V' || cell === 'W' ? 'animate-flicker' : undefined}
          />
        ))}
      </svg>
    </div>
  );
}
