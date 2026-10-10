import type { Config } from 'tailwindcss';

/**
 * Tailwind theme for the "Frozen Keep" palette.
 * Colors reference CSS variables declared in `src/index.css`, so the palette
 * can be changed in a single place. The `<alpha-value>` placeholder keeps
 * Tailwind opacity modifiers (e.g. `bg-panel/80`) working.
 */
const withAlpha = (variable: string): string => `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: withAlpha('--color-bg'),
        panel: withAlpha('--color-panel'),
        border: withAlpha('--color-border'),
        ice: withAlpha('--color-ice'),
        teal: withAlpha('--color-teal'),
        violet: withAlpha('--color-violet'),
        plum: withAlpha('--color-plum'),
        gold: withAlpha('--color-gold'),
        text: withAlpha('--color-text'),
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        body: ['VT323', 'monospace'],
      },
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        drift: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        flicker: {
          '0%, 100%': { opacity: '1', transform: 'scaleY(1)' },
          '50%': { opacity: '0.75', transform: 'scaleY(0.85)' },
        },
      },
      animation: {
        bob: 'bob 2.4s steps(4, end) infinite',
        drift: 'drift 120s linear infinite',
        'drift-slow': 'drift 220s linear infinite',
        twinkle: 'twinkle 3s steps(3, end) infinite',
        blink: 'blink 1s steps(1, end) infinite',
        flicker: 'flicker 0.6s steps(2, end) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
