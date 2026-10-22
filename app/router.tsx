import { createRouter, type RouterContext } from 'remix/router'
import { render } from 'remix/spa'

import rootController from './actions/controller.tsx'
import morningController from './actions/morning/controller.tsx'
import workController from './actions/work/controller.tsx'
import { NotFoundPage } from './actions/pages.tsx'
import { routes } from './routes.ts'

export const router = createRouter({
	middleware: [render()],
	defaultHandler({ render }) {
		return render(<NotFoundPage />, { status: 404 })
	},
})

export type AppContext = RouterContext<typeof router>

declare module 'remix' {
	interface RouterTypes {
		context: AppContext
	}
}

router.map(routes, rootController)
router.map(routes.morning, morningController)
router.map(routes.work, workController)
