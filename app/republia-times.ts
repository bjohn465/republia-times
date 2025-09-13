import './morning-state.ts'
import { createTemplate, html } from './templates.ts'

const template = createTemplate(html`
	<div id="republia-times">
		<morning-state id="state"></morning-state>
	</div>
`)

export class RepubliaTimes extends HTMLElement {
	#day: number = 1
	#shadowRoot: ShadowRoot

	constructor() {
		super()
		this.#shadowRoot = this.attachShadow({ mode: 'open' })
		this.#shadowRoot.appendChild(template.content.cloneNode(true))
	}

	#render() {
		const state = this.#shadowRoot.querySelector('morning-state')
		if (!state) {
			throw new Error('Unexpected state')
		}
		state.day = this.#day
	}

	connectedCallback() {
		this.#render()
	}
}

customElements.define('republia-times', RepubliaTimes)

declare global {
	interface HTMLElementTagNameMap {
		'republia-times': RepubliaTimes
	}
}
