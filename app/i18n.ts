import { i18n, type Messages } from '@lingui/core'
import { detect, fromHtmlTag } from '@lingui/detect-locale'

export function detectLocale() {
	return detect(fromHtmlTag('lang')) ?? defaultLocaleDetector()
}

function defaultLocaleDetector() {
	console.warn('Using fallback locale detector')
	return 'en'
}

export async function dynamicActivate(locale: string) {
	const { messages } = (await import(`./locales/${locale}.po`)) as {
		messages: Messages
	}

	i18n.load(locale, messages)
	i18n.activate(locale)
}
