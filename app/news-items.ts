import { t } from '@lingui/core/macro'

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
			id: newsItemID`bBQbtcHtk6`,
			feedText: t`Tennis star Restojiu powers through semifinal brackets`,
			articleText: t`Tennis Star Advances!`,
		},
		{
			id: newsItemID`9MrFpfzwbc`,
			feedText: t`Mega-group HugginBoyz admits to not singing on any albums, can barely dance`,
			articleText: t`HugginBoyz: Talentless After All!`,
		},
	]
	newsItems.forEach((item) => {
		newsItemsByID.set(item.id, Object.freeze(item))
	})
}

function newsItemID(
	strings: TemplateStringsArray,
	...params: unknown[]
): NewsItemID {
	return String.raw({ raw: strings }, ...params) as NewsItemID
}

export interface NewsItem {
	id: NewsItemID
	feedText: string
	articleText: string
}

// Use a "branded type" for the news item ID,
// so not just any string is used for an ID.
declare const newsItemIDSymbol: unique symbol
type NewsItemID = string & { [newsItemIDSymbol]: void }
