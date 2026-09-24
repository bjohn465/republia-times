import { createController } from 'remix/router'

import { routes } from '../routes.ts'
import { HomePage } from './pages.tsx'

export default createController(routes, {
	actions: {
		async home({ render }) {
			return render(<HomePage />)
		},
	},
})
