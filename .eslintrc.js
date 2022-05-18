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
    'n/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'], version: '>=14.0.0' }],
    'n/no-missing-import': 'off', // false positives, TS checks this
    'n/no-unpublished-import': 'off',

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
      },
    },
  ],
}
