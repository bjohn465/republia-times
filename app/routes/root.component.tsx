import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { Outlet } from 'react-router'

export default function Root() {
	return (
		<I18nProvider i18n={i18n}>
			<Outlet />
		</I18nProvider>
	)
}
