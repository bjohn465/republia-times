import { createTemplate, getElementById, html } from './templates.ts'

const Governments = Object.freeze({
	Republia: 'republia',
	Democria: 'democria',
})
type Government = (typeof Governments)[keyof typeof Governments]

const template = createTemplate(html`
	<header>
		<h1><img height="41" id="logo" width="250" /></h1>
		<h2 id="day"></h2>
	</header>
`)

export class MorningState extends HTMLElement {
	static observedAttributes = Object.freeze(['day', 'government'])

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

	get government(): Government {
		const defaultValue = Governments.Republia
		const value = this.getAttribute('government')
		if (!value) {
			return defaultValue
		}
		const lowerCaseValue = value.toLowerCase()
		try {
			parseGovernmentValue(lowerCaseValue)
		} catch {
			return defaultValue
		}
		return lowerCaseValue
	}

	set government(value: unknown) {
		if (typeof value !== 'string') {
			return
		}
		try {
			parseGovernmentValue(value.toLowerCase())
			this.setAttribute('government', value)
		} catch {
			// Ignore the invalid value
		}
	}

	#render() {
		const logo = getElementById(this.#shadowRoot, 'logo')
		if (!(logo instanceof HTMLImageElement)) {
			throw new Error('Unexpected type for logo element')
		}
		logo.src = `/assets/${this.government === Governments.Republia ? 'logo' : 'logo2'}.png`
		logo.alt =
			this.government === Governments.Republia
				? 'The Republia Times'
				: 'The Democria Times'
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

function parseGovernmentValue(value: string): asserts value is Government {
	if (!Object.values(Governments).includes(value)) {
		throw new Error('Invalid government value')
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
