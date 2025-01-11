import { t } from '@lingui/core/macro'
import * as v from 'valibot'

const newsItemsByID = new Map<NewsItemID, Readonly<NewsItem>>()

export function getNewsItems() {
	if (newsItemsByID.size === 0) {
		generateNewsItems()
	}
	return Object.freeze(Array.from(newsItemsByID.values()))
}

function generateNewsItems() {
	const newsItems: NewsItem[] = [
		{
			id: newsItemID`bBQb`,
			feedText: t`Tennis star Restojiu powers through semifinal brackets`,
			articleText: t`Tennis Star Advances!`,
		},
		{
			id: newsItemID`9MrF`,
			feedText: t`Mega-group HugginBoyz admits to not singing on any albums, can barely dance`,
			articleText: t`HugginBoyz: Talentless After All!`,
		},
	]
	newsItems.forEach((item) => {
		newsItemsByID.set(item.id, Object.freeze(item))
	})
}

function newsItemID(strings: TemplateStringsArray): NewsItemID {
	return v.parse(NewsItemIDSchema, String.raw({ raw: strings }))
}

// Use a "branded type" for the news item ID,
// so not just any string is used for an ID.
const NewsItemIDSchema = v.pipe(v.string(), v.brand('NewsItemID'))
type NewsItemID = v.InferOutput<typeof NewsItemIDSchema>

export const NewsItemSchema = v.object({
	id: NewsItemIDSchema,
	feedText: v.string(),
	articleText: v.string(),
})
export type NewsItem = v.InferOutput<typeof NewsItemSchema>
