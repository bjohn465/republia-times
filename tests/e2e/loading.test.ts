import { expect, test } from '@playwright/test'

const loadingText = 'Loading…'

test.beforeEach(async ({ page }) => {
	// Fail any requests to CSS files
	// to ensure that all loading-related styling
	// is inlined in the HTML
	// and not dependent on any external stylesheets.
	await page.route(/.*\.css$/, (route) => route.abort('failed'))
})

test.describe('With JavaScript disabled', () => {
	test.use({ javaScriptEnabled: false })

	test('Display message about enabling JavaScript', async ({ page }) => {
		await page.goto('/')
		await expect(page.getByText(loadingText)).not.toBeVisible()

		// Playwright can not find the text
		// within the `noscript` element
		// (see https://github.com/microsoft/playwright/issues/32542).
		// So, for now,
		// get the element by test ID
		// and check the `textContent` property.
		const noscript = page.getByTestId('noscript')
		await expect(noscript).toBeVisible()
		await expect(noscript).toHaveJSProperty(
			'textContent',
			'Enable JavaScript to play this game.',
		)
	})
})

test('Initial load', async ({ page }) => {
	const { promise: jsLoadPromise, resolve: resolveJsLoad } =
		Promise.withResolvers<void>()

	await page.route(
		/.*\.(?:j|t)sx?$/,
		async (route) => {
			await jsLoadPromise
			return route.continue()
		},
		{ times: 1 },
	)

	await page.goto('/', { waitUntil: 'commit' })
	await expect(page.getByText(loadingText)).toBeVisible()
	await expect(page.getByTestId('noscript')).not.toBeVisible()
	await expect(
		page.getByText('Enable JavaScript to play this game.'),
	).not.toBeVisible()
	await expect(
		page.getByText('There was a problem loading the game.'),
	).not.toBeVisible()
	resolveJsLoad()
	await expect(page.getByText(loadingText)).not.toBeVisible()
	await expect(
		page.getByText('There was a problem loading the game.'),
	).not.toBeVisible()
})

test('Error loading locale', async ({ page }) => {
	// This is the locale in the dev environment
	await page.route(/\/locales\/en\.po/, (route) => route.abort('failed'))
	// And this is the locale in the production environment
	await page.route(/en-[A-Za-z0-9]+?\.js$/, (route) => route.abort('failed'))
	await page.goto('/')
	await expect(page.getByText(loadingText)).not.toBeVisible()
	await expect(
		page.getByText('There was a problem loading the game.'),
	).toBeVisible()
})
