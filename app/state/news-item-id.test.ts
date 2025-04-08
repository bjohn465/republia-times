import { describe, expect, test } from 'vitest'
import { newsItemIdTag, toNewsItemId } from './news-item-id.ts'

describe('toNewsItemId', () => {
	test('Returns a valid news item ID', () => {
		expect(toNewsItemId('bBQb')).toBe('bBQb')
	})

	test('Throws when ID contains invalid characters', () => {
		expect(() => toNewsItemId('notValid')).toThrowError(
			/^Invalid characters in news item ID "notValid"$/,
		)
	})

	test('Throws when ID is not the correct length', () => {
		expect(() => toNewsItemId('jkmnp')).toThrowError(
			/^News item ID "jkmnp" is not the correct length$/,
		)
		expect(() => toNewsItemId('jkm')).toThrowError(
			/^News item ID "jkm" is not the correct length$/,
		)
	})
})

describe('newsItemIdTag', () => {
	test('Returns a valid news item ID', () => {
		expect(newsItemIdTag`bBQb`).toBe('bBQb')
	})

	test('Allows string expressions', () => {
		expect(newsItemIdTag`${'bBQb'}`).toBe('bBQb')
		expect(newsItemIdTag`bB${'Qb'}`).toBe('bBQb')
		expect(newsItemIdTag`${'bB'}${'Qb'}`).toBe('bBQb')
	})

	test('Throws when ID contains invalid characters', () => {
		expect(() => newsItemIdTag`notValid`).toThrowError(
			/^Invalid characters in news item ID "notValid"$/,
		)
	})

	test('Throws when ID is not the correct length', () => {
		expect(() => newsItemIdTag`jkmnp`).toThrowError(
			/^News item ID "jkmnp" is not the correct length$/,
		)
		expect(() => newsItemIdTag`jkm`).toThrowError(
			/^News item ID "jkm" is not the correct length$/,
		)
	})
})
