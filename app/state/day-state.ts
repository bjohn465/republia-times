import * as v from 'valibot'
import { BaseGameStateSchema } from './base-game-state.ts'
import { GameScreen } from './game-screen.ts'
import { getNewsItem, NewsItemIDSchema } from './news-items.ts'
import { hydratePaper } from './state-utils.ts'

const DayStateObjectSchema = v.pipe(
	v.object({
		...BaseGameStateSchema.entries,
		newsItems: v.pipe(
			v.array(NewsItemIDSchema),
			v.checkItems(
				(id, index, idsArray) => idsArray.indexOf(id) === index,
				({ input }) => {
					return `Each news item must be unique; Received duplicate item "${input}"`
				},
			),
			v.transform((idsArray) =>
				toReadonlyMap(new Map(idsArray.map((id) => [id, getNewsItem(id)]))),
			),
		),
		paper: v.object({
			articles: v.array(v.object({ newsItem: NewsItemIDSchema })),
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
}

function toReadonlyMap<K, V>(map: Map<K, V>): ReadonlyMap<K, V> {
	return map
}
