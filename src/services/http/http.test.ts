import Hexadecimal from '../../utils/classes/hexadecimal.ts'

import { http } from './config.ts'
import { superoak } from '@superoak'

Deno.test('Endpoint: Home "/"', async () => {
	const request = await superoak(http)
	await request
		.get('/')
		.set('Content-Type', 'application/json')
		.expect(200)
		.expect({ caffeine: 'home("Uncomplicate JavaScript")' })
})

Deno.test('Endpoint: Hello "/hello"', async () => {
	const request = await superoak(http)
	await request
		.get('/hello')
		.set('Content-Type', 'application/json')
		.expect(200)
		.expect({ caffeine: 'hello("Uncomplicate JavaScript")' })
})

Deno.test('Endpoint: Not Found GET "/:notFound*"', async () => {
	const request = await superoak(http)
	await request
		.get('/' + Hexadecimal.randomHex(16))
		.set('Content-Type', 'application/json')
		.expect(404)
		.expect({ caffeine: 'notFound(404 Not Found)' })
})

Deno.test('Endpoint: Not Found POST "/:notFound*"', async () => {
	const request = await superoak(http)
	await request
		.post('/' + Hexadecimal.randomHex(16))
		.set('Content-Type', 'application/json')
		.expect(404)
		.expect({ caffeine: 'notFound(404 Not Found)' })
})
