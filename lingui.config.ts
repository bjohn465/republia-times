import { defineConfig } from '@lingui/cli'

export default defineConfig({
	sourceLocale: 'en',
	locales: ['en'],
	catalogs: [
		{
			path: '<rootDir>/app/locales/{locale}',
			include: ['<rootDir>/app'],
		},
	],
})
