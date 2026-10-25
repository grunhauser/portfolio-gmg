import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  // Served from https://grunhauser.github.io/portfolio-gmg/
  base: '/portfolio-gmg/',
  plugins: [vue()],
});
