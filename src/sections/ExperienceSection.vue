<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import SectionHeading from '../components/SectionHeading.vue';
import { jobs } from '../data/experience';
import { formatMonthYear } from '../utils/date';

/**
 * Work history as tabs: one tab per company, details in a single panel.
 * Follows the WAI-ARIA tabs pattern: only the selected tab is in the Tab
 * order, and the arrow keys (plus Home/End) move between tabs.
 */
const { t, tm, rt, locale } = useI18n();

const selectedIndex = ref(0);
const tabs = ref<HTMLButtonElement[]>([]);

const selectedJob = computed(() => jobs[selectedIndex.value] ?? jobs[0]!);

/**
 * Bullet points of the selected job. `tm` returns the raw message array
 * and `rt` turns each item into a translated string.
 */
const highlights = computed(() =>
  (tm(`experience.items.${selectedJob.value.id}.highlights`) as unknown[]).map((item) =>
    rt(item as Parameters<typeof rt>[0]),
  ),
);

/** "May 2021 – Jan 2026", formatted for the active language. */
function period(start: string, end: string): string {
  return `${formatMonthYear(start, locale.value)} – ${formatMonthYear(end, locale.value)}`;
}

/** Selects a tab and moves keyboard focus to it. */
function focusTab(index: number): void {
  selectedIndex.value = index;
  tabs.value[index]?.focus();
}

function onKeydown(event: KeyboardEvent): void {
  const last = jobs.length - 1;
  const moves: Record<string, number> = {
    ArrowDown: selectedIndex.value === last ? 0 : selectedIndex.value + 1,
    ArrowRight: selectedIndex.value === last ? 0 : selectedIndex.value + 1,
    ArrowUp: selectedIndex.value === 0 ? last : selectedIndex.value - 1,
    ArrowLeft: selectedIndex.value === 0 ? last : selectedIndex.value - 1,
    Home: 0,
    End: last,
  };
  const next = moves[event.key];
  if (next !== undefined) {
    event.preventDefault();
    focusTab(next);
  }
}
</script>

<template>
  <section id="experience" class="section" aria-labelledby="experience-title">
    <div class="container">
      <SectionHeading
        path="experience"
        heading-id="experience-title"
        :title="t('experience.title')"
      />

      <div class="experience">
        <div
          class="experience__tabs"
          role="tablist"
          aria-orientation="vertical"
          :aria-label="t('experience.title')"
          @keydown="onKeydown"
        >
          <button
            v-for="(job, index) in jobs"
            :id="`tab-${job.id}`"
            :key="job.id"
            ref="tabs"
            type="button"
            role="tab"
            class="experience__tab"
            :class="{ 'is-active': index === selectedIndex }"
            :aria-selected="index === selectedIndex"
            :aria-controls="`panel-${job.id}`"
            :tabindex="index === selectedIndex ? 0 : -1"
            @click="selectedIndex = index"
          >
            <span class="experience__tab-company">{{ job.team ?? job.company }}</span>
            <span class="experience__tab-years"
              >{{ job.start.slice(0, 4) }}–{{ job.end.slice(0, 4) }}</span
            >
          </button>
        </div>

        <article
          :id="`panel-${selectedJob.id}`"
          class="experience__panel"
          role="tabpanel"
          :aria-labelledby="`tab-${selectedJob.id}`"
          tabindex="0"
        >
          <h3 class="experience__role">{{ t(`experience.items.${selectedJob.id}.role`) }}</h3>
          <p class="experience__company">
            {{ selectedJob.company
            }}<template v-if="selectedJob.team"> · {{ selectedJob.team }}</template>
          </p>
          <p class="experience__meta">
            <span>{{ period(selectedJob.start, selectedJob.end) }}</span>
            <span aria-hidden="true">·</span>
            <span>{{ t(`experience.items.${selectedJob.id}.location`) }}</span>
          </p>
          <ul class="experience__highlights">
            <li v-for="item in highlights" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.experience {
  display: grid;
  gap: var(--space-6);
}

.experience__tabs {
  display: flex;
  gap: var(--space-2);
  overflow-x: auto;
}

.experience__tab {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-1);
  min-width: 10rem;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition:
    border-color var(--duration-fast),
    background-color var(--duration-fast);
}

.experience__tab:hover {
  border-color: var(--color-border-strong);
}

.experience__tab.is-active {
  border-color: var(--color-accent);
  background: var(--color-surface);
}

.experience__tab-company {
  font-weight: 500;
}

.experience__tab-years {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.experience__panel {
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
}

.experience__role {
  font-size: var(--text-lg);
  font-weight: 600;
  line-height: 1.4;
}

.experience__company {
  margin-top: var(--space-1);
  color: var(--color-accent);
}

.experience__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-1);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.experience__highlights {
  display: grid;
  gap: var(--space-3);
  margin-top: var(--space-5);
}

.experience__highlights li {
  position: relative;
  padding-left: var(--space-5);
}

.experience__highlights li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.7em;
  width: 0.5rem;
  height: 1px;
  background: var(--color-accent);
}

@media (min-width: 900px) {
  .experience {
    grid-template-columns: 15rem 1fr;
  }

  .experience__tabs {
    flex-direction: column;
    overflow: visible;
  }
}
</style>
