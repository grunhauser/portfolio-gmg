import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import skipFormatting from 'eslint-config-prettier/flat';
import globals from 'globals';

/**
 * ESLint flat config: JavaScript + Vue + TypeScript recommended rules.
 * Formatting is left to Prettier, so stylistic rules are turned off last.
 */
export default defineConfigWithVueTs(
  { ignores: ['dist/**', 'node_modules/**'] },
  {
    files: ['**/*.{ts,vue}'],
    languageOptions: { globals: globals.browser },
  },
  js.configs.recommended,
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  skipFormatting,
);
