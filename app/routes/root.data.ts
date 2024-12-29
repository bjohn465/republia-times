import { type LoaderFunctionArgs, replace } from 'react-router'
import {
	getURLPathFromGameState,
	initializeGameStateFromURL,
} from '#app/game-state.ts'

export function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url)
	if (url.pathname === '/') {
		// This should use the URL from `request.url`,
		// but for some reason that does not include search params.
		initializeGameStateFromURL(new URL(document.location.href))
		throw replace(getURLPathFromGameState())
	}
	return null
}
