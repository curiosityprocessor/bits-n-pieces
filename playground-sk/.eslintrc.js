module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  overrides: [
    // JavaScript files
    {
      files: ['*.js'],
      parser: 'espree', // Default parser for JavaScript
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
      },
      extends: ['eslint:recommended'],
      rules: {
        // Add JavaScript-specific rules here
      },
    },
    // TypeScript files
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
      rules: {
        // Add TypeScript-specific rules here
      },
    },
    // Svelte files
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser', // For the script blocks inside .svelte files
        ecmaVersion: 12,
        sourceType: 'module',
      },
      extends: ['eslint:recommended', 'plugin:svelte/recommended'],
      rules: {
        // Add Svelte-specific rules here
      },
    },
  ],
  ignorePatterns: ['node_modules', 'dist', 'build', '.svelte-kit'], // Ignore build directories
};
