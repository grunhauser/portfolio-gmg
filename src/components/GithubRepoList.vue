<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useGithubRepos } from '../composables/useGithubRepos';
import { useInViewOnce } from '../composables/useInViewOnce';

/**
 * Public repositories loaded live from the GitHub REST API.
 * The request starts only when the list is about to scroll into view,
 * and every state (loading, error with retry, empty, success) has its own UI.
 */
const props = defineProps<{ username: string }>();

const { t, d } = useI18n();
const { repos, state, load } = useGithubRepos(props.username);

const root = ref<HTMLElement | null>(null);
const isInView = useInViewOnce(root);

watch(isInView, (visible) => {
  if (visible) void load();
});

/** Last-push date in the active language, e.g. "24 Oct 2026". */
function formatDate(iso: string): string {
  return d(new Date(iso), { day: 'numeric', month: 'short', year: 'numeric' });
}
</script>

<template>
  <div ref="root" class="repos">
    <div class="repos__header">
      <h3 class="repos__title">
        <span class="repos__live" aria-hidden="true" />
        {{ t('projects.github.title') }}
      </h3>
      <p class="repos__description">{{ t('projects.github.description') }}</p>
    </div>

    <!-- aria-busy tells assistive tech the content is still changing. -->
    <div :aria-busy="state === 'loading'" aria-live="polite">
      <ul
        v-if="state === 'loading' || state === 'idle'"
        class="repos__list"
        :aria-label="t('projects.github.loading')"
      >
        <li v-for="n in 3" :key="n" class="repos__item repos__item--skeleton" />
      </ul>

      <div v-else-if="state === 'error'" class="repos__message">
        <p>{{ t('projects.github.error') }}</p>
        <button type="button" class="button button--small" @click="load">
          {{ t('projects.github.retry') }}
        </button>
      </div>

      <p v-else-if="repos.length === 0" class="repos__message">{{ t('projects.github.empty') }}</p>

      <ul v-else class="repos__list">
        <li v-for="repo in repos" :key="repo.id" class="repos__item">
          <a :href="repo.htmlUrl" target="_blank" rel="noopener noreferrer" class="repos__name">
            {{ repo.name }}
          </a>
          <p class="repos__text">{{ repo.description ?? t('projects.github.noDescription') }}</p>
          <p class="repos__meta">
            <span v-if="repo.language">{{ repo.language }}</span>
            <span
              >★ {{ repo.stars }}
              <span class="visually-hidden">{{ t('projects.github.stars') }}</span></span
            >
            <span>{{ t('projects.github.updated') }} {{ formatDate(repo.pushedAt) }}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.repos {
  margin-top: var(--space-12);
}

.repos__header {
  margin-bottom: var(--space-5);
}

.repos__title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-base);
  font-weight: 600;
}

/* Small pulsing dot that says "this data is live". */
.repos__live {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--color-success);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  50% {
    opacity: 0.35;
  }
}

.repos__description {
  margin-top: var(--space-1);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.repos__list {
  display: grid;
  gap: var(--space-3);
}

.repos__item {
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.repos__item--skeleton {
  height: 6.5rem;
  background: linear-gradient(
    90deg,
    var(--color-surface) 0%,
    var(--color-surface-raised) 50%,
    var(--color-surface) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s linear infinite;
}

@keyframes shimmer {
  to {
    background-position: -200% 0;
  }
}

.repos__name {
  font-family: var(--font-mono);
  font-weight: 500;
  text-decoration: none;
}

.repos__name:hover {
  color: var(--color-accent-hover);
}

.repos__text {
  margin-top: var(--space-1);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.repos__meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-top: var(--space-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.repos__message {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
}

@media (min-width: 720px) {
  .repos__list {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
