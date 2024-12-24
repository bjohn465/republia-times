import { type LoaderFunctionArgs, replace } from 'react-router'

export function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url)
	if (url.pathname === '/') {
		throw replace('/morning')
	}
	return null
}
