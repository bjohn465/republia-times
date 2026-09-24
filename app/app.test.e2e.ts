import { fileURLToPath } from 'node:url'
import * as assert from 'remix/assert'
import { beforeAll, describe, it } from 'remix/test'
import {
	build,
	createServer,
	preview,
	type PreviewServer,
	type ViteDevServer,
} from 'vite'

const root = fileURLToPath(new URL('../', import.meta.url))
const mode: 'development' | 'production' = 'production'

async function createViteTestServer() {
	let options:
		| Parameters<typeof createServer>[0]
		| Parameters<typeof preview>[0] = {
		root,
		logLevel: 'silent',
		server: {
			host: '127.0.0.1',
			port: 0,
		},
	}

	let vite: ViteDevServer | PreviewServer
	if (mode === 'development') {
		vite = await createServer(options)
		await vite.listen()
	} else {
		vite = await preview(options)
	}

	let address = vite.httpServer?.address()
	if (address == null || typeof address === 'string') {
		await vite.close()
		throw new Error('Vite did not bind to a TCP port')
	}

	return {
		baseUrl: `http://127.0.0.1:${address.port}`,
		async close() {
			await vite.close()
		},
	}
}

describe(`Republia Times (${mode})`, () => {
	beforeAll(async () => {
		if (mode === 'production') await build({ root, logLevel: 'silent' })
	})

	it('displays day 1 morning page', async (t) => {
		let page = await t.serve(await createViteTestServer())

		await page.goto('/')
		await page
			.getByRole('heading', { level: 1, name: 'The Republia Times' })
			.waitFor()
		await page.getByRole('heading', { level: 2, name: 'Day 1' }).waitFor()
	})

	it('displays 404 page on unknown URL', async (t) => {
		let page = await t.serve(await createViteTestServer())

		await page.goto('/not-there')
		await page
			.getByRole('heading', { level: 1, name: 'Page not found' })
			.waitFor()
		assert.equal(await page.getByRole('link').getAttribute('href'), '/')
	})
})
