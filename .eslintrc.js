module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/recommended',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/no-multiple-template-root': 0,
    'vue/no-v-for-template-key': 0,
  }
}
