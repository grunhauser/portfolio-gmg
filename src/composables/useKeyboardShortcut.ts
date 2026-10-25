import { onBeforeUnmount, onMounted } from 'vue';

/**
 * Runs `handler` when the user presses Ctrl + `key` (or ⌘ + `key` on macOS)
 * anywhere on the page. The listener is added on mount and removed on unmount.
 *
 * @param key - Letter to listen for, case-insensitive (e.g. `'k'`).
 * @param handler - Called once per key press.
 */
export function useKeyboardShortcut(key: string, handler: () => void): void {
  function onKeydown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === key.toLowerCase()) {
      // Stop the browser's own shortcut (Ctrl+K focuses the address bar in some browsers).
      event.preventDefault();
      handler();
    }
  }

  onMounted(() => window.addEventListener('keydown', onKeydown));
  onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown));
}
