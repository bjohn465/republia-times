import { type LoaderFunctionArgs, redirect } from 'react-router'

export function loader({ request }: LoaderFunctionArgs) {
	const url = new URL(request.url)
	if (url.pathname === '/') {
		throw redirect('/morning')
	}
	return null
}
