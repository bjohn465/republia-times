import { invariant } from '#app/invariant.ts'
import { type ArticleSize } from './article-size.ts'
import { type NewsItem, type NewsItemId } from './news-item.ts'

export function getNewsItemFromCollection(
	newsItems: NewsItemsCollection,
	id: NewsItemId,
) {
	const item = newsItems.get(id)
	invariant(item, `Unable to find news item with ID "${id}"`)
	return item
}

export function hydratePaper({
	newsItems,
	paper,
}: {
	newsItems: NewsItemsCollection
	paper: {
		articles: ReadonlyArray<
			Readonly<{ newsItem: NewsItemId; size: ArticleSize }>
		>
	}
}) {
	return Object.freeze({
		...paper,
		articles: Object.freeze(
			paper.articles.map((article) => {
				const newsItem = getNewsItemFromCollection(newsItems, article.newsItem)
				return Object.freeze({
					...article,
					newsItem,
				})
			}),
		),
	})
}

export function dehydratePaper(paper: ReturnType<typeof hydratePaper>) {
	return Object.freeze({
		...paper,
		articles: Object.freeze(
			paper.articles.map((article) =>
				Object.freeze({
					...article,
					newsItem: article.newsItem.id,
					size: article.size,
				}),
			),
		),
	})
}

type NewsItemsCollection = ReadonlyMap<NewsItemId, NewsItem>
