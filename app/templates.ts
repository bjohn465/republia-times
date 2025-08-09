import { invariant } from './invariant.ts'

const templateContentCache = new Map<string, DocumentFragment>()

export function getTemplate(id: string) {
	let content = templateContentCache.get(id)
	if (!content) {
		const templateElement = document.getElementById(id)
		invariant(
			templateElement instanceof HTMLTemplateElement,
			`Unable to find template with ID ${id}`,
		)
		content = templateElement.content
		templateContentCache.set(id, content)
	}

	const clonedContent = content.cloneNode(true)
	invariant(
		clonedContent instanceof DocumentFragment,
		`Unable to clone template with ID ${id}`,
	)
	return clonedContent
}
