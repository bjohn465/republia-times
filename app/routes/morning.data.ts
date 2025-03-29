import { replace, type ActionFunctionArgs } from 'react-router'
import * as v from 'valibot'
import { parseFormData } from '#app/form-data.ts'
import { Intents, intentSchema } from '#app/intents.ts'
import { getExpectedGameState, updateGameState } from '#app/state/game-state.ts'
import { MorningState } from '#app/state/morning-state.ts'
import { UnsupportedValueError } from '#app/unsupported-value-error.ts'

export async function action({ request }: ActionFunctionArgs) {
	const gameState = getExpectedGameState(
		MorningState,
		'Invalid game state for "morning" action',
	)
	const data = parseFormData(
		MorningActionFormDataSchema,
		await request.formData(),
	)
	switch (data.intent) {
		case Intents.StartWork:
			throw replace(updateGameState(gameState.startWork()).url)
		default:
			throw new UnsupportedValueError(data.intent)
	}
}

const MorningActionFormDataSchema = v.object({
	intent: intentSchema(Intents.StartWork),
})
