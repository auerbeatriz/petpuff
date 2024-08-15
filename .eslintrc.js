module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'import'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      "plugin:import/typescript",
      "prettier",
    ],
    rules: {
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      'no-console': 'off',
      "import/order": [ "error", { 
        groups: [["builtin", "external", "internal"]], 
        alphabetize: { order: "asc", caseInsensitive: true }
        }],
    }
};