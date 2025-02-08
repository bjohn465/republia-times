import { invariant } from '@epic-web/invariant'
import * as v from 'valibot'
import { UnsupportedValueError } from '#app/unsupported-value-error.ts'
import { GameScreen, GameScreenSchema } from './game-screen.ts'
import { NewsItemSchema } from './news-items.ts'
import { PaperSchema } from './paper.ts'

const BaseGameStateSchema = v.object({
	screen: GameScreenSchema,
	v: v.literal(1),
})

const MorningStateSchema = v.object({
	...BaseGameStateSchema.entries,
	screen: v.literal(GameScreen.Morning),
})
export type MorningState = v.InferOutput<typeof MorningStateSchema>

const DayStateSchema = v.pipe(
	v.object({
		...BaseGameStateSchema.entries,
		newsItems: v.pipe(
			v.array(NewsItemSchema),
			v.checkItems(
				(newsItem, index, newsItemsArray) => {
					return (
						newsItemsArray.findIndex(
							(newsItemToCheck) => newsItemToCheck.id === newsItem.id,
						) === index
					)
				},
				({ input }) => {
					return `Each news item must be unique; Received duplicate item "${input.id}"`
				},
			),
		),
		screen: v.literal(GameScreen.Day),
		paper: PaperSchema,
	}),
	v.forward(
		v.check(({ newsItems, paper: { articles } }) => {
			return articles.every((article) => {
				return newsItems.some((newsItem) => newsItem.id === article.newsItem.id)
			})
		}, 'All articles must reference news items in the newsItems array.'),
		['paper', 'articles'],
	),
)
export type DayStateInput = v.InferInput<typeof DayStateSchema>
export type DayState = v.InferOutput<typeof DayStateSchema>

const GameStateSchema = v.variant('screen', [
	MorningStateSchema,
	DayStateSchema,
])
export type GameStateInput = v.InferInput<typeof GameStateSchema>
export type GameState = v.InferOutput<typeof GameStateSchema>

let gameState: GameState = {
	screen: GameScreen.Morning,
	v: 1,
}

export function getGameState(): GameState {
	return structuredClone(gameState)
}

export function startWork(): GameState {
	invariant(
		gameState.screen === GameScreen.Morning,
		'Invalid state for startWork',
	)
	gameState = v.parse(DayStateSchema, {
		...gameState,
		newsItems: ['bBQb', '9MrF'],
		screen: GameScreen.Day,
		paper: {
			articles: [],
		},
	} satisfies DayStateInput)
	return getGameState()
}

export function initializeGameState(initialState: unknown): GameState {
	gameState = v.parse(GameStateSchema, initialState)
	return getGameState()
}

export const gameStateURLParam = 'initialState'

export function getInitialStateURLParamValue(url: URL) {
	const paramValue = url.searchParams.get(gameStateURLParam)
	invariant(paramValue, 'URL does not contain an initial game state')
	return paramValue
}

export function getInitialGameStateFromURL(url: URL): unknown {
	const rawParamValue = getInitialStateURLParamValue(url)
	const decodedParamValue = atob(rawParamValue)
	return JSON.parse(decodedParamValue)
}

export function getURLPathFromGameState() {
	switch (gameState.screen) {
		case GameScreen.Morning: {
			return '/morning'
		}
		case GameScreen.Day: {
			return '/day'
		}
		/* c8 ignore next 3 */
		default: {
			throw new UnsupportedValueError(gameState)
		}
	}
}
