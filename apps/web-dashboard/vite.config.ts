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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
