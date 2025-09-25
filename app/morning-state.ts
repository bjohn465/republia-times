import republiaTimesLogo from '../assets/logo.png'
import democriaTimesLogo from '../assets/logo2.png'
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
		const value = this.getAttribute('day')
		if (!value) {
			return defaultValue
		}
		const numericValue = parseInt(value, 10)
		if (!Number.isSafeInteger(numericValue)) {
			return defaultValue
		}
		if (numericValue < 1) {
			return defaultValue
		}
		return numericValue
	}

	set day(value: number) {
		this.setAttribute('day', toStringValue(value))
	}

	get government(): Government {
		const defaultValue = Governments.Republia
		const value = this.getAttribute('government')
		if (!value) {
			return defaultValue
		}
		const lowerCaseValue = value.toLowerCase()
		if (
			Governments.Democria !== lowerCaseValue &&
			Governments.Republia !== lowerCaseValue
		) {
			return defaultValue
		}
		return lowerCaseValue
	}

	set government(value: Government) {
		this.setAttribute('government', toStringValue(value))
	}

	#render() {
		const { day, government } = this

		const logo = getElementById(this.#shadowRoot, 'logo')
		if (!(logo instanceof HTMLImageElement)) {
			throw new Error('Unexpected type for logo element')
		}
		logo.src =
			government === Governments.Republia
				? republiaTimesLogo
				: democriaTimesLogo
		logo.alt =
			government === Governments.Republia
				? 'The Republia Times'
				: 'The Democria Times'

		getElementById(this.#shadowRoot, 'day').textContent = `Day ${day}`
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

function toStringValue(value: unknown) {
	if (typeof value === 'string') {
		return value
	}
	return `${value}`
}
