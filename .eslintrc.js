const path = require('path')

/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', '@next/next'],
  extends: [
    'standard',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:n/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'n/no-unsupported-features/es-builtins': 'off',
    'n/no-unsupported-features/es-syntax': 'off',
    'n/no-missing-import': 'off', // false positives, TS checks this
    'n/no-unpublished-import': 'off',
    'n/no-unsupported-features/node-builtins': 'off',

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',

    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',

    'prettier/prettier': 'off', // run Prettier on its own
  },
  overrides: [
    {
      files: ['ui/**/*.tsx'],
      extends: ['next/core-web-vitals'],
      parserOptions: {
        project: require.resolve('./ui/tsconfig.json'),
      },
      rules: {
        '@typescript-eslint/no-floating-promises': 'warn',
        '@next/next/no-img-element': 'off', // we don't want to statically optimize user images, and we don't know their domains beforehand
        '@next/next/no-html-link-for-pages': ['warn', path.join(__dirname, 'ui/pages')],
      },
    },
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
}
