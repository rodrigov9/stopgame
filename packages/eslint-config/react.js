import { defineConfig } from 'eslint/config'

import pluginReact from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'
import globals from 'globals'

import baseConfig from './base.js'

export default defineConfig(
  baseConfig,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  eslintPluginBetterTailwindcss.configs['recommended-error'],
  {
    rules: {
      'better-tailwindcss/enforce-consistent-line-wrapping': 'off'
    }
  },
  {
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser
      }
    },

    settings: {
      react: {
        version: '19'
      },

      'better-tailwindcss': {
        entryPoint: 'src/index.css'
      }
    }
  }
)
