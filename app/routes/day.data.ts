import { invariantResponse } from '@epic-web/invariant'
import {
	type unstable_SerializesTo as SerializesTo,
	type useLoaderData,
} from 'react-router'
import { GameScreen } from '#app/state/game-screen.ts'
import { getGameState } from '#app/state/game-state.ts'

export function loader() {
	const gameState = getGameState()
	invariantResponse(
		gameState.screen === GameScreen.Day,
		'Invalid game state for "day" loader',
		{ statusText: 'Bad Request' },
	)
	return {
		newsItems: toSerializableReadonlyMap(gameState.newsItems),
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
