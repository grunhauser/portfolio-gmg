<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import SectionHeading from '../components/SectionHeading.vue';
import GithubRepoList from '../components/GithubRepoList.vue';
import { projects } from '../data/projects';

/** Hand-picked projects with written descriptions, followed by the live GitHub list. */
const { t } = useI18n();
</script>

<template>
  <section id="projects" class="section" aria-labelledby="projects-title">
    <div class="container">
      <SectionHeading path="projects" heading-id="projects-title" :title="t('projects.title')" />

      <ul class="projects">
        <li v-for="project in projects" :key="project.id" class="project">
          <div class="project__header">
            <h3 class="project__title">{{ t(`projects.items.${project.id}.title`) }}</h3>
            <span class="project__year">{{ project.year }}</span>
          </div>
          <p class="project__description">{{ t(`projects.items.${project.id}.description`) }}</p>
          <ul class="project__stack">
            <li v-for="item in project.stack" :key="item" class="tag">{{ item }}</li>
          </ul>
          <p class="project__links">
            <a
              v-if="project.repoUrl"
              :href="project.repoUrl"
              class="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ t('projects.code') }} ↗
            </a>
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              class="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ t('projects.live') }} ↗
            </a>
            <span v-if="project.privateCode" class="project__private">{{
              t('projects.privateCode')
            }}</span>
          </p>
        </li>
      </ul>

      <GithubRepoList username="grunhauser" />
    </div>
  </section>
</template>

<style scoped>
.projects {
  display: grid;
  gap: var(--space-5);
}

.project {
  display: flex;
  flex-direction: column;
  padding: var(--space-6);
  border: 1px solid var(--color-border);
  border-left: 3px solid var(--color-accent);
  border-radius: var(--radius-md);
  background: var(--color-surface);
}

.project__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-4);
}

.project__title {
  font-size: var(--text-lg);
  font-weight: 600;
}

.project__year {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.project__description {
  flex: 1;
  margin-top: var(--space-3);
  color: var(--color-text-muted);
}

.project__stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-5);
}

.project__private {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.project__links {
  display: flex;
  align-items: baseline;
  gap: var(--space-5);
  margin-top: var(--space-5);
  font-size: var(--text-sm);
}

@media (min-width: 900px) {
  .projects {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
