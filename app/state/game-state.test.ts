import { beforeEach, describe, expect, test } from 'vitest'
import {
	encodeGameStateURLParamValue,
	gameStateToURLSearchParams,
	getDayGameState,
	getMorningGameState,
} from '#tests/utils.ts'
import { GameScreen } from './game-screen.ts'
import {
	getGameState,
	getInitialGameStateFromURL,
	getURLPathFromGameState,
	initializeGameState,
	startWork,
} from './game-state.ts'

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
	test('Throws when initial state is invalid', () => {
		expect(() => initializeGameState({ screen: 'notValid' })).toThrowError(
			/^Invalid type: Expected .+? but received "notValid"$/,
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

describe('getInitialGameStateFromURL', () => {
	const gameStateURLParam = 'initialState'

	test('Throws when initial state URL param is missing', () => {
		expect(() =>
			getInitialGameStateFromURL(new URL('https://www.example.com')),
		).toThrow(/^URL does not contain an initial game state$/)
	})

	test('Throws when initial state URL param contains invalid character', () => {
		expect(() =>
			getInitialGameStateFromURL(
				new URL(`https://www.example.com/?${gameStateURLParam}=-`),
			),
		).toThrow(/^Invalid character$/)
	})

	test('Throws when initial state URL param contains invalid JSON', () => {
		const paramValue = encodeGameStateURLParamValue('notJSON')
		expect(() =>
			getInitialGameStateFromURL(
				new URL(`https://www.example.com/?${gameStateURLParam}=${paramValue}`),
			),
		).toThrow(/^Unexpected token .+? "notJSON" is not valid JSON$/)
	})

	test('Throws when initial state URL param contains invalid state', () => {
		const paramValue = encodeGameStateURLParamValue(
			JSON.stringify({ screen: 'invalid', v: 'nope' }),
		)
		expect(() =>
			getInitialGameStateFromURL(
				new URL(`https://www.example.com/?${gameStateURLParam}=${paramValue}`),
			),
		).toThrow(/^Invalid type: Expected .+? but received "invalid"$/)
	})

	test('Returns initial game state without updating the current game state', () => {
		const existingState = getGameState()
		const newState = getDayGameState()
		const returnedState = getInitialGameStateFromURL(
			new URL(
				`https://www.example.com/?${gameStateToURLSearchParams(newState).toString()}`,
			),
		)
		expect(returnedState).not.toEqual(existingState)
		expect(returnedState).toEqual(newState)
		expect(getGameState()).not.toEqual(returnedState)
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
