import { invariantResponse } from '@epic-web/invariant'
import { replace, type ActionFunctionArgs } from 'react-router'
import Intents from '#app/intents.ts'

export async function action({ request }: ActionFunctionArgs) {
	const data = await request.formData()
	const intent = data.get('intent')
	invariantResponse(intent === Intents.StartWork, 'Invalid intent', {
		statusText: 'Bad Request',
	})
	throw replace('/day')
}
