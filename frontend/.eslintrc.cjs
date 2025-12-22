module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'react-refresh'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'react-refresh/only-export-components': 'warn',
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.ts', '**/*.test.tsx', '**/test/**'] }],
  },
};

