import { t } from '@lingui/core/macro'
import { invariant } from '#app/invariant.ts'
import {
	newsItemIdTag as newsItemId,
	type NewsItem,
	type NewsItemId,
} from './news-item.ts'

const newsItemsById = new Map(
	(
		[
			{
				id: newsItemId`bBQb`,
				getFeedText: () =>
					t`Tennis star Restojiu powers through semifinal brackets`,
				getArticleText: () => t`Tennis Star Advances!`,
			},
			{
				id: newsItemId`9MrF`,
				getFeedText: () =>
					t`Mega-group HugginBoyz admits to not singing on any albums, can barely dance`,
				getArticleText: () => t`HugginBoyz: Talentless After All!`,
			},
		] as const
	).map((item) => [item.id, item]),
)

export function getNewsItem(id: NewsItemId): NewsItem {
	const item = newsItemsById.get(id)
	invariant(item, `Unable to find news item with ID ${id}`)
	return Object.freeze({
		id: item.id,
		articleText: item.getArticleText(),
		feedText: item.getFeedText(),
	})
}
