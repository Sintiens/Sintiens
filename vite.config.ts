import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, UserConfig} from 'vite';

export default defineConfig((): UserConfig => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        },
      },
      rollupOptions: {
        output: {
          // Function form: only split vendor modules actually used by the
          // entry. recharts is deliberately NOT listed here so Rollup emits
          // it as a shared async chunk, only downloaded when a lazy tab
          // (Datos/Noticias) is opened — previously it was force-loaded on
          // startup via modulepreload (~99 KB gzip).
          manualChunks(id: string) {
            if (!id.includes('node_modules')) return undefined;
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) {
              return 'vendor-react';
            }
            if (id.includes('/motion/') || id.includes('/framer-motion/')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            return undefined;
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
    },
  };
});
