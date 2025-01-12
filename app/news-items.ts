import { invariant } from '@epic-web/invariant'
import { t } from '@lingui/core/macro'
import * as v from 'valibot'
import { newsItemID, type NewsItemID, NewsItemIDSchema } from './news-item-id'

const PreTranslatedTextSchema = v.pipe(
	v.function(),
	v.args(v.tuple([])),
	v.returns(v.string()),
)
type PreTranslatedText = v.InferOutput<typeof PreTranslatedTextSchema>
type PreTranslatedTextReturn = ReturnType<PreTranslatedText>
const PreTranslatedTextTransform = v.transform<
	PreTranslatedText,
	PreTranslatedTextReturn
>((preTranslatedText) => preTranslatedText())

export const PreTranslatedNewsItemSchema = v.object({
	id: NewsItemIDSchema,
	feedText: PreTranslatedTextSchema,
	articleText: PreTranslatedTextSchema,
})
export type PreTranslatedNewsItem = v.InferOutput<
	typeof PreTranslatedNewsItemSchema
>

export const NewsItemSchema = v.object({
	...PreTranslatedNewsItemSchema.entries,
	feedText: v.pipe(
		PreTranslatedNewsItemSchema.entries.feedText,
		PreTranslatedTextTransform,
	),
	articleText: v.pipe(
		PreTranslatedNewsItemSchema.entries.articleText,
		PreTranslatedTextTransform,
	),
})
export type NewsItem = v.InferOutput<typeof NewsItemSchema>

const newsItems: readonly Readonly<PreTranslatedNewsItem>[] = [
	{
		id: newsItemID`bBQb`,
		feedText: () => t`Tennis star Restojiu powers through semifinal brackets`,
		articleText: () => t`Tennis Star Advances!`,
	},
	{
		id: newsItemID`9MrF`,
		feedText: () =>
			t`Mega-group HugginBoyz admits to not singing on any albums, can barely dance`,
		articleText: () => t`HugginBoyz: Talentless After All!`,
	},
]

const newsItemsByID = new Map(newsItems.map((item) => [item.id, item]))

export function getNewsItems() {
	return newsItems
}

export function getNewsItem(id: NewsItemID) {
	const item = newsItemsByID.get(id)
	invariant(item, `Unable to find news item with ID ${id}`)
	return item
}
