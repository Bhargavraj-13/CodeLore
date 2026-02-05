import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // 1) Ignore build/output and deps
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage'],
  },

  // 2) Base JS + browser globals
  js.configs.recommended,

  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },

  // 3) React recommended rules (flat config, modern JSX runtime)
  pluginReact.configs.flat.recommended,

  // 4) Prettier: turn off conflicting stylistic rules
  eslintConfigPrettier,

  // 5) Project-specific rules & plugins
  {
    plugins: {
      'react-hooks': pluginReactHooks,
      prettier: pluginPrettier,
    },

    settings: {
      react: {
        // Auto-detects your React version from package.json
        version: 'detect',
      },
    },

    rules: {
      // React 17+ / 18+ / 19+ JSX runtime:
      // You DON'T need "import React from 'react';" in every file.
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',

      // React Hooks rules (VERY important)
      'react-hooks/rules-of-hooks': 'error', // checks rules of Hooks
      'react-hooks/exhaustive-deps': 'warn', // checks deps of useEffect/useCallback

      // Prettier as an ESLint rule (format issues show as warnings)
      'prettier/prettier': 'warn',
    },
  },
]);