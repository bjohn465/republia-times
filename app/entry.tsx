import { invariant } from '@epic-web/invariant'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { detectLocale, dynamicActivate } from './i18n.ts'
import { router } from './router.ts'

async function entry() {
	function addErrorClass() {
		document.documentElement.classList.add('initializationError')
	}
	const root = document.getElementById('root')
	invariant(root, () => {
		addErrorClass()
		return 'The root element is missing'
	})
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
			<RouterProvider router={router} />
		</StrictMode>,
	)
}

void entry()
