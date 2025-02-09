import { invariant } from '@epic-web/invariant'
import { type NewsItem } from './news-items.ts'

export function hydratePaper({
	newsItems,
	paper,
}: {
	newsItems: ReadonlyMap<NewsItem['id'], NewsItem>
	paper: { articles: ReadonlyArray<Readonly<{ newsItem: NewsItem['id'] }>> }
}) {
	return {
		...paper,
		articles: paper.articles.map((article) => {
			const newsItem = newsItems.get(article.newsItem)
			invariant(
				newsItem,
				`Unable to find news item with ID "${article.newsItem}"`,
			)
			return {
				...article,
				newsItem,
			}
		}),
	}
}

export function dehydratePaper(paper: ReturnType<typeof hydratePaper>) {
	return {
		...paper,
		articles: paper.articles.map((article) => ({
			...article,
			newsItem: article.newsItem.id,
		})),
	}
}
