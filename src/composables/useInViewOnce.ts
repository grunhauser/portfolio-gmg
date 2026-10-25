import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue';

/**
 * Tells when an element enters the viewport for the first time.
 * Used to delay work (like an API call) until the visitor scrolls to it.
 *
 * @param target - Template ref of the element to watch.
 * @param rootMargin - Starts a bit before the element is visible, so content is ready on arrival.
 * @returns A ref that turns `true` once and stays `true`.
 */
export function useInViewOnce(target: Ref<HTMLElement | null>, rootMargin = '200px') {
  const isInView = ref(false);
  let observer: IntersectionObserver | undefined;

  onMounted(() => {
    // Very old browsers: just treat the element as visible.
    if (!('IntersectionObserver' in window)) {
      isInView.value = true;
      return;
    }
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          isInView.value = true;
          observer?.disconnect();
        }
      },
      { rootMargin },
    );
    if (target.value) observer.observe(target.value);
  });

  onBeforeUnmount(() => observer?.disconnect());

  return isInView;
}
