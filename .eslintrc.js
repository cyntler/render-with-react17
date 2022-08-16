require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: '@cyntler/eslint-config',
  parserOptions: { tsconfigRootDir: __dirname },
  rules: {
    'no-plusplus': 0,
    'react/jsx-no-useless-fragment': 0,
  },
};
