import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    environment: 'jsdom',
    coverage: {
      exclude: [
        'src/main.tsx',
        'src/vite-env.d.ts',
        '**/*.config.*',
        '**/setupTests.*',
        '**/__mocks__/**',
      ],
    },
  }
})
