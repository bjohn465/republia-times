import { invariant } from '@epic-web/invariant'
import { replace } from 'react-router'
import { getGameState, initializeGameState } from './game-state.ts'

const gameStateURLParam = 'initialState'

export function assertURLIsCorrectForGameState(url: URL) {
	let gameState = getGameState()
	if (url.pathname === gameState.url) {
		return
	}
	const newURL = new URL(url)
	try {
		gameState = getGameStateFromURLParam(url)
	} catch {
		// If the URL parameter was bad for some reason, remove it
		newURL.searchParams.delete(gameStateURLParam)
	}
	newURL.pathname = gameState.url
	throw replace(newURL.toString())
}

function getGameStateFromURLParam(url: URL) {
	const paramValue = url.searchParams.get(gameStateURLParam)
	invariant(paramValue, 'URL does not contain an initial game state')
	const decodedParamValue = atob(paramValue)
	const deserializedState = JSON.parse(decodedParamValue)
	return initializeGameState(deserializedState)
}
