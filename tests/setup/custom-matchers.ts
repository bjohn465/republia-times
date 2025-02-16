import { expect } from 'vitest'

expect.extend({
	toHaveReplaceRedirect(response: unknown, redirectTo?: string) {
		if (!(response instanceof Response)) {
			throw new Error('toHaveReplaceRedirect must be called with a Response')
		}
		const isReplace = response.headers.get('X-Remix-Replace') === 'true'
		if (!isReplace) {
			return {
				pass: false,
				message: () =>
					`Expected redirect to ${
						this.isNot ? 'not ' : ''
					}be a replacement redirect`,
			}
		}
		const location = response.headers.get('location')
		const redirectToSupplied = redirectTo !== undefined
		if (redirectToSupplied !== Boolean(location)) {
			return {
				pass: Boolean(location),
				message: () =>
					`Expected response to ${this.isNot ? 'not ' : ''}redirect${
						redirectToSupplied
							? ` to ${this.utils.printExpected(redirectTo)}`
							: ''
					} but got ${
						location ? 'no redirect' : this.utils.printReceived(location)
					}`,
			}
		}
		const isRedirectStatusCode = response.status >= 300 && response.status < 400
		if (!isRedirectStatusCode) {
			return {
				pass: false,
				message: () =>
					`Expected redirect status code to ${
						this.isNot ? 'not ' : ''
					}be ${this.utils.printExpected(
						'>= 300 && < 400',
					)} but got ${this.utils.printReceived(response.status)}`,
			}
		}

		function toUrl(s?: string | null) {
			s ??= ''
			return s.startsWith('http')
				? new URL(s)
				: new URL(s, 'https://example.com')
		}

		function urlsMatch(u1: URL, u2: URL) {
			const u1SP = new URL(u1).searchParams
			u1SP.sort()
			const u2SP = new URL(u2).searchParams
			u2SP.sort()
			return (
				u1.origin === u2.origin &&
				u1.pathname === u2.pathname &&
				u1SP.toString() === u2SP.toString() &&
				u1.hash === u2.hash
			)
		}

		return {
			pass:
				location == redirectTo || urlsMatch(toUrl(location), toUrl(redirectTo)),
			message: () =>
				`Expected response to ${
					this.isNot ? 'not ' : ''
				}redirect to ${this.utils.printExpected(
					redirectTo,
				)} but got ${this.utils.printReceived(location)}`,
		}
	},
})

interface CustomMatchers<R = unknown> {
	toHaveReplaceRedirect(redirectTo?: string): R
}

declare module 'vitest' {
	interface Assertion<T = any> extends CustomMatchers<T> {}
	interface AsymmetricMatchersContaining extends CustomMatchers {}
}
