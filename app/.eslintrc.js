module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['eslint-plugin-import-helpers'],
  rules: {
    'import-helpers/order-imports': [
      'warn',
      { // example configuration
        newlinesBetween: 'always',
        groups: [
          'module',
          '/^@shared/',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  }
};
