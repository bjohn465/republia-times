import { invariantResponse as epicWebInvariantResponse } from '@epic-web/invariant'

export function invariantResponse(
	condition: unknown,
	message: string | (() => string),
	responseInit?: ResponseInit,
): asserts condition {
	return epicWebInvariantResponse(condition, message, {
		statusText: 'Bad Request',
		...responseInit,
	})
}

export { InvariantError, invariant } from '@epic-web/invariant'
