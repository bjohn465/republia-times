import { page } from '@vitest/browser/context'
import { expect, test } from 'vitest'
import './morning-state.ts'

test('handles the day number correctly', () => {
	const element = document.createElement('morning-state')
	document.body.replaceChildren(element)
	const dayHeading = page.getByRole('heading', { level: 2 })

	expect(dayHeading).toHaveTextContent('Day 1')
	expect(element).not.toHaveAttribute('day')
	expect(element).toHaveProperty('day', 1)

	element.toggleAttribute('day', true)
	expect(dayHeading).toHaveTextContent('Day 1')
	expect(element).toHaveAttribute('day', '')
	expect(element).toHaveProperty('day', 1)

	element.day = 0
	expect(dayHeading).toHaveTextContent('Day 1')
	expect(element).toHaveAttribute('day', '0')
	expect(element).toHaveProperty('day', 1)

	element.day = '-1'
	expect(dayHeading).toHaveTextContent('Day 1')
	expect(element).toHaveAttribute('day', '-1')
	expect(element).toHaveProperty('day', 1)

	element.setAttribute('day', 'two')
	expect(dayHeading).toHaveTextContent('Day 1')
	expect(element).toHaveAttribute('day', 'two')
	expect(element).toHaveProperty('day', 1)

	element.day = 2
	expect(dayHeading).toHaveTextContent('Day 2')
	expect(element).toHaveAttribute('day', '2')
	expect(element).toHaveProperty('day', 2)

	element.day = '3'
	expect(dayHeading).toHaveTextContent('Day 3')
	expect(element).toHaveAttribute('day', '3')
	expect(element).toHaveProperty('day', 3)

	element.setAttribute('day', '3.14')
	expect(dayHeading).toHaveTextContent('Day 3')
	expect(element).toHaveAttribute('day', '3.14')
	expect(element).toHaveProperty('day', 3)
})

test('handles the government value correctly', () => {
	const element = document.createElement('morning-state')
	document.body.replaceChildren(element)
	const heading = page.getByRole('heading', { level: 1 })
	const logo = heading.getByRole('img')

	expect(logo).toHaveAttribute('src', '/assets/logo.png')
	expect(logo).toHaveAccessibleName('The Republia Times')
	expect(heading).toHaveAccessibleName('The Republia Times')
	expect(element).not.toHaveAttribute('government')
	expect(element).toHaveProperty('government', 'republia')

	element.government = 'democria'
	expect(logo).toHaveAttribute('src', '/assets/logo2.png')
	expect(logo).toHaveAccessibleName('The Democria Times')
	expect(heading).toHaveAccessibleName('The Democria Times')
	expect(element).toHaveAttribute('government', 'democria')
	expect(element).toHaveProperty('government', 'democria')

	element.government = 'republia'
	expect(logo).toHaveAttribute('src', '/assets/logo.png')
	expect(logo).toHaveAccessibleName('The Republia Times')
	expect(heading).toHaveAccessibleName('The Republia Times')
	expect(element).toHaveAttribute('government', 'republia')
	expect(element).toHaveProperty('government', 'republia')

	element.setAttribute('government', 'DEMOCRIA')
	expect(logo).toHaveAttribute('src', '/assets/logo2.png')
	expect(logo).toHaveAccessibleName('The Democria Times')
	expect(heading).toHaveAccessibleName('The Democria Times')
	expect(element).toHaveAttribute('government', 'DEMOCRIA')
	expect(element).toHaveProperty('government', 'democria')

	element.setAttribute('government', 'REPUBLIA')
	expect(logo).toHaveAttribute('src', '/assets/logo.png')
	expect(logo).toHaveAccessibleName('The Republia Times')
	expect(heading).toHaveAccessibleName('The Republia Times')
	expect(element).toHaveAttribute('government', 'REPUBLIA')
	expect(element).toHaveProperty('government', 'republia')

	element.government = 'invalid'
	expect(logo).toHaveAttribute('src', '/assets/logo.png')
	expect(logo).toHaveAccessibleName('The Republia Times')
	expect(heading).toHaveAccessibleName('The Republia Times')
	expect(element).toHaveAttribute('government', 'invalid')
	expect(element).toHaveProperty('government', 'republia')

	element.government = ''
	expect(logo).toHaveAttribute('src', '/assets/logo.png')
	expect(logo).toHaveAccessibleName('The Republia Times')
	expect(heading).toHaveAccessibleName('The Republia Times')
	expect(element).toHaveAttribute('government', '')
	expect(element).toHaveProperty('government', 'republia')
})
