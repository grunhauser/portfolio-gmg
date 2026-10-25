import type { Directive } from 'vue';

/**
 * `v-spotlight`: lets a card show a soft glow that follows the mouse.
 *
 * It only writes the pointer position into two CSS variables
 * (`--spot-x`, `--spot-y`); the look itself lives in CSS (`.spotlight`).
 * Touch screens never fire these events in a hovering way, so nothing changes there.
 */
export const vSpotlight: Directive<HTMLElement> = {
  mounted(el) {
    el.classList.add('spotlight');
    el.addEventListener('pointermove', onPointerMove);
  },
  unmounted(el) {
    el.removeEventListener('pointermove', onPointerMove);
  },
};

function onPointerMove(event: PointerEvent): void {
  const el = event.currentTarget as HTMLElement;
  const box = el.getBoundingClientRect();
  el.style.setProperty('--spot-x', `${event.clientX - box.left}px`);
  el.style.setProperty('--spot-y', `${event.clientY - box.top}px`);
}
