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
		try {
			return parseDayValue(this.getAttribute('day'))
		} catch {
			return defaultValue
		}
	}

	set day(value: unknown) {
		try {
			this.setAttribute('day', parseDayValue(value).toString())
		} catch {
			// Ignore the invalid value
		}
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

function parseDayValue(value: unknown) {
	let numericValue: number | undefined
	if (typeof value === 'string') {
		numericValue = parseInt(value, 10)
	} else if (typeof value === 'number') {
		numericValue = value
	} else {
		throw new Error('Invalid day value type')
	}
	if (!Number.isSafeInteger(numericValue)) {
		throw new Error('Non-safe integer day value')
	}
	if (numericValue < 1) {
		throw new Error('Invalid day value')
	}
	if (numericValue.toString() !== value.toString()) {
		throw new Error('Non-integer day value')
	}
	return numericValue
}
