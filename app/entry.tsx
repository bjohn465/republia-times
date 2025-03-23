import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { invariant } from '#app/invariant.ts'
import { detectLocale, dynamicActivate } from './i18n.ts'
import { getRouter } from './router.ts'

async function entry() {
	function addErrorClass() {
		document.documentElement.classList.add('initializationError')
	}
	const root = document.getElementById('root')
	try {
		invariant(root, 'The root element is missing')
	} catch (exception) {
		addErrorClass()
		throw exception
	}
	const locale = detectLocale()
	try {
		await dynamicActivate(locale)
	} catch (ex) {
		addErrorClass()
		throw new Error(`There was a problem loading the locale "${locale}"`, {
			cause: ex,
		})
	}
	createRoot(root).render(
		<StrictMode>
			<RouterProvider router={getRouter()} />
		</StrictMode>,
	)
}

void entry()
