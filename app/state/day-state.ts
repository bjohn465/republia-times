import * as v from 'valibot'
import { invariantResponse } from '#app/invariant.ts'
import { type ArticleSize, ArticleSizeSchema } from './article-size.ts'
import { BaseGameStateSchema } from './base-game-state.ts'
import { GameScreen } from './game-screen.ts'
import { getNewsItem } from './news-item-data.ts'
import {
	type NewsItemId,
	NewsItemSchema,
	NewsItemIdSchema,
} from './news-item.ts'
import { hydratePaper } from './state-utils.ts'

export class DayState {
	static fromMorningState() {
		return DayState.parse({
			newsItems: ['bBQb', '9MrF'],
			screen: GameScreen.Day,
			paper: { articles: [] },
		} satisfies DayStateShorthand)
	}

	static parse(state: unknown): DayState {
		return new DayState(v.parse(DayStateShorthandSchema, state))
	}

	readonly #state: DayStateObject

	constructor(state: DayStateObject) {
		// `state` will be the correct type,
		// but parse it so we can validate the data.
		this.#state = v.parse(DayStateObjectSchema, state)
	}

	get newsItems() {
		return this.#state.newsItems
	}

	get paper() {
		return this.#state.paper
	}

	get screen() {
		return this.#state.screen
	}

	get url() {
		return '/day' as const
	}

	#getNewsItemById(id: NewsItemId) {
		const newsItem = this.#state.newsItems.get(id)
		invariantResponse(newsItem, 'Invalid news item')
		return newsItem
	}

	addToPaper(newsItemID: NewsItemId, size: ArticleSize) {
		const newsItem = this.#getNewsItemById(newsItemID)
		const hasNewsItemAlready = this.#state.paper.articles.some(
			(article) => article.newsItem.id === newsItemID,
		)
		return hasNewsItemAlready
			? this
			: new DayState({
					...this.#state,
					paper: {
						...this.#state.paper,
						articles: [...this.#state.paper.articles, { newsItem, size }],
					},
				})
	}

	removeFromPaper(newsItemID: NewsItemId) {
		const newsItem = this.#getNewsItemById(newsItemID)
		const updatedArticles = this.#state.paper.articles.filter(
			(article) => article.newsItem.id !== newsItem.id,
		)
		const wasItemRemoved =
			updatedArticles.length < this.#state.paper.articles.length
		return wasItemRemoved
			? new DayState({
					...this.#state,
					paper: {
						...this.#state.paper,
						articles: updatedArticles,
					},
				})
			: this
	}
}

const DayStateShorthandSchema = v.pipe(
	v.object({
		...BaseGameStateSchema.entries,
		newsItems: v.pipe(
			v.array(NewsItemIdSchema),
			v.checkItems(
				(id, index, idsArray) => idsArray.indexOf(id) === index,
				({ input }) => {
					return `Each news item must be unique. Received duplicate item "${input}".`
				},
			),
			v.transform(
				(idsArray) => new Map(idsArray.map((id) => [id, getNewsItem(id)])),
			),
			v.readonly(),
		),
		paper: v.object({
			articles: v.array(
				v.object({
					newsItem: NewsItemIdSchema,
					size: ArticleSizeSchema,
				}),
			),
		}),
		screen: v.literal(GameScreen.Day),
	}),
	v.transform((state) => {
		return {
			...state,
			paper: hydratePaper({
				newsItems: state.newsItems,
				paper: state.paper,
			}),
		}
	}),
	v.readonly(),
)
type DayStateShorthand = v.InferInput<typeof DayStateShorthandSchema>

const DayStateObjectSchema = v.pipe(
	v.object({
		...BaseGameStateSchema.entries,
		newsItems: v.pipe(
			v.map(NewsItemIdSchema, NewsItemSchema),
			v.check(
				(newsItems) =>
					Array.from(newsItems.entries()).every(
						([id, newsItem]) => id === newsItem.id,
					),
				'Each news item Map key must match its ID.',
			),
			v.readonly(),
		),
		paper: v.pipe(
			v.object({
				articles: v.pipe(
					v.array(
						v.pipe(
							v.object({ newsItem: NewsItemSchema, size: ArticleSizeSchema }),
							v.readonly(),
						),
					),
					v.checkItems(
						({ newsItem }, index, articlesArray) =>
							articlesArray.findIndex(
								(article) => article.newsItem.id === newsItem.id,
							) === index,
						({
							input: {
								newsItem: { id },
							},
						}) => {
							return `Each article must reference a unique news item. Received duplicate item "${id}".`
						},
					),
					v.readonly(),
				),
			}),
			v.readonly(),
		),
		screen: v.literal(GameScreen.Day),
	}),
	v.check(({ newsItems, paper: { articles } }) => {
		return articles.every(({ newsItem: { id } }) => {
			return newsItems.has(id)
		})
	}, 'All articles must reference news items in the newsItems array.'),
	v.readonly(),
)
type DayStateObject = v.InferOutput<typeof DayStateObjectSchema>
