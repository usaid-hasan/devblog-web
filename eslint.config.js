/* eslint-disable quote-props */
import globals from 'globals';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import tailwindcssPlugin from 'eslint-plugin-tailwindcss';
import * as eslintRules from 'eslint-rules';

export default [
  { ignores: ['dist/**/*.js'] },
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'import': importPlugin,
    },
    rules: {
      ...eslintRules.default,
      ...eslintRules.importPlugin,
      'import/extensions': ['error', 'ignorePackages', { js: 'never', jsx: 'never', gql: 'never', json: 'never' }],
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },
    settings: {
      'import/extensions': ['.js', '.jsx'],
      'import/parsers': { espree: ['.js', '.jsx'] },
      'import/ignore': ['gql$'],
      'import/resolver': {
        'eslint-import-resolver-custom-alias': {
          alias: { '@/mocks': './mocks', '@': './src' },
          extensions: ['.js', '.jsx', '.json', '.gql'],
        },
      },
    },
  },
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: {
      'tailwindcss': tailwindcssPlugin,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      ...eslintRules.tailwindcssPlugin,
      ...eslintRules.reactPlugin,
      ...eslintRules.reactHooksPlugin,
      ...eslintRules.jsxA11yPlugin,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      'react': { version: 'detect' },
    },
  },
  {
    files: ['mocks/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
];
