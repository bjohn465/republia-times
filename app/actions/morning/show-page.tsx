import { routes } from '../../routes.ts'
import { Layout } from '../../ui/app-shell.tsx'

export function MorningPage() {
	return () => (
		<Layout>
			<header>
				<h1>The Republia Times</h1>
				<h2>Day 1</h2>
			</header>
			<main>
				<p>Welcome to The Republia Times. You are the new editor-in-chief.</p>
				<p>
					The war with Antegria is over and the rebellion uprising has been
					crushed. Order is slowly returning to Republia.
				</p>
				<p>The public is not loyal to the government.</p>
				<p>
					It is your job to increase their loyalty by editing The Republia Times
					carefully. Pick only stories that highlight the good things about
					Republia and its government.
				</p>
				<p>You have 3 days to raise the public's loyalty to 20.</p>
				<p>
					As a precaution against influence, we are keeping your wife and child
					in a safe location.
				</p>

				<form
					action={routes.morning.startWork.href()}
					data-rmx-history="replace"
					method={routes.morning.startWork.method}
				>
					<button type="submit">Start Work</button>
				</form>
			</main>
			<footer>
				<p>
					by <a href="https://dukope.com/">Lucas Pope</a>
				</p>
				<p>
					ported by <a href="https://github.com/bjohn465">Brandon Johnson</a>
				</p>
			</footer>
		</Layout>
	)
}
