import { assert, describe, expect, test } from 'vitest'
import {
	getDayStateInput,
	getMorningStateInput,
	getThrownValue,
} from '#tests/utils.ts'
import { DayState } from './day-state.ts'
import {
	getExpectedGameState,
	getGameState,
	initializeGameState,
	updateGameState,
} from './game-state.ts'
import { MorningState } from './morning-state.ts'

describe('getExpectedGameState', () => {
	test('Throws a Response when current state is not the expected state', async () => {
		updateGameState(MorningState.parse(getMorningStateInput()))
		const thrownValue = getThrownValue(() =>
			getExpectedGameState(DayState, 'Expected DayState'),
		)
		assert.instanceOf(thrownValue, Response)
		expect(thrownValue).toEqual(
			expect.objectContaining({
				status: 400,
				statusText: 'Bad Request',
			}),
		)
		await expect(thrownValue.text()).resolves.toBe('Expected DayState')
	})

	test('Returns current state when current state is the expected state', () => {
		const expectedState = DayState.parse(getDayStateInput())
		updateGameState(expectedState)
		const state = getExpectedGameState(DayState, 'Expected DayState')
		expect(state).toBe(expectedState)
	})
})

describe('initializeGameState', () => {
	test('Throws and does not update the current state if the initial state does not contain a valid screen value', () => {
		const startingState = getGameState()
		expect(() => initializeGameState({ screen: 'notValid' })).toThrowError()
		expect(getGameState()).toBe(startingState)
	})
})
