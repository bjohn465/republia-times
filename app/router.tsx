import { createHashRouter } from 'react-router-dom'
import ErrorPage from './error-page.tsx'
import Root from './routes/root.tsx'

export const router = createHashRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
	},
])
