import { defineConfig } from 'vite'

/// <reference types="@vitest/browser/context" />
/// <reference types="@vitest/browser/providers/playwright" />

export default defineConfig({
	build: {
		minify: false,
		modulePreload: {
			polyfill: false,
		},
		sourcemap: true,
	},
	preview: {
		host: '0.0.0.0',
		port: 4173,
		strictPort: true,
	},
	server: {
		host: '0.0.0.0',
		port: 5173,
		strictPort: true,
	},
	test: {
		browser: {
			enabled: true,
			provider: 'playwright',
			// https://vitest.dev/guide/browser/playwright
			instances: [{ browser: 'chromium' }],
		},
	},
})
