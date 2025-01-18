import { invariantResponse } from '@epic-web/invariant'
import { replace, type ActionFunctionArgs } from 'react-router'
import { getURLPathFromGameState, startWork } from '#app/state/game-state.ts'

export enum Intents {
	StartWork = 'StartWork',
}

export async function action({ request }: ActionFunctionArgs) {
	const data = await request.formData()
	const intent = data.get('intent')
	invariantResponse(intent === Intents.StartWork, 'Invalid intent', {
		statusText: 'Bad Request',
	})
	startWork()
	throw replace(getURLPathFromGameState())
}
