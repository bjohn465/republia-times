import { invariant } from '@epic-web/invariant'
import { t } from '@lingui/core/macro'
import * as v from 'valibot'

const newsItems = [
	{
		id: 'bBQb',
		feedText: () => t`Tennis star Restojiu powers through semifinal brackets`,
		articleText: () => t`Tennis Star Advances!`,
	},
	{
		id: '9MrF',
		feedText: () =>
			t`Mega-group HugginBoyz admits to not singing on any albums, can barely dance`,
		articleText: () => t`HugginBoyz: Talentless After All!`,
	},
] as const

const newsItemsByID = new Map(newsItems.map((item) => [item.id, item]))

export function getNewsItems() {
	return newsItems
}

export function getNewsItem(id: NewsItemID) {
	const item = newsItemsByID.get(id)
	invariant(item, `Unable to find news item with ID ${id}`)
	return item
}

export const NewsItemIDSchema = v.picklist(
	newsItems.map((item) => item.id),
	// Specify our own message,
	// since the default message
	// outputs all of the picklist values.
	({ received }) => `Invalid News Item ID: Received ${received}`,
)
type NewsItemID = v.InferOutput<typeof NewsItemIDSchema>

export type NewsItem = {
	id: NewsItemID
	feedText: string
	articleText: string
}
