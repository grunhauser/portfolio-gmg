<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import SectionHeading from '../components/SectionHeading.vue';
import { skillGroups } from '../data/skills';

/**
 * Skills as a definition list: one row per area, so a recruiter can scan it
 * in a few seconds. The "currently updating" row is styled apart on purpose,
 * to be clear about what is still being learned.
 */
const { t } = useI18n();
</script>

<template>
  <section id="skills" class="section" aria-labelledby="skills-title">
    <div class="container">
      <SectionHeading path="skills" heading-id="skills-title" :title="t('skills.title')" />

      <dl class="skills">
        <div
          v-for="group in skillGroups"
          :key="group.id"
          class="skills__row"
          :class="{ 'skills__row--updating': group.id === 'updating' }"
        >
          <dt>{{ t(`skills.groups.${group.id}`) }}</dt>
          <dd>
            <ul class="skills__items">
              <li v-for="item in group.items" :key="item" class="tag">{{ item }}</li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.skills {
  border-top: 1px solid var(--color-border);
}

.skills__row {
  display: grid;
  gap: var(--space-3);
  padding-block: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.skills__row dt {
  font-weight: 500;
}

.skills__items {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.skills__items .tag {
  color: var(--color-text);
}

.skills__row--updating dt {
  color: var(--color-text-muted);
}

.skills__row--updating .tag {
  border-style: dashed;
  color: var(--color-text-muted);
}

@media (min-width: 720px) {
  .skills__row {
    grid-template-columns: 14rem 1fr;
    align-items: center;
  }
}
</style>
