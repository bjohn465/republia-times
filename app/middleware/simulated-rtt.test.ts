import { unstable_RouterContextProvider as Context } from 'react-router'
import { beforeEach, expect, type MockInstance, test, vi } from 'vitest'
import { cookieContext } from './cookie.ts'
import { simulatedRTTMiddleware } from './simulated-rtt.ts'

vi.useFakeTimers()
beforeEach(() => {
	vi.clearAllTimers()
})

let consoleDebug: MockInstance<(typeof console)['debug']>
beforeEach(() => {
	const originalConsoleDebug = console.debug
	consoleDebug = vi.spyOn(console, 'debug')
	consoleDebug.mockImplementation(
		(...args: Parameters<typeof console.debug>) => {
			originalConsoleDebug(...args)
			throw new Error(
				'Console debug was called. Call consoleDebug.mockImplementation(() => {}) if this is expected.',
			)
		},
	)
})

function getMiddlewareArgs(cookieValue?: string) {
	const context = new Context()
	context.set(cookieContext, { simulatedRTT: cookieValue })
	return {
		context,
		params: {},
		request: new Request('https://www.example.com/'),
	}
}

function getNextFunction() {
	return vi.fn().mockName('next')
}

test('Does nothing when there is no cookie', async () => {
	const args = getMiddlewareArgs()
	const next = getNextFunction()

	await simulatedRTTMiddleware(args, next)

	expect(next).not.toHaveBeenCalled()
})

test('Does nothing when the cookie is not a number', async () => {
	const args = getMiddlewareArgs('foo')
	const next = getNextFunction()

	await simulatedRTTMiddleware(args, next)

	expect(next).not.toHaveBeenCalled()
})

test('Does nothing when the cookie is a negative number', async () => {
	const args = getMiddlewareArgs('-1')
	const next = getNextFunction()

	await simulatedRTTMiddleware(args, next)

	expect(next).not.toHaveBeenCalled()
})

test('Does nothing when the cookie is zero', async () => {
	const args = getMiddlewareArgs('0')
	const next = getNextFunction()

	await simulatedRTTMiddleware(args, next)

	expect(next).not.toHaveBeenCalled()
})

test('Simulates round-trip time', async () => {
	const args = getMiddlewareArgs('1000')
	const next = getNextFunction()
	const { promise: nextPromise, resolve: resolveNext } =
		Promise.withResolvers<void>()
	next.mockImplementation(() => nextPromise)
	consoleDebug.mockImplementation(() => {})

	const middlewareSpy = vi.fn(simulatedRTTMiddleware)
	const middlewarePromise = middlewareSpy(args, next)

	expect(consoleDebug).toHaveBeenCalledWith('🐌 Simulating RTT of 1000ms')

	expect(next).not.toHaveBeenCalled()
	vi.advanceTimersByTime(500)
	resolveNext()
	await nextPromise
	expect(next).toHaveBeenCalled()

	// Await nexPromise again so the next setTimeout can be set up
	await nextPromise
	vi.advanceTimersByTime(500)
	await middlewarePromise
	expect(middlewareSpy).toHaveResolved()
	expect(consoleDebug).toHaveBeenCalledTimes(1)
})
