import { assert, describe, expect, test } from 'vitest'
import { getDayStateInput, getThrownValue } from '#tests/utils.ts'
import { assertDayState, DayState } from './day-state.ts'

describe('assertDayState', () => {
	test('Throws a Response when value is not a DayState', async () => {
		const thrownValue = getThrownValue(() =>
			assertDayState({ screen: 'day' }, 'Invalid game state'),
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
			assertDayState({ screen: 'day' }, 'Where did it go?', {
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
			assertDayState(
				DayState.parse(getDayStateInput()),
				'Should not be invalid',
			),
		).not.toThrow()
	})
})

describe('DayState.fromMorningState', () => {
	test('Returns DayState with correct values', () => {
		const state = DayState.fromMorningState()
		expect(state).toBeInstanceOf(DayState)
		const { newsItems, paper } = state
		expect(newsItems).toBeInstanceOf(Map)
		expect(Array.from(newsItems.keys())).toEqual(['bBQb', '9MrF'])
		expect(paper).toEqual({ articles: [] })
	})
})

describe('DayState.parse', () => {
	test('Throws when screen value is invalid', () => {
		expect(() =>
			DayState.parse(getDayStateInput({ screen: 'notValid' })),
		).toThrowError(/^Invalid type: Expected "day" but received "notValid"$/)
	})

	test('Throws when newsItems array contains an invalid ID', () => {
		expect(() =>
			DayState.parse(getDayStateInput({ newsItems: ['notValid'] })),
		).toThrowError(/^Invalid News Item ID: Received "notValid"$/)
	})

	test('Throws when newsItems array contains duplicate IDs', () => {
		expect(() =>
			DayState.parse(getDayStateInput({ newsItems: ['bBQb', 'bBQb'] })),
		).toThrowError(
			'Each news item must be unique; Received duplicate item "bBQb"',
		)
	})

	test('Throws when an article contains an invalid newsItem ID', () => {
		expect(() =>
			DayState.parse(
				getDayStateInput({ paper: { articles: [{ newsItem: 'notValid' }] } }),
			),
		).toThrowError(/^Invalid News Item ID: Received "notValid"$/)
	})

	test('Throws when an article contains a newsItem that does not exist in the newsItems array', () => {
		expect(() =>
			DayState.parse(
				getDayStateInput({
					newsItems: ['bBQb'],
					paper: { articles: [{ newsItem: '9MrF' }] },
				}),
			),
		).toThrowError(
			/^All articles must reference news items in the newsItems array.$/,
		)
	})

	test('Returns DayState instance', () => {
		const state = DayState.parse(getDayStateInput())
		expect(state).toBeInstanceOf(DayState)
	})
})
