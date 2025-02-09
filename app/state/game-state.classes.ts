import * as v from 'valibot'
import { UnsupportedValueError } from '#app/unsupported-value-error.ts'
import { BaseGameStateSchema } from './base-game-state.ts'
import { DayState } from './day-state.ts'
import { GameScreen } from './game-screen.ts'
import { MorningState } from './morning-state.ts'

type GameState = MorningState | DayState

let currentState: GameState = new MorningState({
	screen: GameScreen.Morning,
})

export function getGameState(): GameState {
	return currentState
}

export function updateGameState(newState: GameState) {
	currentState = newState
	return getGameState()
}

export function initializeGameState(initialState: unknown) {
	const baseState = v.parse(BaseGameStateSchema, initialState)

	switch (baseState.screen) {
		case GameScreen.Morning: {
			updateGameState(MorningState.parse(initialState))
			break
		}
		case GameScreen.Day: {
			updateGameState(DayState.parse(initialState))
			break
		}
		default: {
			throw new UnsupportedValueError(baseState.screen)
		}
	}

	return getGameState()
}
