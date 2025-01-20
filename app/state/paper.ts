import * as v from 'valibot'
import { getNewsItem, NewsItemIDSchema } from './news-items.ts'

const ArticleSchema = v.object({
	newsItem: v.pipe(
		NewsItemIDSchema,
		v.transform((id) => getNewsItem(id)),
	),
})
type Article = v.InferOutput<typeof ArticleSchema>
type ArticleNewsItem = Article['newsItem']

export const PaperSchema = v.pipe(
	v.object({
		articles: v.pipe(
			v.array(ArticleSchema),
			v.checkItems(
				(article, index, articlesArray) => {
					return (
						articlesArray.findIndex(
							(articleToCheck) =>
								articleToCheck.newsItem.id === article.newsItem.id,
						) === index
					)
				},
				({ input }) => {
					return `Each article must have a unique news item; Received duplicate item "${input.newsItem.id}"`
				},
			),
			v.readonly(),
		),
	}),
	v.readonly(),
)
type Paper = v.InferOutput<typeof PaperSchema>

export function addArticleToPaper(
	paper: Paper,
	newsItem: ArticleNewsItem,
): Paper {
	return {
		...paper,
		articles: [...paper.articles, { newsItem }],
	}
}
