import { test as testBase } from 'vitest'

interface Fixtures {
	renderElement: (element: Element) => void
}

export const test = testBase.extend<Fixtures>({
	async renderElement({}, use) {
		let cleanupElement = () => {}
		await use((element) => {
			document.body.appendChild(element)
			cleanupElement = () => {
				element.remove()
			}
		})
		cleanupElement()
	},
})
