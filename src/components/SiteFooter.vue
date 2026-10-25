<script setup lang="ts">
import { useI18n } from 'vue-i18n';

/** Footer with copyright and a link to this site's source code. */
const { t } = useI18n();
const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <p>© {{ year }} Gustavo Martins Grunhauser</p>
      <p>
        {{ t('footer.builtWith') }}
        <a
          href="https://github.com/grunhauser/portfolio-gmg"
          class="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('footer.source') }}
        </a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: var(--space-16);
  border-top: 1px solid var(--color-border);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.site-footer__inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-2);
  padding-block: var(--space-8);
}
</style>
