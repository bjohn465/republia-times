import { describe, expect, test, vi } from 'vitest'
import { getThrownValue } from '#tests/utils.ts'
import { initializeGameState as originalInitializeGameState } from './game-state.ts'
import { assertURLIsCorrectForGameState } from './url-utils.ts'

vi.mock('./game-state.ts', () => ({
	getGameState: vi
		.fn(() => ({
			url: '/morning',
		}))
		.mockName('getGameState'),
	initializeGameState: vi.fn((state) => state).mockName('initializeGameState'),
}))

const initializeGameState = vi.mocked(originalInitializeGameState)

describe('assertURLIsCorrectForGameState', () => {
	test('Does not throw when URL matches the game state URL', () => {
		const url = new URL('https://www.example.com/morning')
		expect(() => assertURLIsCorrectForGameState(url)).not.toThrow()
	})

	test('Throws a replace response to the correct URL', () => {
		const url = new URL('https://www.example.com/day')
		const thrownValue = getThrownValue(() =>
			assertURLIsCorrectForGameState(url),
		)
		expect(thrownValue).toBeInstanceOf(Response)
		expect(thrownValue).toHaveReplaceRedirect('https://www.example.com/morning')
	})

	test('Ignores URL parameter if URL matches game state URL', () => {
		const paramValue = serializeStateURLParam({ url: 'day' })
		const url = new URL('https://www.example.com/morning')
		url.searchParams.set('initialState', paramValue)
		expect(() => assertURLIsCorrectForGameState(url)).not.toThrow()
	})

	test('Redirects to current game state if URL parameter does not decode properly', () => {
		const paramValue = 'invalidBase64Encoding'
		const url = new URL('https://www.example.com/')
		url.searchParams.set('initialState', paramValue)
		const thrownValue = getThrownValue(() =>
			assertURLIsCorrectForGameState(url),
		)
		expect(thrownValue).toBeInstanceOf(Response)
		expect(thrownValue).toHaveReplaceRedirect('https://www.example.com/morning')
	})

	test('Redirects to current game state if URL parameter does not contain valid JSON', () => {
		const paramValue = btoa('notJSON')
		const url = new URL('https://www.example.com/')
		url.searchParams.set('initialState', paramValue)
		const thrownValue = getThrownValue(() =>
			assertURLIsCorrectForGameState(url),
		)
		expect(thrownValue).toBeInstanceOf(Response)
		expect(thrownValue).toHaveReplaceRedirect('https://www.example.com/morning')
	})

	test('Redirects to current game state if URL parameter contains invalid state', () => {
		initializeGameState.mockImplementation(() => {
			throw new Error('Invalid state')
		})
		const paramValue = serializeStateURLParam({
			someInvalidState: 'you betcha',
		})
		const url = new URL('https://www.example.com/')
		url.searchParams.set('initialState', paramValue)
		const thrownValue = getThrownValue(() =>
			assertURLIsCorrectForGameState(url),
		)
		expect(thrownValue).toBeInstanceOf(Response)
		expect(thrownValue).toHaveReplaceRedirect('https://www.example.com/morning')
	})

	test('Redirects to game state from URL parameter, keeping the query string', () => {
		const paramValue = serializeStateURLParam({ url: 'day' })
		const url = new URL('https://www.example.com/')
		url.searchParams.set('initialState', paramValue)
		const thrownValue = getThrownValue(() =>
			assertURLIsCorrectForGameState(url),
		)
		expect(thrownValue).toBeInstanceOf(Response)
		const expectedUrl = new URL('https://www.example.com/day')
		expectedUrl.search = url.search
		expect(thrownValue).toHaveReplaceRedirect(expectedUrl.toString())
	})
})

function serializeStateURLParam(state: unknown) {
	return btoa(JSON.stringify(state))
}
