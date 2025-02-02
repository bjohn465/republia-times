import { invariant } from '@epic-web/invariant'
import { t } from '@lingui/core/macro'
import * as v from 'valibot'

const newsItemsByID = new Map(
	(
		[
			{
				id: 'bBQb',
				getFeedText: () =>
					t`Tennis star Restojiu powers through semifinal brackets`,
				getArticleText: () => t`Tennis Star Advances!`,
			},
			{
				id: '9MrF',
				getFeedText: () =>
					t`Mega-group HugginBoyz admits to not singing on any albums, can barely dance`,
				getArticleText: () => t`HugginBoyz: Talentless After All!`,
			},
		] as const
	).map((item) => [item.id, item]),
)

export function getNewsItem(id: NewsItemID): NewsItem {
	const item = newsItemsByID.get(id)
	invariant(item, `Unable to find news item with ID ${id}`)
	return {
		id: item.id,
		articleText: item.getArticleText(),
		feedText: item.getFeedText(),
	}
}

export const NewsItemIDSchema = v.picklist(
	Array.from(newsItemsByID.keys()),
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
