import { default as defaultConfig } from '@epic-web/config/eslint'
import lingui from 'eslint-plugin-lingui'
import reactRefresh from 'eslint-plugin-react-refresh'

/** @type {import("eslint").Linter.Config} */
export default [
	...defaultConfig,
	reactRefresh.configs.vite,
	{
		plugins: {
			lingui,
		},
		rules: {
			'lingui/no-expression-in-message': 'warn',
			'lingui/no-single-tag-to-translate': 'warn',
			'lingui/no-single-variables-to-translate': 'warn',
			'lingui/no-trans-inside-trans': 'warn',
			'lingui/t-call-in-function': 'error',
		},
	},
]
