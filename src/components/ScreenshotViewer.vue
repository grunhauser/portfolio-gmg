<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import type { ProjectScreen } from '../types';

/**
 * Full-size screenshot viewer (lightbox) for one project.
 * Same approach as the command menu: a native <dialog> opened with
 * `showModal()`, so Esc, focus trapping and the dimmed background come
 * from the browser. Left/right arrow keys move between screenshots.
 */
const props = defineProps<{
  screens: ProjectScreen[];
  /** Project title, used as the dialog's accessible name. */
  title: string;
}>();

const open = defineModel<boolean>('open', { required: true });
/** Index of the screenshot on display; the card sets it before opening. */
const index = defineModel<number>('index', { required: true });

const { t } = useI18n();
const dialog = ref<HTMLDialogElement | null>(null);

const current = computed(() => props.screens[index.value] ?? props.screens[0]!);

function sync(isOpen: boolean): void {
  if (isOpen && !dialog.value?.open) dialog.value?.showModal();
  else if (!isOpen && dialog.value?.open) dialog.value.close();
}

// The parent mounts this component already open, so sync once on mount too.
onMounted(() => sync(open.value));
watch(open, sync);

/** Moves by `step` screenshots, wrapping around at both ends. */
function move(step: number): void {
  const total = props.screens.length;
  index.value = (index.value + step + total) % total;
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'ArrowRight') move(1);
  if (event.key === 'ArrowLeft') move(-1);
}

/** A click on the dimmed area outside the panel closes the viewer. */
function onDialogClick(event: MouseEvent): void {
  if (event.target === dialog.value) open.value = false;
}

/** Files live in public/, so the path needs Vite's base URL in front. */
function src(screen: ProjectScreen): string {
  return `${import.meta.env.BASE_URL}work/${screen.file}`;
}
</script>

<template>
  <dialog
    ref="dialog"
    class="viewer"
    :aria-label="title"
    @close="open = false"
    @click="onDialogClick"
    @keydown="onKeydown"
  >
    <figure class="viewer__panel">
      <img
        :src="src(current)"
        :alt="t(`projects.screens.${current.id}`)"
        class="viewer__image"
        :class="{ 'viewer__image--mobile': current.mobile }"
      />
      <figcaption class="viewer__caption">
        <span>{{ t(`projects.screens.${current.id}`) }}</span>
        <span class="viewer__counter">{{
          t('projects.viewer.counter', { current: index + 1, total: screens.length })
        }}</span>
      </figcaption>
    </figure>

    <div class="viewer__controls">
      <button
        v-if="screens.length > 1"
        type="button"
        class="button button--small"
        :aria-label="t('projects.viewer.previous')"
        @click="move(-1)"
      >
        ←
      </button>
      <button
        v-if="screens.length > 1"
        type="button"
        class="button button--small"
        :aria-label="t('projects.viewer.next')"
        @click="move(1)"
      >
        →
      </button>
      <button type="button" class="button button--small" @click="open = false">
        {{ t('projects.viewer.close') }}
      </button>
    </div>
  </dialog>
</template>

<style scoped>
.viewer {
  width: min(72rem, calc(100% - var(--space-8)));
  max-height: calc(100vh - var(--space-8));
  padding: var(--space-4);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
}

.viewer::backdrop {
  background: rgb(0 0 0 / 0.75);
}

.viewer__panel {
  margin: 0;
}

.viewer__image {
  display: block;
  width: 100%;
  max-height: 72vh;
  object-fit: contain;
  border-radius: var(--radius-sm);
}

.viewer__image--mobile {
  width: auto;
  margin-inline: auto;
}

.viewer__caption {
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
  margin-top: var(--space-3);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.viewer__counter {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
}

.viewer__controls {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
  margin-top: var(--space-3);
}
</style>
