import { defineConfig } from 'vite'

export default defineConfig({
	server: {
		host: '0.0.0.0',
		port: 44100,
	},
	preview: {
		host: '0.0.0.0',
		port: 44100,
	},
})
