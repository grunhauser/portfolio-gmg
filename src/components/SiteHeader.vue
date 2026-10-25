<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from './LanguageSwitcher.vue';
import { SECTIONS } from '../data/navigation';

/** Sticky top bar: name, section links, command-menu trigger and language switcher. */
const emit = defineEmits<{ 'open-palette': [] }>();
const { t } = useI18n();

/** Shows ⌘K on Apple devices and Ctrl K elsewhere, matching the real shortcut. */
const shortcutLabel = computed(() =>
  /Mac|iPhone|iPad/.test(navigator.userAgent) ? '⌘K' : 'Ctrl K',
);
</script>

<template>
  <header class="site-header">
    <div class="container site-header__inner">
      <a href="#top" class="site-header__brand">gmg<span aria-hidden="true">_</span></a>

      <nav class="site-header__nav" :aria-label="t('nav.label')">
        <ul>
          <li v-for="id in SECTIONS" :key="id">
            <a :href="`#${id}`">{{ t(`nav.${id}`) }}</a>
          </li>
        </ul>
      </nav>

      <div class="site-header__tools">
        <button
          type="button"
          class="site-header__palette"
          :aria-label="t('palette.open')"
          aria-haspopup="dialog"
          @click="emit('open-palette')"
        >
          <kbd>{{ shortcutLabel }}</kbd>
        </button>
        <LanguageSwitcher />
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-bg) 88%, transparent);
  backdrop-filter: blur(8px);
}

.site-header__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2) var(--space-6);
  min-height: var(--header-height);
  padding-block: var(--space-2);
}

.site-header__brand {
  font-family: var(--font-mono);
  font-weight: 500;
  text-decoration: none;
}

.site-header__brand span {
  color: var(--color-accent);
}

/* On narrow screens the links move to their own scrollable row. */
.site-header__nav {
  order: 3;
  width: 100%;
  overflow-x: auto;
}

.site-header__nav ul {
  display: flex;
  gap: var(--space-4);
}

.site-header__nav a {
  display: inline-block;
  padding-block: var(--space-2);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  text-decoration: none;
  white-space: nowrap;
}

.site-header__nav a:hover {
  color: var(--color-text);
}

.site-header__tools {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-left: auto;
}

.site-header__palette {
  min-height: 2.5rem;
  padding: 0 var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: transparent;
  cursor: pointer;
}

.site-header__palette:hover {
  border-color: var(--color-border-strong);
}

.site-header__palette kbd {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

@media (min-width: 900px) {
  .site-header__nav {
    order: 0;
    width: auto;
    overflow: visible;
  }
}
</style>
