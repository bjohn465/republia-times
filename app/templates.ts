export function createTemplate(content: string) {
	const template = document.createElement('template')
	template.innerHTML = content.trim()
	return template
}

export function html(strings: TemplateStringsArray, ...values: unknown[]) {
	return String.raw({ raw: strings }, ...values)
}
