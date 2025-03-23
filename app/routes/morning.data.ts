import { replace, type ActionFunctionArgs } from 'react-router'
import { Intents } from '#app/intents.ts'
import { invariantResponse } from '#app/invariant.ts'
import { getExpectedGameState, updateGameState } from '#app/state/game-state.ts'
import { MorningState } from '#app/state/morning-state.ts'

export async function action({ request }: ActionFunctionArgs) {
	const gameState = getExpectedGameState(
		MorningState,
		'Invalid game state for "morning" action',
	)
	const data = await request.formData()
	const intent = data.get('intent')
	invariantResponse(intent === Intents.StartWork, 'Invalid intent', {
		statusText: 'Bad Request',
	})
	throw replace(updateGameState(gameState.startWork()).url)
}
