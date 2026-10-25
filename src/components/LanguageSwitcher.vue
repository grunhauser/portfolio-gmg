<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { LOCALES, setLocale } from '../i18n';

/**
 * Segmented control with the three languages always visible
 * (a dropdown would hide options for no reason when there are only three).
 * Each button reports its state with aria-pressed.
 */
const { t, locale } = useI18n();
</script>

<template>
  <div class="language-switcher" role="group" :aria-label="t('language.label')">
    <button
      v-for="code in LOCALES"
      :key="code"
      type="button"
      class="language-switcher__option"
      :class="{ 'is-active': locale === code }"
      :aria-pressed="locale === code"
      :lang="code"
      :title="t(`language.names.${code}`)"
      @click="setLocale(code)"
    >
      {{ code.toUpperCase() }}
      <span class="visually-hidden">{{ t(`language.names.${code}`) }}</span>
    </button>
  </div>
</template>

<style scoped>
.language-switcher {
  display: inline-flex;
  padding: 2px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.language-switcher__option {
  min-width: 2.5rem;
  min-height: 2.25rem;
  padding: 0 var(--space-2);
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  cursor: pointer;
  transition:
    background-color var(--duration-fast),
    color var(--duration-fast);
}

.language-switcher__option:hover {
  color: var(--color-text);
}

.language-switcher__option.is-active {
  background: var(--color-surface-raised);
  color: var(--color-text);
}
</style>
