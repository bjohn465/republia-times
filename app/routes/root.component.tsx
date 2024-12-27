import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { lazy } from 'react'
import { Outlet } from 'react-router'

const DevTools =
	import.meta.env.MODE === 'development'
		? lazy(() => import('#app/dev-tools.tsx'))
		: () => null

export default function Root() {
	return (
		<I18nProvider i18n={i18n}>
			<Outlet />
			<DevTools />
		</I18nProvider>
	)
}
