<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';
import CommandPalette from './components/CommandPalette.vue';
import HeroSection from './sections/HeroSection.vue';
import AboutSection from './sections/AboutSection.vue';
import ExperienceSection from './sections/ExperienceSection.vue';
import SkillsSection from './sections/SkillsSection.vue';
import ProjectsSection from './sections/ProjectsSection.vue';
import WorkflowSection from './sections/WorkflowSection.vue';
import ContactSection from './sections/ContactSection.vue';
import { useKeyboardShortcut } from './composables/useKeyboardShortcut';

/** Page layout. Owns the command-menu state because both the header and the shortcut open it. */
const { t } = useI18n();
const paletteOpen = ref(false);

useKeyboardShortcut('k', () => (paletteOpen.value = !paletteOpen.value));
</script>

<template>
  <a href="#main" class="skip-link">{{ t('nav.skipToContent') }}</a>
  <SiteHeader @open-palette="paletteOpen = true" />

  <main id="main">
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <SkillsSection />
    <ProjectsSection />
    <WorkflowSection />
    <ContactSection />
  </main>

  <SiteFooter />
  <CommandPalette v-model:open="paletteOpen" />
</template>

<style>
/* Vertical rhythm shared by every page section. */
.section {
  padding-block: var(--space-16);
  border-top: 1px solid var(--color-border);
}

/* Hidden until focused with the keyboard, then shown at the top left. */
.skip-link {
  position: absolute;
  top: var(--space-2);
  left: var(--space-2);
  z-index: 20;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  background: var(--color-accent);
  color: var(--color-on-accent);
  transform: translateY(-200%);
}

.skip-link:focus {
  transform: none;
}
</style>
