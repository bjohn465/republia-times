import { type LoaderFunctionArgs, replace } from 'react-router'
import {
	gameStateURLParam,
	getURLPathFromGameState,
	getInitialGameStateFromURL,
	getInitialStateURLParamValue,
	initializeGameState,
} from '#app/state/game-state.ts'

export function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url)
	if (url.pathname !== getURLPathFromGameState()) {
		let forwardedParams = new URLSearchParams()
		if (url.searchParams.has(gameStateURLParam)) {
			try {
				initializeGameState(getInitialGameStateFromURL(url))
				forwardedParams.set(
					gameStateURLParam,
					getInitialStateURLParamValue(url),
				)
			} catch {
				// The URL did not have a valid initial state; silently ignore it.
			}
		}
		const forwardedParamsString =
			forwardedParams.size > 0 ? `?${forwardedParams.toString()}` : ''
		throw replace(getURLPathFromGameState().concat(forwardedParamsString))
	}
	return null
}
