import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  base: process.env.GH_PAGES ? '/tontools-dapp/' : './',
  server: {
    fs: {
      allow: ['../sdk', './'],
    },
  },
});
