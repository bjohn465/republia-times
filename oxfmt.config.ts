import epicOxfmt from '@epic-web/config/oxfmt'
import { defineConfig } from 'oxfmt'

export default defineConfig({
	...epicOxfmt,
	ignorePatterns: [
		...(epicOxfmt.ignorePatterns ?? []),
		'**/.ms-playwright/**',
		'.devcontainer/devcontainer-lock.json',
	],
})
