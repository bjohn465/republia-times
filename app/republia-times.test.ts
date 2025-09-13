import { page } from '@vitest/browser/context'
import { expect, test } from 'vitest'
import './republia-times.ts'

test('renders morning state', () => {
	const element = document.createElement('republia-times')
	document.body.replaceChildren(element)
	expect(page.getByText('Day 1')).toBeVisible()
})
