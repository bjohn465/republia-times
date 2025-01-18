import { lingui } from '@lingui/vite-plugin'
import react from '@vitejs/plugin-react'
import { ViteMinifyPlugin } from 'vite-plugin-minify'
import { defineConfig } from 'vitest/config'

const MODE = process.env.NODE_ENV

export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: ['@lingui/babel-plugin-lingui-macro'],
			},
		}),
		lingui(),
		ViteMinifyPlugin({
			collapseWhitespace: true,
		}),
	],
	build: {
		cssMinify: MODE === 'production',

		rollupOptions: {
			external: [/node:.*/, 'stream', 'crypto', 'fsevents'],
		},

		sourcemap: true,
	},
	resolve: {
		extensions: [],
	},
	server: {
		watch: {
			ignored: ['**/playwright-report/**'],
		},
	},
	test: {
		include: ['./app/**/*.test.{ts,tsx}'],
		setupFiles: ['./tests/setup/setup-test-env.ts'],
		restoreMocks: true,
		coverage: {
			include: ['app/**/*.{ts,tsx}'],
			all: true,
		},
	},
})
