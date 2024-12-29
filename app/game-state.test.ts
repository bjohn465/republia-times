import {
	beforeEach,
	describe,
	expect,
	type MockInstance,
	test,
	vi,
} from 'vitest'
import {
	GameScreen,
	type GameState,
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
		const initialState = {
			...existingState,
			screen:
				existingState.screen === GameScreen.Morning
					? GameScreen.Day
					: GameScreen.Morning,
		}
		const returnedState = initializeGameState(initialState)
		expect(returnedState).toEqual(initialState)
		expect(getGameState()).toEqual(returnedState)
	})
})

describe('startWork', () => {
	test('Throws error if screen value is invalid', () => {
		const existingState = getGameState()
		initializeGameState({
			...existingState,
			screen: GameScreen.Day,
		})
		expect(() => {
			startWork()
		}).toThrowError('Invalid state for startWork')
	})

	test('Updates and returns screen value in game state', () => {
		const existingState = getGameState()
		initializeGameState({
			...existingState,
			screen: GameScreen.Morning,
		})
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
		const paramValue = btoa('notJSON')
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
		const paramValue = btoa(JSON.stringify({ screen: 'invalid', v: 'nope' }))
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
		const newState: GameState = {
			screen:
				existingState.screen === GameScreen.Morning
					? GameScreen.Day
					: GameScreen.Morning,
			v: 1,
		}
		const paramValue = btoa(JSON.stringify(newState))
		const returnedState = initializeGameStateFromURL(
			new URL(`https://www.example.com/?${gameStateURLParam}=${paramValue}`),
		)
		expect(returnedState).not.toEqual(existingState)
		expect(returnedState).toEqual(newState)
		expect(getGameState()).toEqual(returnedState)
	})
})

describe('getURLPathFromGameState', () => {
	test('Returns path for morning state', () => {
		const existingState = getGameState()
		initializeGameState({
			...existingState,
			screen: GameScreen.Morning,
		})
		expect(getURLPathFromGameState()).toBe('/morning')
	})

	test('Returns path for day state', () => {
		const existingState = getGameState()
		initializeGameState({
			...existingState,
			screen: GameScreen.Day,
		})
		expect(getURLPathFromGameState()).toBe('/day')
	})
})
