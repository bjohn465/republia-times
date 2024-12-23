import { createHashRouter } from 'react-router'
import ErrorPage from './error-page.tsx'
import Day from './routes/day.component.tsx'
import Morning from './routes/morning.component.tsx'
import { action as morningAction } from './routes/morning.data.ts'
import Root from './routes/root.component.tsx'
import { loader as rootLoader } from './routes/root.data.ts'

export const router = createHashRouter([
	{
		path: '/',
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
			},
		],
	},
])
