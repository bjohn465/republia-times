import { replace, type ActionFunctionArgs } from 'react-router'
import Intents from '#app/intents.ts'

export async function action({ request }: ActionFunctionArgs) {
	const data = await request.formData()
	const intent = String(data.get('intent'))
	if (intent === Intents.StartWork) {
		throw replace('/day')
	}
	throw new Response('Invalid intent', {
		status: 400,
		statusText: 'Bad Request',
	})
}
