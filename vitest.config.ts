import { defineConfig } from 'vitest/config'

/// <reference types="@vitest/browser/context" />
/// <reference types="@vitest/browser/providers/playwright" />

export default defineConfig({
	test: {
		browser: {
			enabled: true,
			provider: 'playwright',
			// https://vitest.dev/guide/browser/playwright
			instances: [{ browser: 'chromium' }],
		},
	},
})
