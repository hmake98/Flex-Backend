/* eslint-disable */
module.exports = {
<<<<<<< HEAD
    env: {
        browser: true,
        es2020: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': [
            1,
            {
                trailingComma: 'es5',
                singleQuote: true,
                semi: false,
            },
        ],
        ...require('eslint-config-prettier').rules,
        ...require('eslint-config-prettier/@typescript-eslint').rules,
    },
}
=======
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'prettier'
  ],
  rules: {
    'prettier/prettier': [
      1,
      {
        trailingComma: 'es5',
        singleQuote: true,
        semi: false,
      },
    ],
    ...require('eslint-config-prettier').rules,
    ...require('eslint-config-prettier/@typescript-eslint').rules,
  },
};
>>>>>>> 2e097cc154e45f1158acd6fff60bc04d20a14210
