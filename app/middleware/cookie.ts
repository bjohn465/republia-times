import { parse as cookieParse } from 'cookie'
import {
	unstable_createContext as createContext,
	type unstable_MiddlewareFunction as MiddlewareFunction,
} from 'react-router'

export const cookieContext = createContext<ReturnType<typeof cookieParse>>()

export const cookieMiddleware: MiddlewareFunction = ({ context, request }) => {
	context.set(cookieContext, {
		...cookieParse(typeof document === 'undefined' ? '' : document.cookie),
		...cookieParse(request.headers.get('cookie') ?? ''),
	})
}
