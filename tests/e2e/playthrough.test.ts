import { expect, test } from '@playwright/test'
import { gameStateToURLSearchParams, getDayStateInput } from '#tests/utils.ts'

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
		`/?${gameStateToURLSearchParams(getDayStateInput()).toString()}`,
	)
	await expect(page.getByRole('heading', { level: 1 })).toHaveText('Day 1')
	await expect(page.getByRole('heading', { level: 2 })).toHaveText('News Feed')
})

test('News feed', async ({ page }) => {
	await page.goto(
		`/?${gameStateToURLSearchParams(getDayStateInput()).toString()}`,
	)
	const newsFeedList = page.getByRole('list', { name: 'News Feed' })
	await expect(newsFeedList).toBeVisible()
	await expect(newsFeedList.getByRole('listitem')).toHaveCount(2)
})
