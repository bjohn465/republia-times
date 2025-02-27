import { type LoaderFunctionArgs } from 'react-router'
import { assertURLIsCorrectForGameState } from '#app/state/url-utils.ts'

export function loader({ request }: LoaderFunctionArgs) {
	assertURLIsCorrectForGameState(new URL(request.url))
	return null
}
