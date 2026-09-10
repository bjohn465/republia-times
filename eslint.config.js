import { config as epicWebConfig } from '@epic-web/config/eslint'

/** @type {import("eslint").Linter.Config} */
export default [
	...epicWebConfig,
	{
		ignores: ['.ms-playwright/'],
	},
	{
		linterOptions: {
			reportUnusedDisableDirectives: 'warn',
			reportUnusedInlineConfigs: 'warn',
		},
	},
]
