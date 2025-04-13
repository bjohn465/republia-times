import { expect, test } from '@playwright/test'
import { gameStateToURLSearchParams, getDayStateInput } from '#tests/utils.ts'

test('Game start', async ({ baseURL, browser }) => {
	const browserContext = await browser.newContext()
	const page = await browserContext.newPage()
	await page.clock.install({ time: new Date('2025-03-24T10:00:00Z') })
	await page.goto('/')
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(
		'The Republia Times',
	)
	await expect(page.getByRole('heading', { level: 2 })).toHaveText('Day 1')
	const startWorkButton = page.getByRole('button', { name: 'Start work' })
	await expect(startWorkButton).toBeVisible()
	// Ensure the simulated RTT value is a positive number
	// so a setTimeout will happen
	// (that we can delay while checking the pending state).
	await browserContext.addCookies([
		{ name: 'simulatedRTT', value: '100', url: baseURL },
	])
	await page.clock.pauseAt(new Date('2025-03-24T10:01:00Z'))
	await startWorkButton.click()
	const startingWorkButton = page.getByRole('button', {
		name: 'Starting work…',
	})
	await expect(startingWorkButton).toBeVisible()
	await expect(startingWorkButton).toBeDisabled()
	// Now that we've checked the pending state,
	// resume the timers as normal.
	await page.clock.resume()
	await expect(page.getByRole('heading', { level: 1 })).not.toHaveText(
		'The Republia Times',
	)
	await expect(startWorkButton).not.toBeVisible()
})

test('Work day', async ({ page }) => {
	await page.goto(
		`/?${gameStateToURLSearchParams(getDayStateInput()).toString()}`,
	)
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Day 1')
	await expect(
		page.getByRole('heading', { level: 2, name: 'News Feed' }),
	).toBeVisible()
	await expect(
		page.getByRole('heading', { level: 2, name: 'The Republia Times' }),
	).toBeVisible()
})

test('Add to Paper', async ({ baseURL, browser }) => {
	const browserContext = await browser.newContext()
	const page = await browserContext.newPage()
	await page.clock.install({ time: new Date('2025-03-30T10:00:00Z') })
	await page.goto(
		`/?${gameStateToURLSearchParams(getDayStateInput()).toString()}`,
	)
	const newsFeedList = page.getByRole('list', { name: 'News Feed' })
	await expect(newsFeedList).toBeVisible()
	const newsFeedListItems = newsFeedList.getByRole('listitem')
	await expect(newsFeedListItems).toHaveCount(2)

	const paperList = page.getByRole('list', { name: 'The Republia Times' })
	await expect(paperList).toBeAttached()
	const paperListItems = paperList.getByRole('listitem')
	await expect(paperListItems).toHaveCount(0)

	await browserContext.addCookies([
		{ name: 'simulatedRTT', value: '100', url: baseURL },
	])
	await page.clock.pauseAt(new Date('2025-03-30T10:01:00Z'))
	await newsFeedListItems
		.filter({ hasText: /Tennis star/i })
		.getByRole('button', { name: 'Add to paper' })
		.click()

	await expect(paperList).toBeVisible()
	await expect(newsFeedListItems).toHaveCount(1)
	await expect(paperListItems).toHaveCount(1)
	const paperItem = paperListItems.filter({ hasText: /Tennis star/i })
	await expect(paperItem).toBeVisible()
	await expect(paperItem).toContainText('(Pending)')

	await page.clock.resume()

	await expect(paperItem).not.toContainText('(Pending)')
})

test('Remove from paper', async ({ page }) => {
	await page.goto(
		`/?${gameStateToURLSearchParams(
			getDayStateInput({
				newsItems: ['bBQb', '9MrF'],
				paper: { articles: [{ newsItem: 'bBQb' }] },
			}),
		).toString()}`,
	)
	const paperList = page.getByRole('list', { name: 'The Republia Times' })
	await expect(paperList).toBeVisible()
	const paperListItems = paperList.getByRole('listitem')
	await expect(paperListItems).toHaveCount(1)

	const newsFeedList = page.getByRole('list', { name: 'News Feed' })
	await expect(newsFeedList).toBeVisible()
	const newsFeedListItems = newsFeedList.getByRole('listitem')
	await expect(newsFeedListItems).toHaveCount(1)

	await paperListItems
		.filter({ hasText: /Tennis Star/i })
		.getByRole('button', { name: 'Remove from paper' })
		.click()
	await expect(paperListItems).toHaveCount(0)
	await expect(newsFeedListItems).toHaveCount(2)
})
