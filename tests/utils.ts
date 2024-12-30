import { GameScreen, type GameState } from '#app/game-state.ts'

export function gameStateFromPartial(
	partialGameState: Partial<GameState>,
): GameState {
	const defaults: GameState = {
		screen: GameScreen.Morning,
		v: 1,
	}
	return {
		...defaults,
		...partialGameState,
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
