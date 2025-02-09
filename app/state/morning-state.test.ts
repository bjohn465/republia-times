import { type DeepPartial } from 'utility-types'
import { describe, expect, test } from 'vitest'
import { DayState } from './day-state.ts'
import { GameScreen } from './game-screen.ts'
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

function getMorningStateInput(overrides?: DeepPartial<{ screen: string }>) {
	const defaults = {
		screen: GameScreen.Morning,
		v: 1,
	}
	return { ...defaults, ...overrides }
}
