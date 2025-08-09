export function invariant(
	condition: unknown,
	message: string,
): asserts condition {
	if (!condition) {
		throw new InvariantError(message)
	}
}

class InvariantError extends Error {}
