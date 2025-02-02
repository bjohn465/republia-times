import { i18n } from '@lingui/core'
import { beforeEach, vi, type MockInstance } from 'vitest'
import { messages } from '#app/locales/en.po'

i18n.loadAndActivate({ locale: 'en', messages })

export let consoleError: MockInstance<(typeof console)['error']>

beforeEach(() => {
	const originalConsoleError = console.error
	consoleError = vi.spyOn(console, 'error')
	consoleError.mockImplementation(
		(...args: Parameters<typeof console.error>) => {
			originalConsoleError(...args)
			throw new Error(
				'Console error was called. Call consoleError.mockImplementation(() => {}) if this is expected.',
			)
		},
	)
})
