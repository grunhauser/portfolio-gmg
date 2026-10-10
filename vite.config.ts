import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Served from https://grunhauser.github.io/portfolio-gmg/
  base: '/portfolio-gmg/',
  plugins: [react()],
  server: {
    allowedHosts: true,
  },
});
