import { type unstable_MiddlewareFunction as MiddlewareFunction } from 'react-router'
import { cookieContext } from './cookie.ts'

export const simulatedRTTMiddleware: MiddlewareFunction = async (
	{ context, request },
	next,
) => {
	const cookieValue = context.get(cookieContext).simulatedRTT ?? ''
	const simulatedRTT = Number.parseInt(cookieValue, 10)
	if (Number.isNaN(simulatedRTT) || simulatedRTT <= 0) {
		return
	}
	console.debug(
		`🐌 Simulating RTT of ${simulatedRTT}ms for ${request.method} request to ${request.url}`,
	)
	const splitRTT = simulatedRTT / 2
	await wait(splitRTT)
	await next()
	await wait(splitRTT)
}

function wait(timeout: number) {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve()
		}, timeout)
	})
}
