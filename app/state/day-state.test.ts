import { describe, expect, test } from 'vitest'
import { getDayStateInput } from '#tests/utils.ts'
import { DayState } from './day-state.ts'
import { newsItemIdTag as newsItemId } from './news-item.ts'

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
		).toThrowError(/^Invalid characters in news item ID "notValid"$/)
	})

	test('Throws when newsItems array contains duplicate IDs', () => {
		expect(() =>
			DayState.parse(getDayStateInput({ newsItems: ['bBQb', 'bBQb'] })),
		).toThrowError(
			'Each news item must be unique\. Received duplicate item "bBQb"\.',
		)
	})

	test('Throws when an article contains an invalid newsItem ID', () => {
		expect(() =>
			DayState.parse(
				getDayStateInput({ paper: { articles: [{ newsItem: 'notValid' }] } }),
			),
		).toThrowError(/^Invalid characters in news item ID "notValid"$/)
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
			/^All articles must reference news items in the newsItems array\.$/,
		)
	})

	test('Throws when two articles reference the same news item', () => {
		expect(() =>
			DayState.parse(
				getDayStateInput({
					newsItems: ['bBQb'],
					paper: { articles: [{ newsItem: 'bBQb' }, { newsItem: 'bBQb' }] },
				}),
			),
		).toThrowError(
			/^Each article must reference a unique news item\. Received duplicate item "bBQb"\.$/,
		)
	})

	test('Returns DayState instance', () => {
		const state = DayState.parse(getDayStateInput())
		expect(state).toBeInstanceOf(DayState)
	})
})

describe('addToPaper', () => {
	test('Returns new DayState with news item added to paper', () => {
		const state = DayState.parse(
			getDayStateInput({
				newsItems: ['bBQb'],
			}),
		)
		const newState = state.addToPaper(newsItemId`bBQb`)
		expect(newState).toBeInstanceOf(DayState)
		expect(newState).not.toBe(state)
		expect(Array.from(newState.newsItems.keys())).toEqual(['bBQb'])
		expect(newState.paper).toEqual({
			articles: [{ newsItem: expect.objectContaining({ id: 'bBQb' }) }],
		})
	})

	test('Throws when news item ID is not in the newsItems collection', () => {
		const state = DayState.parse(getDayStateInput({ newsItems: ['bBQb'] }))
		expect(() => state.addToPaper(newsItemId`9MrF`)).toThrowError()
	})

	test('Returns same state when news item ID is already in the paper', () => {
		const state = DayState.parse(
			getDayStateInput({
				newsItems: ['bBQb'],
				paper: { articles: [{ newsItem: 'bBQb' }] },
			}),
		)
		expect(state.addToPaper(newsItemId`bBQb`)).toBe(state)
	})
})

describe('removeFromPaper', () => {
	test('Returns new DayState with news item removed from paper', () => {
		const state = DayState.parse(
			getDayStateInput({
				newsItems: ['bBQb'],
				paper: { articles: [{ newsItem: 'bBQb' }] },
			}),
		)
		const newState = state.removeFromPaper(newsItemId`bBQb`)
		expect(newState).toBeInstanceOf(DayState)
		expect(newState).not.toBe(state)
		expect(Array.from(newState.newsItems.keys())).toEqual(['bBQb'])
		expect(newState.paper).toEqual({
			articles: [],
		})
	})

	test('Throws when news item ID is not in the newsItems collection', () => {
		const state = DayState.parse(
			getDayStateInput({
				newsItems: ['bBQb'],
				paper: { articles: [{ newsItem: 'bBQb' }] },
			}),
		)
		expect(() => state.removeFromPaper(newsItemId`9MrF`)).toThrowError()
	})

	test('Returns same state when news item ID is not in the paper', () => {
		const state = DayState.parse(
			getDayStateInput({
				newsItems: ['bBQb', '9MrF'],
				paper: { articles: [{ newsItem: 'bBQb' }] },
			}),
		)
		expect(state.removeFromPaper(newsItemId`9MrF`)).toBe(state)
	})
})
