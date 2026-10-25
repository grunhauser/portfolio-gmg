import { onBeforeUnmount, ref } from 'vue';

/** What happened with the last copy attempt. */
export type CopyStatus = 'idle' | 'copied' | 'failed';

/**
 * Copies text to the clipboard and exposes the result for a short time,
 * so the UI can show "Copied" feedback and then go back to normal.
 *
 * @param resetAfterMs - How long the status stays visible before returning to `idle`.
 */
export function useClipboard(resetAfterMs = 2000) {
  const status = ref<CopyStatus>('idle');
  let timer: ReturnType<typeof setTimeout> | undefined;

  /**
   * Writes `text` to the clipboard. The Clipboard API only works on HTTPS
   * (or localhost) and can be refused by the browser, so failure is a normal
   * outcome that the UI must show, not an exception to throw.
   */
  async function copy(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      status.value = 'copied';
    } catch {
      status.value = 'failed';
    }
    clearTimeout(timer);
    timer = setTimeout(() => (status.value = 'idle'), resetAfterMs);
  }

  // Avoid updating state after the component that owns it is gone.
  onBeforeUnmount(() => clearTimeout(timer));

  return { status, copy };
}
