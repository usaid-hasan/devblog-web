import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { env } from 'node:process';

import { splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import graphql from '@rollup/plugin-graphql';

const dir = dirname(fileURLToPath(import.meta.url));

/** @type {import('vite').UserConfig} */
export default {
  plugins: [
    react(),
    graphql(),
    splitVendorChunkPlugin(),
  ],
  define: {
    'globalThis.__DEV__': env.NODE_ENV === 'development',
  },
  resolve: {
    alias: [
      { find: /^@\/mocks(?<path>.*)/, replacement: resolve(dir, './mocks/$1') },
      { find: /^@\/(?<path>.*)/, replacement: resolve(dir, './src/$1') },
    ],
    extensions: ['.js', '.jsx', '.json', '.gql'],
  },
};
