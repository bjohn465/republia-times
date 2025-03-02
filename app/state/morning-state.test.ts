import { describe, expect, test } from 'vitest'
import { getMorningStateInput } from '#tests/utils.ts'
import { DayState } from './day-state.ts'
import { MorningState } from './morning-state.ts'

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
