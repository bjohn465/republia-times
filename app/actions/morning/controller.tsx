import { createController } from 'remix/router'
import { redirect } from 'remix/response/redirect'

import { routes } from '../../routes.ts'
import { MorningPage } from './show-page.tsx'

export default createController(routes.morning, {
	actions: {
		show({ render }) {
			return render(<MorningPage />)
		},
		startWork() {
			return redirect(routes.work.show.href(), { status: 303 })
		},
	},
})
