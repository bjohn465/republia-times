import { invariantResponse } from '@epic-web/invariant'
import { replace, type ActionFunctionArgs } from 'react-router'
import { Intents } from '#app/intents.ts'
import { GameScreen } from '#app/state/game-screen.ts'
import { getGameState, updateGameState } from '#app/state/game-state.ts'

export async function action({ request }: ActionFunctionArgs) {
	const gameState = getGameState()
	invariantResponse(
		gameState.screen === GameScreen.Morning,
		'Invalid game state for "morning" action',
		{ statusText: 'Bad Request' },
	)
	const data = await request.formData()
	const intent = data.get('intent')
	invariantResponse(intent === Intents.StartWork, 'Invalid intent', {
		statusText: 'Bad Request',
	})
	throw replace(updateGameState(gameState.startWork()).url)
}
