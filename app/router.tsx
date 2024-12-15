import { createHashRouter } from 'react-router'
import ErrorPage from './error-page.tsx'
import Root from './routes/root.tsx'

export const router = createHashRouter([
	{
		path: '/',
		Component: Root,
		ErrorBoundary: ErrorPage,
	},
])
