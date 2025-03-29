import * as v from 'valibot'

export const Intents = Object.freeze({
	AddToPaper: 'AddToPaper',
	StartWork: 'StartWork',
})
type Intent = (typeof Intents)[keyof typeof Intents]

export function intentSchema<TIntent extends Intent>(intent: TIntent) {
	return v.literal(intent, 'Invalid intent')
}
