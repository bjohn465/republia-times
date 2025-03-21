import {
	type unstable_SerializesTo as SerializesTo,
	type useLoaderData,
} from 'react-router'
import { assertDayState } from '#app/state/day-state.ts'
import { getGameState } from '#app/state/game-state.ts'
import { dehydratePaper } from '#app/state/state-utils.ts'

export function loader() {
	const gameState = getGameState()
	assertDayState(gameState, 'Invalid game state for "day" loader')
	return {
		newsItems: toSerializableReadonlyMap(gameState.newsItems),
		paper: dehydratePaper(gameState.paper),
	}
}

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
