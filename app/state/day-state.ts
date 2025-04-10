import * as v from 'valibot'
import { invariantResponse } from '#app/invariant.ts'
import { BaseGameStateSchema } from './base-game-state.ts'
import { GameScreen } from './game-screen.ts'
import { type NewsItemId, NewsItemIdSchema } from './news-item-id.ts'
import { getNewsItem } from './news-items.ts'
import { hydratePaper } from './state-utils.ts'

export class DayState {
	static fromMorningState() {
		return DayState.parse({
			newsItems: ['bBQb', '9MrF'],
			screen: GameScreen.Day,
			paper: { articles: [] },
		} satisfies DayStateObjectInput)
	}

	static parse(state: unknown): DayState {
		return new DayState(v.parse(DayStateObjectSchema, state))
	}

	#state: DayStateObjectOutput

	constructor(state: DayStateObjectOutput) {
		this.#state = state
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

	addToPaper(newsItemID: NewsItemId) {
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
						articles: [...this.#state.paper.articles, { newsItem }],
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

const DayStateObjectSchema = v.pipe(
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
			articles: v.pipe(
				v.array(v.object({ newsItem: NewsItemIdSchema })),
				v.checkItems(
					({ newsItem }, index, articlesArray) => {
						return (
							articlesArray.findIndex(
								(article) => article.newsItem === newsItem,
							) === index
						)
					},
					({ input: { newsItem } }) => {
						return `Each article must reference a unique news item. Received duplicate item "${newsItem}".`
					},
				),
			),
		}),
		screen: v.literal(GameScreen.Day),
	}),
	v.check(({ newsItems, paper: { articles } }) => {
		return articles.every((article) => {
			return newsItems.has(article.newsItem)
		})
	}, 'All articles must reference news items in the newsItems array.'),
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
type DayStateObjectInput = v.InferInput<typeof DayStateObjectSchema>
type DayStateObjectOutput = v.InferOutput<typeof DayStateObjectSchema>
