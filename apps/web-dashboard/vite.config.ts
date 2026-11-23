import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { createDemoApi } from './demo-api/index.mjs';

export default defineConfig({
  plugins: [react(), {
    name: 'floodblast-local-demo-api',
    configureServer(server) {
      server.middlewares.use(createDemoApi());
    },
  }],
  server: {
    proxy: {
      '/api/forecast': {
        target: 'http://127.0.0.1:8000',
        rewrite: () => '/forecast/resources',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
