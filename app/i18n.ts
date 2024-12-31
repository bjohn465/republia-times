import { i18n } from '@lingui/core'
import { detect, fromHtmlTag } from '@lingui/detect-locale'
import { type CompiledMessageToken } from '@lingui/message-utils/compileMessage'
import * as v from 'valibot'

export function detectLocale() {
	return detect(fromHtmlTag('lang')) ?? defaultLocaleDetector()
}

function defaultLocaleDetector() {
	console.warn('Using fallback locale detector')
	return 'en'
}

export async function dynamicActivate(locale: string) {
	const importResult = await import(`./locales/${locale}.po`)
	const { messages } = v.parse(ImportedMessagesSchema, importResult)
	i18n.load(locale, messages)
	i18n.activate(locale)
}

// Based on the types from:
// https://github.com/lingui/js-lingui/blob/v5.1.2/packages/message-utils/src/compileMessage.ts#L3-L11
const CompiledMessageTokenSchema: v.GenericSchema<CompiledMessageToken> =
	v.union([
		v.string(),
		v.tuple([
			// name
			v.string(),
			// type
			v.optional(v.string()),
			// format
			v.optional(
				v.union([v.null(), v.string(), v.lazy(() => CompiledIcuChoicesSchema)]),
			),
		]),
	])
const CompiledMessageSchema = v.array(CompiledMessageTokenSchema)
const CompiledIcuChoicesSchema = v.intersect([
	v.record(v.string(), CompiledMessageSchema),
	v.object({ offset: v.union([v.number(), v.undefined()]) }),
])

// Based on the types from:
// https://github.com/lingui/js-lingui/blob/v5.1.2/packages/core/src/i18n.ts#L39-L40
const UncompiledMessageSchema = v.string()
const MessagesSchema = v.record(
	v.string(),
	v.union([UncompiledMessageSchema, CompiledMessageSchema]),
)

const ImportedMessagesSchema = v.object({
	messages: MessagesSchema,
})
