import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { env } from 'node:process';

import { splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react-swc';

/** @type {import('vite').UserConfig} */
export default {
  plugins: [
    react(),
    splitVendorChunkPlugin(),
  ],
  define: {
    'globalThis.__DEV__': env.NODE_ENV === 'development',
  },
  resolve: {
    alias: [
      { 
        find: /^@\/(?<path>.*)/,
        replacement: resolve(dirname(fileURLToPath(import.meta.url)), './src/$1'),
      },
    ],
    extensions: ['.js', '.jsx', '.json'],
  },
};
