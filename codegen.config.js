import 'dotenv/config';
import { env } from 'node:process';

/** @type {import('@graphql-codegen/cli').CodegenConfig} */
export default {
  schema: env.VITE_API_URL,
  generates: {
    'mocks/introspection.json': {
      plugins: ['introspection'],
      config: { minify: true },
    },
  },
};
