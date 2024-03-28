module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    project: 'tsconfig.eslint.json',
    tsconfigRootDir: './apps/frontend-reactts',
    sourceType: 'module'
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', "**/vite.config.ts"],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react/react-in-jsx-scope': off,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
