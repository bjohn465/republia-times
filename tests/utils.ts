import { type DeepPartial } from 'utility-types'
import { GameScreen } from '#app/state/game-screen.ts'
import { type DayStateInput, type MorningState } from '#app/state/game-state.ts'

export function getMorningStateInput(
	overrides?: DeepPartial<{ screen: string }>,
) {
	const defaults = {
		screen: GameScreen.Morning,
	}
	return { ...defaults, ...overrides }
}

export function getDayStateInput(
	overrides?: DeepPartial<{
		newsItems: Array<string>
		screen: string
		paper: { articles: Array<{ newsItem: string }> }
	}>,
) {
	const defaults = {
		newsItems: ['bBQb', '9MrF'],
		screen: GameScreen.Day,
		paper: { articles: [] },
	}
	return { ...defaults, ...overrides }
}

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

export function gameStateToURLSearchParams(state: unknown): URLSearchParams {
	return new URLSearchParams([
		['initialState', encodeGameStateURLParamValue(JSON.stringify(state))],
	])
}
