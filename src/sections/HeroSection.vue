<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { CV_URL, contactChannels } from '../data/profile';
import { highlightJson } from '../utils/highlightJson';

/**
 * First screen: who I am, what I do and where I can work, plus the one
 * primary action (contact), with projects and the CV download as secondary
 * ones. On wide screens a JSON "API response" panel repeats the key facts
 * in a developer-friendly format.
 */
const { t } = useI18n();

/** Profile shown in the JSON panel. Kept in English on purpose: it is "code". */
const profile = {
  name: 'Gustavo Martins Grunhauser',
  role: 'Front-end Developer',
  focus: ['Vue.js', 'JavaScript', 'API integration'],
  location: 'Piedmont, IT',
  openTo: ['on-site', 'hybrid', 'remote', 'relocation'],
};

/** The profile as colored JSON tokens. It never changes, so it is computed once. */
const profileTokens = highlightJson(JSON.stringify(profile, null, 2));

/** Secondary links under the main buttons (everything except email). */
const profileLinks = contactChannels.filter((channel) => channel.id !== 'email');
</script>

<template>
  <section id="top" class="hero" aria-labelledby="hero-title">
    <div class="container hero__grid">
      <div>
        <p class="hero__eyebrow">{{ t('hero.eyebrow') }}</p>
        <h1 id="hero-title" class="hero__name">Gustavo Martins Grunhauser</h1>
        <p class="hero__headline">{{ t('hero.headline') }}</p>
        <p class="hero__summary">{{ t('hero.summary') }}</p>
        <p class="hero__availability">
          <span class="hero__dot" aria-hidden="true" />
          {{ t('hero.availability') }}
        </p>

        <div class="hero__actions">
          <a href="#contact" class="button button--primary">{{ t('hero.primaryAction') }}</a>
          <a href="#projects" class="button">{{ t('hero.secondaryAction') }}</a>
          <a :href="CV_URL" class="button" download>{{ t('hero.cvAction') }}</a>
        </div>

        <ul class="hero__links">
          <li v-for="channel in profileLinks" :key="channel.id">
            <a :href="channel.href" class="link" target="_blank" rel="noopener noreferrer">
              {{ t(`contact.channels.${channel.id}`) }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Decorative duplicate of the text on the left, so it is hidden from screen readers. -->
      <figure class="hero__panel" aria-hidden="true">
        <figcaption class="hero__panel-bar">
          <span class="hero__method">GET</span> /api/profile
          <span class="hero__status">200 OK</span>
        </figcaption>
        <pre
          class="hero__json"
        ><code><span v-for="(token, i) in profileTokens" :key="i" :class="`token--${token.type}`">{{ token.text }}</span></code></pre>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-block: var(--space-16) var(--space-24);
}

.hero__grid {
  display: grid;
  gap: var(--space-12);
  align-items: center;
}

.hero__eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-accent);
}

.hero__name {
  margin-top: var(--space-3);
  font-size: var(--text-3xl);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.05;
}

.hero__headline {
  margin-top: var(--space-5);
  max-width: 36rem;
  font-size: var(--text-xl);
  line-height: 1.4;
}

.hero__summary {
  margin-top: var(--space-4);
  max-width: 36rem;
  color: var(--color-text-muted);
}

.hero__availability {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
  margin-top: var(--space-4);
  font-size: var(--text-sm);
}

.hero__dot {
  flex-shrink: 0;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--color-success);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-8);
}

.hero__links {
  display: flex;
  gap: var(--space-5);
  margin-top: var(--space-5);
  font-size: var(--text-sm);
}

.hero__panel {
  display: none;
  margin: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  overflow: hidden;
}

.hero__panel-bar {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.hero__method {
  color: var(--color-accent);
}

.hero__status {
  margin-left: auto;
  color: var(--color-success);
}

.hero__json {
  margin: 0;
  padding: var(--space-5) var(--space-4);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: 1.7;
  overflow-x: auto;
}

.token--key {
  color: var(--color-syntax-key);
}

.token--string {
  color: var(--color-syntax-string);
}

.token--punctuation {
  color: var(--color-syntax-punctuation);
}

@media (min-width: 960px) {
  .hero {
    padding-block: var(--space-24);
  }

  .hero__grid {
    grid-template-columns: 1.15fr 1fr;
  }

  .hero__panel {
    display: block;
  }
}
</style>
