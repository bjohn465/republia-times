import { routes } from '../routes.ts'
import { Layout } from '../ui/app-shell.tsx'
import { MorningPage } from './morning/show-page.tsx'

export function HomePage() {
	return () => <MorningPage />
}

export function NotFoundPage() {
	return () => (
		<Layout>
			<p>404</p>
			<h1>Page not found</h1>
			<p>
				Try going back to the <a href={routes.home.href()}>home page</a>.
			</p>
		</Layout>
	)
}
