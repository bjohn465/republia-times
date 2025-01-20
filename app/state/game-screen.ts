import * as v from 'valibot'

export const GameScreen = Object.freeze({
	Morning: 'morning',
	Day: 'day',
})
export const GameScreenSchema = v.picklist(Object.values(GameScreen))
