import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5174, host: true },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        // Split the animation runtime and React out of the app chunk so a copy
        // edit doesn't invalidate the vendor code in every returning visitor's
        // cache. Vite 8 runs Rolldown, which requires the function form.
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('/motion') || id.includes('framer-motion')) return 'motion';
          if (id.includes('/react-dom/') || id.includes('/react/') || id.includes('/scheduler/')) {
            return 'react';
          }
        },
      },
    },
  },
});
