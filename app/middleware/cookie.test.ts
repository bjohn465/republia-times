import { unstable_RouterContextProvider as Context } from 'react-router'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { cookieContext, cookieMiddleware } from './cookie.ts'

function getMockNext() {
	return vi.fn().mockName('next')
}

beforeEach(() => {
	Object.defineProperty(global, 'document', {
		configurable: true,
		value: undefined,
	})
})

test('Sets cookie context for cookies in request header', () => {
	const context = new Context()
	const params = {}
	const request = new Request('https://www.example.com/', {
		headers: {
			cookie: 'foo=bar',
		},
	})

	cookieMiddleware({ context, params, request }, getMockNext())

	expect(context.get(cookieContext)).toEqual({ foo: 'bar' })
})

test('Does not call the next function', () => {
	const context = new Context()
	const params = {}
	const request = new Request('https://www.example.com/')
	const next = getMockNext()

	cookieMiddleware({ context, params, request }, next)

	expect(next).not.toHaveBeenCalled()
})

describe('When running on the client', () => {
	beforeEach(() => {
		Object.defineProperty(global, 'document', {
			configurable: true,
			value: {
				cookie: '',
			},
		})
	})

	test('Sets cookie context for document cookies', () => {
		const context = new Context()
		const params = {}
		const request = new Request('https://www.example.com/')
		document.cookie = 'foo=bar'

		cookieMiddleware({ context, params, request }, getMockNext())

		expect(context.get(cookieContext)).toEqual({ foo: 'bar' })
	})

	test('Overwrites document cookies with request header cookies', () => {
		const context = new Context()
		const params = {}
		const request = new Request('https://www.example.com/', {
			headers: {
				cookie: 'foo=bar',
			},
		})
		document.cookie = 'foo=baz'

		cookieMiddleware({ context, params, request }, getMockNext())

		expect(context.get(cookieContext)).toEqual({ foo: 'bar' })
	})
})
