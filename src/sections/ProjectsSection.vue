<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import SectionHeading from '../components/SectionHeading.vue';
import GithubRepoList from '../components/GithubRepoList.vue';
import ScreenshotViewer from '../components/ScreenshotViewer.vue';
import { projects } from '../data/projects';
import type { Project, ProjectScreen } from '../types';

/**
 * Hand-picked projects with written descriptions, followed by the live GitHub list.
 * Projects with screenshots get a wide card with a small gallery; clicking an
 * image opens it full size in the viewer.
 */
const { t } = useI18n();

/** Project whose screenshots are open in the viewer, if any. */
const viewerProject = ref<Project | null>(null);
const viewerIndex = ref(0);

const viewerOpen = computed({
  get: () => viewerProject.value !== null,
  set: (value) => {
    if (!value) viewerProject.value = null;
  },
});

function openViewer(project: Project, index: number): void {
  viewerIndex.value = index;
  viewerProject.value = project;
}

/** Phone screenshots sit side by side; desktop ones get a cover plus thumbnails. */
function isPhoneGallery(screens: ProjectScreen[]): boolean {
  return screens.every((screen) => screen.mobile);
}

function src(screen: ProjectScreen): string {
  return `${import.meta.env.BASE_URL}work/${screen.file}`;
}
</script>

<template>
  <section id="projects" class="section" aria-labelledby="projects-title">
    <div class="container">
      <SectionHeading path="projects" heading-id="projects-title" :title="t('projects.title')" />

      <ul class="projects">
        <li
          v-for="project in projects"
          :key="project.id"
          v-spotlight
          class="project"
          :class="{ 'project--wide': project.screens }"
        >
          <div class="project__body">
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
          </div>

          <div
            v-if="project.screens"
            class="gallery"
            :class="{ 'gallery--phones': isPhoneGallery(project.screens) }"
          >
            <button
              v-for="(screen, index) in project.screens"
              :key="screen.id"
              type="button"
              class="gallery__item"
              :aria-label="`${t('projects.viewer.open')}: ${t(`projects.screens.${screen.id}`)}`"
              @click="openViewer(project, index)"
            >
              <img
                :src="src(screen)"
                :alt="t(`projects.screens.${screen.id}`)"
                loading="lazy"
                decoding="async"
              />
            </button>
            <p class="gallery__note">{{ t('projects.viewer.demoData') }}</p>
          </div>
        </li>
      </ul>

      <ScreenshotViewer
        v-if="viewerProject?.screens"
        v-model:open="viewerOpen"
        v-model:index="viewerIndex"
        :screens="viewerProject.screens"
        :title="t(`projects.items.${viewerProject.id}.title`)"
      />

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
  transition:
    transform var(--duration-base),
    border-color var(--duration-base),
    box-shadow var(--duration-base);
}

.project:hover {
  transform: translateY(-3px);
  border-color: var(--color-border-strong);
  border-left-color: var(--color-accent);
  box-shadow: 0 12px 32px -16px rgb(255 122 89 / 0.35);
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

.project__body {
  display: flex;
  flex: 1;
  flex-direction: column;
}

/* Gallery: the first image is the cover, the rest become thumbnails. */
.gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.gallery__item {
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-bg);
  overflow: hidden;
  cursor: zoom-in;
  transition: border-color var(--duration-base);
}

.gallery__item:hover {
  border-color: var(--color-accent);
}

.gallery__item:first-child {
  grid-column: 1 / -1;
}

.gallery__item img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  aspect-ratio: 16 / 10;
  transition: transform var(--duration-slow);
}

.gallery__item:hover img {
  transform: scale(1.03);
}

/* Phone screenshots: three tall images side by side. */
.gallery--phones {
  grid-template-columns: repeat(3, 1fr);
}

.gallery--phones .gallery__item:first-child {
  grid-column: auto;
}

.gallery--phones .gallery__item img {
  aspect-ratio: 9 / 16;
}

.gallery__note {
  grid-column: 1 / -1;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

@media (min-width: 900px) {
  .projects {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Projects with screenshots take the full row: text left, images right. */
  .project--wide {
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: var(--space-8);
    align-items: start;
  }

  .project--wide .gallery {
    margin-top: 0;
  }
}
</style>
