import { useEffect, useRef, useState, type RefObject } from 'react';

/**
 * Reports whether an element has entered the viewport (once; it stays `true`).
 * @param threshold - Fraction of the element that must be visible.
 * @returns A ref to attach and the visibility flag.
 */
export function useInView<T extends Element>(threshold = 0.3): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, inView]);

  return [ref, inView];
}
