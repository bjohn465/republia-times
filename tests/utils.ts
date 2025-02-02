import { GameScreen } from '#app/state/game-screen.ts'
import {
	type GameStateInput,
	type DayStateInput,
	type MorningState,
} from '#app/state/game-state.ts'

export function getMorningGameState(overrides?: Partial<MorningState>) {
	const defaults: MorningState = {
		screen: GameScreen.Morning,
		v: 1,
	}
	return {
		...defaults,
		...overrides,
	}
}

export function getDayGameStateInput(overrides?: Partial<DayStateInput>) {
	const defaults: DayStateInput = {
		newsItems: ['bBQb', '9MrF'],
		screen: GameScreen.Day,
		paper: {
			articles: [],
		},
		v: 1,
	}
	return {
		...defaults,
		...overrides,
	}
}

export function encodeGameStateURLParamValue(value: string): string {
	return btoa(value)
}

export function gameStateToURLSearchParams(
	state: GameStateInput,
): URLSearchParams {
	return new URLSearchParams([
		['initialState', encodeGameStateURLParamValue(JSON.stringify(state))],
	])
}
