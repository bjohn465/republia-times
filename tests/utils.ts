import { GameScreen } from '#app/game-screen'
import {
	type DayState,
	type GameState,
	type MorningState,
} from '#app/game-state'

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

export function getDayGameState(overrides?: Partial<DayState>) {
	const defaults: DayState = {
		screen: GameScreen.Day,
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

export function gameStateToURLSearchParams(state: GameState): URLSearchParams {
	return new URLSearchParams([
		['initialState', encodeGameStateURLParamValue(JSON.stringify(state))],
	])
}
