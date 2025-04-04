import {
	type ActionFunctionArgs,
	type unstable_SerializesTo as SerializesTo,
	type useLoaderData,
} from 'react-router'
import * as v from 'valibot'
import { parseFormData } from '#app/form-data.ts'
import { Intents, intentSchema } from '#app/intents.ts'
import { DayState } from '#app/state/day-state.ts'
import { getExpectedGameState, updateGameState } from '#app/state/game-state.ts'
import { NewsItemIDSchema } from '#app/state/news-items.ts'
import { dehydratePaper } from '#app/state/state-utils.ts'
import { UnsupportedValueError } from '#app/unsupported-value-error.ts'

export function loader() {
	const gameState = getExpectedGameState(
		DayState,
		'Invalid game state for "day" loader',
	)
	return {
		newsItems: toSerializableReadonlyMap(gameState.newsItems),
		paper: dehydratePaper(gameState.paper),
	}
}

export async function action({ request }: ActionFunctionArgs) {
	const gameState = getExpectedGameState(
		DayState,
		'Invalid game state for "day" action',
	)
	const data = parseFormData(DayActionFormDataSchema, await request.formData())
	switch (data.intent) {
		case Intents.AddToPaper: {
			updateGameState(gameState.addToPaper(data.id))
			return { ok: true }
		}
		default:
			throw new UnsupportedValueError(data.intent)
	}
}

const DayActionFormDataSchema = v.object({
	intent: intentSchema(Intents.AddToPaper),
	id: NewsItemIDSchema,
})

/**
 * A workaround for https://github.com/remix-run/react-router/issues/13092
 * that casts a `ReadonlyMap` to a `SerializesTo<ReadonlyMap>`
 * so the map's type serializes correctly when the route loader data is used
 * via `useLoaderData`.
 * @param readonlyMap The `ReadonlyMap` to cast
 * @returns The `ReadonlyMap` as a `SerializesTo<ReadonlyMap>`
 */
function toSerializableReadonlyMap<T>(
	readonlyMap: SerializableReadonlyMap<T>,
): SerializesTo<T> {
	return readonlyMap as unknown as SerializesTo<T>
}

type SerializableReadonlyMap<T> =
	// Get the types of the keys and values
	T extends ReadonlyMap<infer K, infer V>
		? // Ensure `T` as a `Map` serializes
			ReturnType<typeof useLoaderData<() => Map<K, V>>> extends Map<K, V>
			? T
			: never
		: never
