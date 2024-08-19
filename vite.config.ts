import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
console.log('process.env.GH_PAGES', process.env.GH_PAGES);

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  base: '/',
  server: {
    fs: {
      allow: ['../sdk', './'],
    },
  },
});
