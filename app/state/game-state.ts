import { invariant } from '@epic-web/invariant'
import * as v from 'valibot'
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

export function initializeGameState(initialState?: unknown): GameState {
	const parseResult = v.safeParse(GameStateSchema, initialState)
	if (parseResult.success) {
		gameState = parseResult.output
	} else {
		console.warn('Unable to initialize game state: ', parseResult.issues)
	}
	return getGameState()
}

export const gameStateURLParam = 'initialState'

export function initializeGameStateFromURL(url: URL): GameState {
	const rawParamValue = url.searchParams.get(gameStateURLParam)
	if (!rawParamValue) {
		return getGameState()
	}
	try {
		const decodedParamValue = atob(rawParamValue)
		const parsedParamValue = JSON.parse(decodedParamValue)
		return initializeGameState(parsedParamValue)
	} catch (ex) {
		console.warn('Unable to initialize game state from URL: ', ex)
		return getGameState()
	}
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
			return assertUnreachable(gameState)
		}
	}
}

/* c8 ignore next 3 */
function assertUnreachable(_value: never): never {
	throw new Error('Unreachable code reached')
}
