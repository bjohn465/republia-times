import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { detectLocale, dynamicActivate } from './i18n.ts'
import { router } from './router.tsx'

async function entry() {
	const root = document.getElementById('root')
	if (!root) {
		throw new Error('The root element is missing')
	}
	const locale = detectLocale()
	try {
		await dynamicActivate(locale)
	} catch (ex) {
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
