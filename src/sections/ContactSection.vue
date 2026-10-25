<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import SectionHeading from '../components/SectionHeading.vue';
import { EMAIL, contactChannels } from '../data/profile';
import { useClipboard } from '../composables/useClipboard';

/** Email first (with a copy button), then the other profiles. */
const { t } = useI18n();
const { status, copy } = useClipboard();

/** Button text follows the copy result, then returns to "Copy". */
const copyLabel = computed(() => {
  if (status.value === 'copied') return t('contact.copied');
  if (status.value === 'failed') return t('contact.copyFailed');
  return t('contact.copy');
});

const otherChannels = contactChannels.filter((channel) => channel.id !== 'email');
</script>

<template>
  <section id="contact" class="section" aria-labelledby="contact-title">
    <div class="container">
      <SectionHeading path="contact" heading-id="contact-title" :title="t('contact.title')" />

      <div class="contact">
        <p class="contact__text">{{ t('contact.text') }}</p>

        <div class="contact__email">
          <a :href="`mailto:${EMAIL}`" class="contact__address">{{ EMAIL }}</a>
          <button
            type="button"
            class="button button--small"
            :class="{ 'is-copied': status === 'copied' }"
            @click="copy(EMAIL)"
          >
            <!-- aria-live announces "Copied" to screen readers. -->
            <span aria-live="polite">{{ copyLabel }}</span>
          </button>
        </div>

        <ul class="contact__channels">
          <li v-for="channel in otherChannels" :key="channel.id">
            <span class="contact__label">{{ t(`contact.channels.${channel.id}`) }}</span>
            <a :href="channel.href" class="link" target="_blank" rel="noopener noreferrer">
              {{ channel.display }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  max-width: 40rem;
}

.contact__text {
  font-size: var(--text-lg);
}

.contact__email {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4);
  margin-top: var(--space-6);
  padding: var(--space-4) var(--space-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
}

.contact__address {
  flex: 1;
  font-family: var(--font-mono);
  font-size: var(--text-lg);
  text-decoration: none;
  word-break: break-all;
}

.contact__address:hover {
  color: var(--color-accent-hover);
}

.is-copied {
  border-color: var(--color-success);
  color: var(--color-success);
}

.contact__channels {
  display: grid;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.contact__channels li {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.contact__label {
  min-width: 5rem;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}
</style>
