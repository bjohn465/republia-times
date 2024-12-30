import { Trans } from '@lingui/react/macro'
import { Form } from 'react-router'
import { Intents } from './morning.data'

export default function Morning() {
	return (
		<>
			<header>
				<h1>
					<Trans>The Republia Times</Trans>
				</h1>
				<h2>
					<Trans>Day 1</Trans>
				</h2>
			</header>
			<main>
				<p>
					<Trans>Welcome to The Republia Times.</Trans>{' '}
					<Trans>You are the new editor-in-chief.</Trans>
				</p>
				<p>
					<Trans>
						The war with Antegria is over and the rebellion uprising has been
						crushed.
					</Trans>{' '}
					<Trans>Order is slowly returning to Republia.</Trans>
				</p>
				<p>
					<Trans>The public is not loyal to the government.</Trans>
				</p>
				<p>
					<Trans>
						It is your job to increase their loyalty by editing The Republia
						Times carefully.
					</Trans>{' '}
					<Trans>
						Pick only stories that highlight the good things about Republia and
						its government.
					</Trans>
				</p>
				<p>
					<Trans>You have 3 days to raise the public's loyalty to 20.</Trans>
				</p>
				<p>
					<Trans>
						As a precaution against influence, we are keeping your wife and
						child in a safe location.
					</Trans>
				</p>
				<Form action="/morning" method="post">
					<button type="submit" name="intent" value={Intents.StartWork}>
						<Trans>Start work</Trans>
					</button>
				</Form>
			</main>
			<footer>
				<p>
					<Trans>
						by <a href="https://dukope.com/">Lucas Pope</a>
					</Trans>
				</p>
				<p>
					<Trans>
						ported by <a href="https://github.com/bjohn465">Brandon Johnson</a>
					</Trans>
				</p>
			</footer>
		</>
	)
}
