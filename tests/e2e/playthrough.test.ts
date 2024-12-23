import { expect, test } from '@playwright/test'

test('Initial load', async ({ page }) => {
	const jsDelay = (() => {
		let resolve: () => void
		const promise = new Promise<void>((res) => {
			resolve = res
		})
		return {
			start(timeInMs: number) {
				setTimeout(() => resolve(), timeInMs)
				return promise
			},
			promise,
		}
	})()

	await page.route(
		/.*\.(?:j|t)sx?$/,
		async (route) => {
			await jsDelay.start(50)
			await route.continue()
		},
		{ times: 1 },
	)

	await page.goto('/', { waitUntil: 'commit' })
	await expect(page.getByText('Loading...')).toBeVisible()
	await expect(
		page.getByText('There was a problem loading the game.'),
	).not.toBeVisible()
	await jsDelay.promise
	await expect(page.getByText('Loading...')).not.toBeVisible()
})

test('Error loading locale', async ({ page }) => {
	// This is the locale in the dev environment
	await page.route(/\/locales\/en\.po/, (route) => route.abort('failed'))
	// And this is the locale in the production environment
	await page.route(/en-[A-Za-z0-9]+?\.js$/, (route) => route.abort('failed'))
	await page.goto('/')
	await expect(page.getByText('Loading...')).not.toBeVisible()
	await expect(
		page.getByText('There was a problem loading the game.'),
	).toBeVisible()
})

test('Game start', async ({ page }) => {
	await page.goto('/')
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(
		'The Republia Times',
	)
})
