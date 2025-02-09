import * as v from 'valibot'
import { GameScreenSchema } from './game-screen.ts'

/**
 * Contains common fields for all game states.
 */
export const BaseGameStateSchema = v.object({
	screen: GameScreenSchema,
})
