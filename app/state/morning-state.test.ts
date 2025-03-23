import { assert, describe, expect, test } from 'vitest'
import { getMorningStateInput, getThrownValue } from '#tests/utils.ts'
import { DayState } from './day-state.ts'
import { assertMorningState, MorningState } from './morning-state.ts'

describe('assertMorningState', () => {
	test('Throws a Response when value is not a DayState', async () => {
		const thrownValue = getThrownValue(() =>
			assertMorningState({ screen: 'day' }, 'Invalid game state'),
		)
		assert.instanceOf(thrownValue, Response)
		expect(thrownValue).toEqual(
			expect.objectContaining({
				status: 400,
				statusText: 'Bad Request',
			}),
		)
		await expect(thrownValue.text()).resolves.toBe('Invalid game state')
	})

	test('Allows Response to be configured', async () => {
		const thrownValue = getThrownValue(() =>
			assertMorningState({ screen: 'day' }, 'Where did it go?', {
				status: 404,
				statusText: 'Not Found',
			}),
		)
		assert.instanceOf(thrownValue, Response)
		expect(thrownValue).toEqual(
			expect.objectContaining({
				status: 404,
				statusText: 'Not Found',
			}),
		)
		await expect(thrownValue.text()).resolves.toBe('Where did it go?')
	})

	test('Does not throw when value is a DayState', () => {
		expect(() =>
			assertMorningState(
				MorningState.parse(getMorningStateInput()),
				'Should not be invalid',
			),
		).not.toThrow()
	})
})

describe('MorningState.parse', () => {
	test('Throws when screen value is invalid', () => {
		expect(() =>
			MorningState.parse(getMorningStateInput({ screen: 'notValid' })),
		).toThrowError(/^Invalid type: Expected "morning" but received "notValid"$/)
	})

	test('Returns MorningState instance when value is a valid MorningState', () => {
		const state = MorningState.parse(getMorningStateInput())
		expect(state).toBeInstanceOf(MorningState)
	})
})

test('startWork method returns DayState', () => {
	const state = MorningState.parse({ screen: 'morning' })
	const returnedState = state.startWork()
	expect(returnedState).toBeInstanceOf(DayState)
})
