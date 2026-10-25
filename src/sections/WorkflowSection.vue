<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import SectionHeading from '../components/SectionHeading.vue';

/** How I work, as a short numbered list (including how I use AI tools). */
const { t, tm, rt } = useI18n();

interface WorkflowItem {
  title: string;
  text: string;
}

/** Items come from the locale file as an array of { title, text } messages. */
const items = computed<WorkflowItem[]>(() =>
  (tm('workflow.items') as Record<keyof WorkflowItem, unknown>[]).map((item) => ({
    title: rt(item.title as Parameters<typeof rt>[0]),
    text: rt(item.text as Parameters<typeof rt>[0]),
  })),
);
</script>

<template>
  <section id="workflow" class="section" aria-labelledby="workflow-title">
    <div class="container">
      <SectionHeading path="workflow" heading-id="workflow-title" :title="t('workflow.title')" />

      <ol class="workflow">
        <li v-for="(item, index) in items" :key="item.title" class="workflow__item">
          <span class="workflow__number" aria-hidden="true">{{
            String(index + 1).padStart(2, '0')
          }}</span>
          <div>
            <h3 class="workflow__title">{{ item.title }}</h3>
            <p class="workflow__text">{{ item.text }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.workflow {
  display: grid;
  gap: var(--space-8);
}

.workflow__item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--space-4);
}

.workflow__number {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-accent);
  line-height: 1.8;
}

.workflow__title {
  font-size: var(--text-lg);
  font-weight: 600;
}

.workflow__text {
  margin-top: var(--space-2);
  max-width: 34rem;
  color: var(--color-text-muted);
}

@media (min-width: 900px) {
  .workflow {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
