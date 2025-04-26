import * as v from 'valibot'

export const Intents = Object.freeze({
	AddToPaperAsSmallArticle: 'AddToPaperAsSmallArticle',
	AddToPaperAsMediumArticle: 'AddToPaperAsMediumArticle',
	AddToPaperAsLargeArticle: 'AddToPaperAsLargeArticle',
	RemoveFromPaper: 'RemoveFromPaper',
	StartWork: 'StartWork',
})
export type Intent = (typeof Intents)[keyof typeof Intents]

export function intentSchema<TIntent extends Intent>(intent: TIntent) {
	return v.literal(intent, 'Invalid intent')
}
