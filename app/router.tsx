import { createHashRouter } from 'react-router-dom'
import ErrorPage from './error-page.tsx'
import Root from './routes/root.tsx'

export const router = createHashRouter(
	[
		{
			path: '/',
			element: <Root />,
			errorElement: <ErrorPage />,
		},
	],
	{
		future: {
			v7_fetcherPersist: true,
			v7_normalizeFormMethod: true,
			v7_partialHydration: true,
			v7_relativeSplatPath: true,
		},
	},
)
