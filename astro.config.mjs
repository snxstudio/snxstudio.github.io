// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://wearesnx.studio',
  vite: {
    plugins: [tailwindcss()],
  },
});
