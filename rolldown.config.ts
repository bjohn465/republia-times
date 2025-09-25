import { defineConfig } from 'rolldown'

export default defineConfig({
	input: {
		'app/republia-times': 'app/republia-times.ts',
	},
	output: {
		dir: 'public',
		sourcemap: true,
	},
	watch: {
		clearScreen: false,
	},
})
