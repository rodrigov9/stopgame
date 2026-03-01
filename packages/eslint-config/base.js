import { defineConfig } from 'eslint/config'

import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import turbo from 'eslint-plugin-turbo'

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import('prettier').Config}
 */
const prettierConfig = {
  semi: false,
  singleQuote: true,
  arrowParens: 'avoid',
  trailingComma: 'none',
  endOfLine: 'auto'
}

export default defineConfig(
  turbo.configs['flat/recommended'],
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': ['error', prettierConfig]
    }
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ]
    }
  },
  {
    ignores: ['dist/**']
  }
)
