import { invariant } from '@epic-web/invariant'
import * as v from 'valibot'
import { UnsupportedValueError } from '#app/unsupported-value-error.ts'
import { GameScreen, GameScreenSchema } from './game-screen.ts'
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

const DayStateSchema = v.object({
	...BaseGameStateSchema.entries,
	screen: v.literal(GameScreen.Day),
	paper: PaperSchema,
})
export type DayState = v.InferOutput<typeof DayStateSchema>

const GameStateSchema = v.variant('screen', [
	MorningStateSchema,
	DayStateSchema,
])
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
	gameState = {
		...gameState,
		screen: GameScreen.Day,
		paper: {
			articles: [],
		},
	}
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

export function getInitialGameStateFromURL(url: URL): GameState {
	const rawParamValue = getInitialStateURLParamValue(url)
	const decodedParamValue = atob(rawParamValue)
	const parsedParamValue = JSON.parse(decodedParamValue)
	return v.parse(GameStateSchema, parsedParamValue)
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
