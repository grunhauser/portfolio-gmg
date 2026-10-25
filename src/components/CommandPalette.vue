<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { LOCALES, setLocale } from '../i18n';
import { SECTIONS } from '../data/navigation';
import { EMAIL, contactChannels } from '../data/profile';
import { useClipboard } from '../composables/useClipboard';

/**
 * Keyboard-first command menu (opened with Ctrl/⌘ + K or the header button).
 *
 * Built on the native <dialog> element: `showModal()` gives focus trapping,
 * Esc to close and an inert background for free. The search field follows
 * the ARIA combobox pattern, so screen readers announce the highlighted
 * command while focus stays in the input.
 */
const open = defineModel<boolean>('open', { required: true });

const { t } = useI18n();
const { status: copyStatus, copy } = useClipboard();

interface Command {
  id: string;
  group: 'navigate' | 'language' | 'actions';
  label: string;
  run: () => void;
}

const dialog = ref<HTMLDialogElement | null>(null);
const input = ref<HTMLInputElement | null>(null);
const query = ref('');
const activeIndex = ref(0);

/** Opens a URL from the profile data in a new tab. */
function openChannel(id: 'github' | 'linkedin'): void {
  const channel = contactChannels.find((item) => item.id === id);
  if (channel) window.open(channel.href, '_blank', 'noopener');
}

/**
 * All commands, rebuilt when the language changes so labels stay translated.
 * Each `run` returns nothing; closing the menu is handled in `execute`.
 */
const commands = computed<Command[]>(() => [
  ...SECTIONS.map((id) => ({
    id: `go-${id}`,
    group: 'navigate' as const,
    label: t(`nav.${id}`),
    run: () => document.getElementById(id)?.scrollIntoView(),
  })),
  ...LOCALES.map((code) => ({
    id: `lang-${code}`,
    group: 'language' as const,
    label: t(`language.names.${code}`),
    run: () => setLocale(code),
  })),
  { id: 'copy-email', group: 'actions', label: t('palette.copyEmail'), run: () => copy(EMAIL) },
  {
    id: 'github',
    group: 'actions',
    label: t('palette.openGithub'),
    run: () => openChannel('github'),
  },
  {
    id: 'linkedin',
    group: 'actions',
    label: t('palette.openLinkedin'),
    run: () => openChannel('linkedin'),
  },
]);

/**
 * Case- and accent-insensitive match, so "itali" finds "Italiano"
 * and "esperienza" matches "Esperienza".
 */
function normalize(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

const filtered = computed(() => {
  const needle = normalize(query.value.trim());
  if (!needle) return commands.value;
  return commands.value.filter((command) => normalize(command.label).includes(needle));
});

/**
 * Groups in display order, each with its visible commands. Empty groups are dropped.
 * `commands` is already listed in this same group order, so the position of a
 * command in `filtered` matches its position on screen; arrow keys rely on that.
 */
const groups = computed(() =>
  (['navigate', 'language', 'actions'] as const)
    .map((group) => ({ group, items: filtered.value.filter((c) => c.group === group) }))
    .filter((entry) => entry.items.length > 0),
);

const activeId = computed(() => {
  const command = filtered.value[activeIndex.value];
  return command ? `command-${command.id}` : undefined;
});

// Typing changes the list, so the highlight goes back to the first match.
watch(query, () => (activeIndex.value = 0));

// Sync the native dialog with the `open` model in both directions.
watch(open, async (isOpen) => {
  if (isOpen) {
    query.value = '';
    activeIndex.value = 0;
    dialog.value?.showModal();
    await nextTick();
    input.value?.focus();
  } else if (dialog.value?.open) {
    dialog.value.close();
  }
});

/** Runs a command. Copy keeps the menu open so the "Copied" feedback can be seen. */
function execute(command: Command | undefined): void {
  if (!command) return;
  command.run();
  if (command.id !== 'copy-email') open.value = false;
}

/** Arrow keys move the highlight (wrapping around); Enter runs it. */
function onKeydown(event: KeyboardEvent): void {
  const count = filtered.value.length;
  if (event.key === 'ArrowDown' && count) {
    event.preventDefault();
    activeIndex.value = (activeIndex.value + 1) % count;
  } else if (event.key === 'ArrowUp' && count) {
    event.preventDefault();
    activeIndex.value = (activeIndex.value - 1 + count) % count;
  } else if (event.key === 'Enter') {
    event.preventDefault();
    execute(filtered.value[activeIndex.value]);
  }
}

/** Clicking the backdrop (the dialog element itself, outside the panel) closes it. */
function onDialogClick(event: MouseEvent): void {
  if (event.target === dialog.value) open.value = false;
}

/** Index of a command inside the flat filtered list, used for highlighting. */
function indexOf(command: Command): number {
  return filtered.value.indexOf(command);
}
</script>

<template>
  <dialog
    ref="dialog"
    class="palette"
    :aria-label="t('palette.title')"
    @close="open = false"
    @click="onDialogClick"
  >
    <div class="palette__panel">
      <input
        ref="input"
        v-model="query"
        class="palette__input"
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded="true"
        aria-controls="palette-list"
        :aria-activedescendant="activeId"
        :placeholder="t('palette.placeholder')"
        @keydown="onKeydown"
      />

      <div id="palette-list" role="listbox" class="palette__list" :aria-label="t('palette.title')">
        <div
          v-for="entry in groups"
          :key="entry.group"
          role="group"
          :aria-label="t(`palette.groups.${entry.group}`)"
        >
          <p class="palette__group" aria-hidden="true">{{ t(`palette.groups.${entry.group}`) }}</p>
          <div
            v-for="command in entry.items"
            :id="`command-${command.id}`"
            :key="command.id"
            role="option"
            class="palette__option"
            :class="{ 'is-active': indexOf(command) === activeIndex }"
            :aria-selected="indexOf(command) === activeIndex"
            @click="execute(command)"
            @mousemove="activeIndex = indexOf(command)"
          >
            {{ command.label }}
            <span
              v-if="command.id === 'copy-email' && copyStatus !== 'idle'"
              class="palette__feedback"
            >
              {{ copyStatus === 'copied' ? t('contact.copied') : t('contact.copyFailed') }}
            </span>
          </div>
        </div>
        <p v-if="groups.length === 0" class="palette__empty">{{ t('palette.empty') }}</p>
      </div>

      <p class="palette__hint">{{ t('palette.hint') }}</p>
      <p class="visually-hidden" aria-live="polite">
        {{ copyStatus === 'copied' ? t('contact.copied') : '' }}
      </p>
    </div>
  </dialog>
</template>

<style scoped>
.palette {
  width: min(36rem, calc(100% - var(--space-8)));
  margin: 12vh auto auto;
  padding: 0;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: 0 24px 48px rgb(0 0 0 / 0.5);
}

.palette::backdrop {
  background: rgb(0 0 0 / 0.6);
}

.palette__input {
  width: 100%;
  padding: var(--space-4);
  border: 0;
  border-bottom: 1px solid var(--color-border);
  background: transparent;
  font-size: var(--text-base);
}

.palette__input:focus-visible {
  box-shadow: none;
  border-bottom-color: var(--color-accent);
}

.palette__list {
  max-height: 22rem;
  overflow-y: auto;
  padding: var(--space-2);
}

.palette__group {
  padding: var(--space-2) var(--space-2) var(--space-1);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.palette__option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 2.5rem;
  padding: 0 var(--space-3);
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.palette__option.is-active {
  background: var(--color-surface-raised);
  box-shadow: inset 2px 0 0 var(--color-accent);
}

.palette__feedback {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-success);
}

.palette__empty {
  padding: var(--space-4);
  color: var(--color-text-muted);
}

.palette__hint {
  padding: var(--space-3) var(--space-4);
  border-top: 1px solid var(--color-border);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}
</style>
