import { page } from 'vitest/browser'
import { test } from '../test-utils/extended-test.ts'
import './republia-times.ts'

test('renders morning state', ({ expect, renderElement }) => {
	renderElement(document.createElement('republia-times'))
	expect(page.getByText('Day 1')).toBeVisible()
})
