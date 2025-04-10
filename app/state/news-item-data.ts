import { t } from '@lingui/core/macro'
import * as v from 'valibot'
import { invariant } from '#app/invariant.ts'
import {
	newsItemIdTag as newsItemId,
	type NewsItemId,
	NewsItemIdSchema,
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

export function getNewsItem(id: NewsItemId) {
	const item = newsItemsById.get(id)
	invariant(item, `Unable to find news item with ID ${id}`)
	return Object.freeze({
		id: item.id,
		articleText: item.getArticleText(),
		feedText: item.getFeedText(),
	})
}

export const NewsItemSchema = v.pipe(
	NewsItemIdSchema,
	v.transform((id) => getNewsItem(id)),
)
export type NewsItemInput = v.InferInput<typeof NewsItemSchema>
export type NewsItem = v.InferOutput<typeof NewsItemSchema>
