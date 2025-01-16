import { expect, test } from '@playwright/test'
import { GameScreen } from '#app/game-screen'
import {
	gameStateFromPartial,
	gameStateToURLSearchParams,
} from '#tests/utils.ts'

// Playwright can not find the text
// within the `noscript` element
// (see https://github.com/microsoft/playwright/issues/32542).
// So, for now,
// get the element by test ID
// and check the `textContent` property.
test.describe('With JavaScript disabled', () => {
	test.use({ javaScriptEnabled: false })

	test('Display message about enabling JavaScript', async ({ page }) => {
		await page.goto('/')
		await expect(page.getByText('Loading...')).not.toBeVisible()
		const noscript = page.getByTestId('noscript')
		await expect(noscript).toBeVisible()
		await expect(noscript).toHaveJSProperty(
			'textContent',
			'Enable JavaScript to play this game.',
		)
	})
})

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
	await expect(page.getByTestId('noscript')).not.toBeVisible()
	await expect(
		page.getByText('Enable JavaScript to play this game.'),
	).not.toBeVisible()
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
	await expect(page.getByRole('heading', { level: 2 })).toHaveText('Day 1')
	const startWorkButton = page.getByRole('button', { name: 'Start work' })
	await expect(startWorkButton).toBeVisible()
	await startWorkButton.click()
	await expect(page.getByRole('heading', { level: 1 })).not.toHaveText(
		'The Republia Times',
	)
	await expect(startWorkButton).not.toBeVisible()
})

test('Work day', async ({ page }) => {
	await page.goto(
		`/?${gameStateToURLSearchParams(
			gameStateFromPartial({
				screen: GameScreen.Day,
			}),
		).toString()}`,
	)
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Day 1')
	await expect(page.getByRole('heading', { level: 2 })).toHaveText('News Feed')
})

test('News feed', async ({ page }) => {
	await page.goto(
		`/?${gameStateToURLSearchParams(
			gameStateFromPartial({
				screen: GameScreen.Day,
			}),
		).toString()}`,
	)
	const newsFeedList = page.getByRole('list', { name: 'News Feed' })
	await expect(newsFeedList).toBeVisible()
	await expect(newsFeedList.getByRole('listitem')).toHaveCount(2)
})
