import { createTemplate, getElementById, html } from './templates.ts'

const template = createTemplate(html`
	<header>
		<h1>The Republia Times</h1>
		<h2 id="day"></h2>
	</header>
`)

export class MorningState extends HTMLElement {
	static observedAttributes = Object.freeze(['day'])

	#shadowRoot: ShadowRoot

	constructor() {
		super()
		this.#shadowRoot = this.attachShadow({ mode: 'open' })
		this.#shadowRoot.appendChild(template.content.cloneNode(true))
	}

	get day(): number {
		const defaultValue = 1
		const attributeValue = this.getAttribute('day')
		if (!attributeValue) return defaultValue
		const parsedAttributeValue = parseInt(attributeValue, 10)
		if (!Number.isSafeInteger(parsedAttributeValue)) return defaultValue
		if (parsedAttributeValue < 1) return defaultValue
		if (parsedAttributeValue.toString() !== attributeValue) return defaultValue
		return parsedAttributeValue
	}

	set day(value: unknown) {
		if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < 1)
			return
		this.setAttribute('day', value.toString())
	}

	#render() {
		getElementById(this.#shadowRoot, 'day').textContent = `Day ${this.day}`
	}

	attributeChangedCallback() {
		this.#render()
	}

	connectedCallback() {
		this.#render()
	}
}

customElements.define('morning-state', MorningState)

declare global {
	interface HTMLElementTagNameMap {
		'morning-state': MorningState
	}
}
