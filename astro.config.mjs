import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://amirhashmilive.github.io',
  base: '/ktujm',
  build: {
    format: 'directory',
  },
  vite: {
    build: {
      rollupOptions: {
        external: [],
      },
    },
  },
});
