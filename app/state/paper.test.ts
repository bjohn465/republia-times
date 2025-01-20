import * as v from 'valibot'
import { describe, expect, test } from 'vitest'
import { PaperSchema } from './paper.ts'

const testNewsItemIDs = ['bBQb', '9MrF'] as const

describe('PaperSchema', () => {
	test('Parses good input without issues', () => {
		const result = v.safeParse(PaperSchema, {
			articles: [
				{ newsItem: testNewsItemIDs[0] },
				{ newsItem: testNewsItemIDs[1] },
			],
		})
		expect(result).toMatchObject({
			success: true,
			issues: undefined,
		})
	})

	test('Fails parsing if multiple articles reference the same news item', () => {
		const result = v.safeParse(PaperSchema, {
			articles: [
				{ newsItem: testNewsItemIDs[0] },
				{ newsItem: testNewsItemIDs[1] },
				{ newsItem: testNewsItemIDs[0] },
				{ newsItem: testNewsItemIDs[1] },
			],
		})
		expect(result).toMatchObject({
			success: false,
			issues: [
				{
					message:
						'Each article must have a unique news item; Received duplicate item "bBQb"',
					path: [{ key: 'articles' }, { key: 2 }],
				},
				{
					message:
						'Each article must have a unique news item; Received duplicate item "9MrF"',
					path: [{ key: 'articles' }, { key: 3 }],
				},
			],
		})
	})
})
