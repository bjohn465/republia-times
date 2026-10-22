import { createController } from 'remix/router'

import { routes } from '../../routes.ts'
import { MorningPage } from './show-page.tsx'

export default createController(routes.morning, {
	actions: {
		show({ render }) {
			return render(<MorningPage />)
		},
	},
})
