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
		// `ReadonlyMap` will not serialize correctly
		// (until https://github.com/remix-run/react-router/pull/13092 is merged),
		// so work around that by casting it to a `SerializesTo<ReadonlyMap>`
		// (as long as the keys and values of the map are serializable).
		newsItems: gameState.newsItems as ReadonlyMapSerializationWorkaround<
			typeof gameState.newsItems
		>,
	}
}

type ReadonlyMapSerializationWorkaround<
	T extends ReadonlyMap<unknown, unknown>,
> =
	// Get the types of the keys and values
	T extends ReadonlyMap<infer K, infer V>
		? // Ensure `T` as a `Map` serializes
			ReturnType<typeof useLoaderData<() => Map<K, V>>> extends Map<K, V>
			? SerializesTo<T>
			: never
		: never
