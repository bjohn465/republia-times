import {
	beforeEach,
	describe,
	expect,
	type MockInstance,
	test,
	vi,
} from 'vitest'
import {
	encodeGameStateURLParamValue,
	gameStateToURLSearchParams,
	getDayGameState,
	getMorningGameState,
} from '#tests/utils.ts'
import { GameScreen } from './game-screen'
import {
	gameStateURLParam,
	getGameState,
	getURLPathFromGameState,
	initializeGameState,
	initializeGameStateFromURL,
	startWork,
} from './game-state'

const emptyFunction = () => {}
let consoleWarn: MockInstance<(typeof console)['warn']>

beforeEach(() => {
	const originalConsoleWarn = console.warn
	consoleWarn = vi.spyOn(console, 'warn')
	consoleWarn.mockImplementation((...args: Parameters<typeof console.warn>) => {
		originalConsoleWarn(...args)
		throw new Error(
			'Console warn was called. Use consoleWarn.mockImplementation if this is expected.',
		)
	})
})

beforeEach(() => {
	initializeGameState(getMorningGameState())
})

describe('getGameState', () => {
	test('Returns deep copy of current game state', () => {
		const state = getGameState()
		expect(state).not.toBe(getGameState())
	})
})

describe('initializeGameState', () => {
	test('Returns current game state when initial state is not given', () => {
		consoleWarn.mockImplementation(emptyFunction)
		const existingState = getGameState()
		expect(initializeGameState()).toEqual(existingState)
		expect(consoleWarn).toHaveBeenCalledOnce()
		expect(consoleWarn).toHaveBeenCalledWith(
			'Unable to initialize game state: ',
			expect.any(Array),
		)
	})

	test('Returns current game state when initial state is invalid', () => {
		consoleWarn.mockImplementation(emptyFunction)
		const existingState = getGameState()
		expect(initializeGameState({ screen: 'notValid' })).toEqual(existingState)
		expect(consoleWarn).toHaveBeenCalledOnce()
		expect(consoleWarn).toHaveBeenCalledWith(
			'Unable to initialize game state: ',
			expect.any(Array),
		)
	})

	test('Updates and returns current game state with valid value', () => {
		const existingState = getGameState()
		const initialState = getDayGameState()
		const returnedState = initializeGameState(initialState)
		expect(returnedState).toEqual(initialState)
		expect(getGameState()).toEqual(returnedState)
		expect(getGameState()).not.toEqual(existingState)
	})
})

describe('startWork', () => {
	test('Throws error if screen value is invalid', () => {
		initializeGameState(getDayGameState())
		expect(() => {
			startWork()
		}).toThrowError('Invalid state for startWork')
	})

	test('Updates and returns screen value in game state', () => {
		const returnedState = startWork()
		expect(returnedState).toHaveProperty('screen', GameScreen.Day)
		expect(getGameState()).toHaveProperty('screen', GameScreen.Day)
	})
})

describe('initializeGameStateFromURL', () => {
	test('Returns current game state when URL param is missing', () => {
		const existingState = getGameState()
		expect(
			initializeGameStateFromURL(new URL('https://www.example.com')),
		).toEqual(existingState)
	})

	test('Returns current game state when URL param contains invalid character', () => {
		consoleWarn.mockImplementation(emptyFunction)
		const existingState = getGameState()
		expect(
			initializeGameStateFromURL(
				new URL(`https://www.example.com/?${gameStateURLParam}=-`),
			),
		).toEqual(existingState)
		expect(consoleWarn).toHaveBeenCalledOnce()
		expect(consoleWarn).toHaveBeenCalledWith(
			'Unable to initialize game state from URL: ',
			expect.any(DOMException),
		)
	})

	test('Returns current game state when URL param contains invalid JSON', () => {
		consoleWarn.mockImplementation(emptyFunction)
		const existingState = getGameState()
		const paramValue = encodeGameStateURLParamValue('notJSON')
		expect(
			initializeGameStateFromURL(
				new URL(`https://www.example.com/?${gameStateURLParam}=${paramValue}`),
			),
		).toEqual(existingState)
		expect(consoleWarn).toHaveBeenCalledOnce()
		expect(consoleWarn).toHaveBeenCalledWith(
			'Unable to initialize game state from URL: ',
			expect.any(SyntaxError),
		)
	})

	test('Returns current game state when URL param contains invalid state', () => {
		consoleWarn.mockImplementation(emptyFunction)
		const existingState = getGameState()
		const paramValue = encodeGameStateURLParamValue(
			JSON.stringify({ screen: 'invalid', v: 'nope' }),
		)
		expect(
			initializeGameStateFromURL(
				new URL(`https://www.example.com/?${gameStateURLParam}=${paramValue}`),
			),
		).toEqual(existingState)
		expect(consoleWarn).toHaveBeenCalledOnce()
		expect(consoleWarn).toHaveBeenCalledWith(
			'Unable to initialize game state: ',
			expect.any(Array),
		)
	})

	test('Updates and returns game state', () => {
		const existingState = getGameState()
		const newState = getDayGameState()
		const returnedState = initializeGameStateFromURL(
			new URL(
				`https://www.example.com/?${gameStateToURLSearchParams(newState).toString()}`,
			),
		)
		expect(returnedState).not.toEqual(existingState)
		expect(returnedState).toEqual(newState)
		expect(getGameState()).toEqual(returnedState)
	})
})

describe('getURLPathFromGameState', () => {
	test('Returns path for morning state', () => {
		initializeGameState(getMorningGameState())
		expect(getURLPathFromGameState()).toBe('/morning')
	})

	test('Returns path for day state', () => {
		initializeGameState(getDayGameState())
		expect(getURLPathFromGameState()).toBe('/day')
	})
})
