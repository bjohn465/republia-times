import { expect, test } from '@playwright/test'
import { gameStateToURLSearchParams, getDayStateInput } from '#tests/utils.ts'

test('Game start', async ({ baseURL, browser }) => {
	const browserContext = await browser.newContext()
	const page = await browserContext.newPage()
	await page.goto('/')
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(
		'The Republia Times',
	)
	await expect(page.getByRole('heading', { level: 2 })).toHaveText('Day 1')
	const startWorkButton = page.getByRole('button', { name: 'Start work' })
	await expect(startWorkButton).toBeVisible()
	// Give the browser enough time to display the "Starting work" button
	// and playwright enough time to find it.
	await browserContext.addCookies([
		{ name: 'simulatedRTT', value: '10', url: baseURL },
	])
	await startWorkButton.click()
	const startingWorkButton = page.getByRole('button', {
		name: 'Starting work…',
	})
	await expect(startingWorkButton).toBeVisible()
	await expect(startingWorkButton).toBeDisabled()
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

test('Add to Paper', async ({ page }) => {
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

	await newsFeedListItems
		.filter({ hasText: /Tennis star/i })
		.getByRole('button', { name: 'Add to paper' })
		.click()

	await expect(newsFeedListItems).toHaveCount(1)
	await expect(paperListItems).toHaveCount(1)
	await expect(paperListItems.filter({ hasText: /Tennis star/i })).toBeVisible()
})
