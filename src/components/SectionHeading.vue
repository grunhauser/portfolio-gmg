<script setup lang="ts">
/**
 * Section title styled as an HTTP request line ("GET /experience 200").
 * It is the site's visual signature and a nod to API integration work.
 * The request line is decorative, so screen readers only hear the title.
 */
defineProps<{
  /** URL-like path shown after GET, usually the section id. */
  path: string;
  /** Visible, translated section title. */
  title: string;
  /** Id for the heading, so the section can point to it with aria-labelledby. */
  headingId: string;
}>();
</script>

<template>
  <header class="section-heading">
    <p class="section-heading__request" aria-hidden="true">
      <span class="section-heading__method">GET</span>
      <span>/{{ path }}</span>
      <span class="section-heading__status">200</span>
    </p>
    <h2 :id="headingId" class="section-heading__title">{{ title }}</h2>
  </header>
</template>

<style scoped>
.section-heading {
  margin-bottom: var(--space-8);
}

.section-heading__request {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.section-heading__method {
  color: var(--color-accent);
  font-weight: 500;
}

.section-heading__status {
  padding: 0 var(--space-1);
  border-radius: var(--radius-sm);
  background: color-mix(in srgb, var(--color-success) 15%, transparent);
  color: var(--color-success);
  font-size: var(--text-xs);
}

.section-heading__title {
  margin-top: var(--space-2);
  font-size: var(--text-2xl);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
}
</style>
