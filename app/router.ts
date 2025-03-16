import { createBrowserRouter } from 'react-router'
import ErrorPage from './error-page.tsx'
import { cookieMiddleware } from './middleware/cookie.ts'
import { simulatedRTTMiddleware } from './middleware/simulated-rtt.ts'
import Day from './routes/day.component.tsx'
import { loader as dayLoader } from './routes/day.data.ts'
import Morning from './routes/morning.component.tsx'
import { action as morningAction } from './routes/morning.data.ts'
import Root from './routes/root.component.tsx'
import { loader as rootLoader } from './routes/root.data.ts'

declare module 'react-router' {
	interface Future {
		unstable_middleware: true
	}
}

export function getRouter() {
	return createBrowserRouter(
		[
			{
				path: '/',
				unstable_middleware: [cookieMiddleware, simulatedRTTMiddleware],
				Component: Root,
				ErrorBoundary: ErrorPage,
				loader: rootLoader,
				children: [
					{
						path: 'morning',
						Component: Morning,
						action: morningAction,
					},
					{
						path: 'day',
						Component: Day,
						loader: dayLoader,
					},
				],
			},
		],
		{
			future: {
				unstable_middleware: true,
			},
		},
	)
}
