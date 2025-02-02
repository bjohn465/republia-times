import { invariantResponse } from '@epic-web/invariant'
import { GameScreen } from '#app/state/game-screen.ts'
import { getGameState } from '#app/state/game-state.ts'

export function loader() {
	const gameState = getGameState()
	invariantResponse(
		gameState.screen === GameScreen.Day,
		'Invalid game state for "day" loader',
	)
	return {
		newsItems: gameState.newsItems,
	}
}
