import { assert, describe, expect, expectTypeOf, test } from 'vitest'
import { getThrownValue } from '#tests/utils.ts'
import { invariantResponse, invariant, InvariantError } from './invariant.ts'

describe('invariantResponse', () => {
	test('Throws Response with default status text when the condition is false', async () => {
		const thrownValue = getThrownValue(() =>
			invariantResponse(false, 'message'),
		)
		assert.instanceOf(thrownValue, Response)
		expect(thrownValue).toHaveProperty('status', 400)
		expect(thrownValue).toHaveProperty('statusText', 'Bad Request')
		await expect(thrownValue.text()).resolves.toBe('message')
	})

	test('Allows Response to be configured', async () => {
		const thrownValue = getThrownValue(() =>
			invariantResponse(false, 'Where did it go?', {
				status: 404,
				statusText: 'Not Found',
			}),
		)
		assert.instanceOf(thrownValue, Response)
		expect(thrownValue).toHaveProperty('status', 404)
		expect(thrownValue).toHaveProperty('statusText', 'Not Found')
		await expect(thrownValue.text()).resolves.toBe('Where did it go?')
	})

	test('Asserts condition and does not throw when the condition is true', () => {
		function getValue(): string | void {
			return 'hello'
		}
		const value = getValue()
		invariantResponse(value, 'message')
		expectTypeOf(value).toEqualTypeOf<string>()
	})
})

test('Exports invariant function for convenience', () => {
	expect(invariant).toBeInstanceOf(Function)
})

test('Exports InvariantError for convenience', () => {
	expect(InvariantError).toBeDefined()
})
