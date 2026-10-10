import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Reveals `text` one character at a time, restarting whenever it changes.
 * Shows the full text immediately when reduced motion is preferred.
 * @param text - Text to type out.
 * @param speed - Delay between characters in milliseconds.
 * @param startDelay - Delay before typing starts in milliseconds.
 * @returns The currently visible substring and whether typing finished.
 */
export function useTypewriter(
  text: string,
  speed = 60,
  startDelay = 300,
): { output: string; done: boolean } {
  const reducedMotion = usePrefersReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    setCount(0);
    let interval: number | undefined;
    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setCount((current) => {
          if (current >= text.length) {
            window.clearInterval(interval);
            return current;
          }
          return current + 1;
        });
      }, speed);
    }, startDelay);
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [text, speed, startDelay, reducedMotion]);

  const visible = reducedMotion ? text.length : Math.min(count, text.length);
  return { output: text.slice(0, visible), done: visible >= text.length };
}
