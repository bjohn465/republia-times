import { invariant } from '@epic-web/invariant'
import { type NewsItem } from './news-items.ts'

export function hydratePaper({
	newsItems,
	paper,
}: {
	newsItems: ReadonlyMap<NewsItem['id'], NewsItem>
	paper: { articles: ReadonlyArray<Readonly<{ newsItem: NewsItem['id'] }>> }
}) {
	return Object.freeze({
		...paper,
		articles: Object.freeze(
			paper.articles.map((article) => {
				const newsItem = newsItems.get(article.newsItem)
				invariant(
					newsItem,
					`Unable to find news item with ID "${article.newsItem}"`,
				)
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
				}),
			),
		),
	})
}
