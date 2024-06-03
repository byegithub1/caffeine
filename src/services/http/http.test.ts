import Hexadecimal from '../../utils/classes/hexadecimal.ts'

import { http } from './config.ts'
import { superoak } from '@superoak'

Deno.test('Endpoint: GET Home "/v0"', async () => {
	const request = await superoak(http)
	await request
		.get('/v0')
		.set('Content-Type', 'application/json')
		.expect(200)
		.expect({ caffeine: 'home("Uncomplicate JavaScript")' })
})

Deno.test('Endpoint: GET Hello "/v0/hello"', async () => {
	const request = await superoak(http)
	await request
		.get('/v0/hello')
		.set('Content-Type', 'application/json')
		.expect(200)
		.expect({ caffeine: 'hello("Uncomplicate JavaScript")' })
})

Deno.test('Endpoint: GET Hello "/v0/hello?name=deno"', async () => {
	const request = await superoak(http)
	await request
		.get('/v0/hello?name=deno')
		.set('Content-Type', 'application/json')
		.expect(200)
		.expect({ caffeine: 'hello("deno")' })
})

Deno.test('Endpoint: GET Not Found "/v0/:notFound*"', async () => {
	const request = await superoak(http)
	await request
		.get('/v0/' + Hexadecimal.randomHex(16))
		.set('Content-Type', 'application/json')
		.expect(404)
		.expect({ caffeine: 'notFound("404 Not Found")' })
})

Deno.test('Endpoint: POST Not Found "/v0/:notFound*"', async () => {
	const request = await superoak(http)
	await request
		.post('/v0/' + Hexadecimal.randomHex(16))
		.set('Content-Type', 'application/json')
		.expect(404)
		.expect({ caffeine: 'notFound("404 Not Found")' })
})
