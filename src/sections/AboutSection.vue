<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import SectionHeading from '../components/SectionHeading.vue';
import { spokenLanguages } from '../data/profile';

/** Short bio, spoken languages with honest levels, and education. */
const { t } = useI18n();
</script>

<template>
  <section id="about" class="section" aria-labelledby="about-title">
    <div class="container">
      <SectionHeading path="about" heading-id="about-title" :title="t('about.title')" />

      <div class="about">
        <p class="about__text">{{ t('about.text') }}</p>

        <dl class="about__facts">
          <div>
            <dt>{{ t('about.languagesTitle') }}</dt>
            <dd>
              <ul class="about__languages">
                <li v-for="language in spokenLanguages" :key="language.id">
                  <span>{{ t(`about.languages.${language.id}.name`) }}</span>
                  <span class="about__level">{{ t(`about.languages.${language.id}.level`) }}</span>
                </li>
              </ul>
            </dd>
          </div>
          <div>
            <dt>{{ t('about.educationTitle') }}</dt>
            <dd>{{ t('about.education') }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  gap: var(--space-10);
}

.about__text {
  max-width: 40rem;
  font-size: var(--text-lg);
  line-height: 1.7;
}

.about__facts {
  display: grid;
  gap: var(--space-6);
  align-content: start;
}

.about__facts dt {
  margin-bottom: var(--space-2);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.about__languages li {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-2);
  padding-block: var(--space-2);
  border-bottom: 1px solid var(--color-border);
}

.about__level {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

@media (min-width: 900px) {
  .about {
    grid-template-columns: 3fr 2fr;
  }
}
</style>
