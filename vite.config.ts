import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const MODE = process.env.NODE_ENV

export default defineConfig({
	plugins: [react()],
	build: {
		cssMinify: MODE === 'production',

		rollupOptions: {
			external: [/node:.*/, 'stream', 'crypto', 'fsevents'],
		},

		sourcemap: true,
	},
	server: {
		watch: {
			ignored: ['**/playwright-report/**'],
		},
	},
})
