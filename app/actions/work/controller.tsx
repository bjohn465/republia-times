import { createController } from 'remix/router'

import { routes } from '../../routes.ts'
import { WorkPage } from './show-page.tsx'

export default createController(routes.work, {
	actions: {
		show({ render }) {
			return render(<WorkPage />)
		},
	},
})
