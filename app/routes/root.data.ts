import { type LoaderFunctionArgs, replace } from 'react-router'
import {
	getURLPathFromGameState,
	initializeGameStateFromURL,
} from '#app/state/game-state.ts'

export function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url)
	if (url.pathname === '/') {
		initializeGameStateFromURL(url)
		throw replace(getURLPathFromGameState())
	}
	return null
}
