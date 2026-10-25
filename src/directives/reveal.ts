import type { Directive } from 'vue';

/**
 * `v-reveal`: fades an element in the first time it scrolls into view.
 *
 * The element starts with the `reveal` class (hidden by CSS) and gets
 * `reveal--visible` once it intersects the viewport. Without
 * IntersectionObserver the element is shown at once, so content is never
 * lost. Reduced-motion users get no animation (see base.css).
 */
export const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    if (!('IntersectionObserver' in window)) return;

    el.classList.add('reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.classList.add('reveal--visible');
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(el);
    // Kept on the element so `unmounted` can stop watching it.
    (el as HTMLElement & { _revealObserver?: IntersectionObserver })._revealObserver = observer;
  },
  unmounted(el) {
    (el as HTMLElement & { _revealObserver?: IntersectionObserver })._revealObserver?.disconnect();
  },
};
