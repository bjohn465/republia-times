/**
 * An error that occurs when an unsupported value is encountered,
 * like what might happen if a check is not exhaustive for all cases.
 *
 * From https://2ality.com/2025/01/typescript-enum-patterns.html
 */
export class UnsupportedValueError extends Error {
	constructor(value: never, message = `Unsupported value: ${value}`) {
		super(message)
	}
}
