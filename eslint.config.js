import { config as epicWebConfig } from '@epic-web/config/eslint'
import lingui from 'eslint-plugin-lingui'
import reactRefresh from 'eslint-plugin-react-refresh'

/** @type {import("eslint").Linter.Config} */
export default [
	...epicWebConfig,
	{
		linterOptions: {
			reportUnusedDisableDirectives: 'warn',
			reportUnusedInlineConfigs: 'warn',
		},
	},
	{
		plugins: {
			'react-refresh': reactRefresh,
		},
		rules: {
			'react-refresh/only-export-components': [
				'error',
				{ allowConstantExport: true },
			],
		},
	},
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
	{
		ignores: ['app/invariant.ts'],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					name: '@epic-web/invariant',
					message: "Please use '#app/invariant.ts' instead.",
				},
			],
		},
	},
]
