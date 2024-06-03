import { Middleware } from '@oak'
import { routes } from '../../services/http/routes.ts'

const wildcard: RegExp = /^https:\/\/([a-z0-9-]+\.)?redvelvet\.me$/i
const allowedOrigins: Array<string> = ['http://localhost:3000', 'http://127.0.0.1:3000']

const cors: Middleware = async (ctx, next) => {
	const origin: string = ctx.request.url.origin
	if (allowedOrigins.includes(origin) || wildcard.test(origin)) {
		ctx.response.headers.set('Access-Control-Allow-Origin', origin)
	} else {
		ctx.response.headers.set('Access-Control-Allow-Origin', 'http://localhost:7952')
	}

	const allowedMethods: Array<string> = []
	for (const { methods } of Object.values(routes)) {
		for (const [method, [endpoint]] of Object.entries(methods)) {
			if (endpoint === ctx.request.url.pathname) allowedMethods.push(method.toUpperCase())
		}
	}

	ctx.response.headers.set('Access-Control-Allow-Methods', allowedMethods.toString().replace(',', ', '))
	ctx.response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')

	// Optional: Handle credentials
	ctx.response.headers.set('Access-Control-Allow-Credentials', 'true')

	if (ctx.request.method === 'OPTIONS') {
		// Pre-flight request handling
		ctx.response.status = 204
		return
	}

	const since: number = performance.now()
	await next()
	ctx.response.headers.set('X-Server-Time', `${(performance.now() - since).toFixed(2)}ms`)
}

export default cors
