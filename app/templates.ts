export function createTemplate(content: string) {
	const template = document.createElement('template')
	template.innerHTML = content.trim()
	return template
}

export function getElementById(root: ShadowRoot, id: string) {
	const element = root.getElementById(id)
	if (!element) {
		throw new Error(`Element with id "${id}" not found`)
	}
	return element
}

export function html(strings: TemplateStringsArray, ...values: unknown[]) {
	return String.raw({ raw: strings }, ...values)
}
