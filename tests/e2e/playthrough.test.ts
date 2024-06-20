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

	page.route(
		/.*\.(?:j|t)sx?$/,
		async (route) => {
			await jsDelay.start(50)
			await route.continue()
		},
		{ times: 1 },
	)

	await page.goto('/', { waitUntil: 'commit' })
	await expect(page.getByText('Loading...')).toBeVisible()
	await jsDelay.promise
	await expect(page.getByText('Loading...')).not.toBeVisible()
})

test('Game start', async ({ page }) => {
	await page.goto('/')
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(
		'The Republia Times',
	)
})
