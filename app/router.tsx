import { createHashRouter } from 'react-router'
import ErrorPage from './error-page.tsx'
import Root from './routes/root.component.tsx'
import { loader as rootLoader } from './routes/root.data.ts'

export const router = createHashRouter([
	{
		path: '/',
		Component: Root,
		ErrorBoundary: ErrorPage,
		loader: rootLoader,
	},
])
