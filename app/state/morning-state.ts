import * as v from 'valibot'
import { BaseGameStateSchema } from './base-game-state.ts'
import { DayState } from './day-state.ts'
import { GameScreen } from './game-screen.ts'

export class MorningState {
	static parse(state: unknown) {
		return new MorningState(v.parse(MorningStateObjectSchema, state))
	}

	readonly #state: MorningStateObject

	constructor(state: MorningStateObject) {
		this.#state = state
	}

	get screen() {
		return this.#state.screen
	}

	get url() {
		return '/morning' as const
	}

	startWork() {
		return DayState.fromMorningState()
	}
}

const MorningStateObjectSchema = v.pipe(
	v.object({
		...BaseGameStateSchema.entries,
		screen: v.literal(GameScreen.Morning),
	}),
	v.readonly(),
)
type MorningStateObject = v.InferOutput<typeof MorningStateObjectSchema>
