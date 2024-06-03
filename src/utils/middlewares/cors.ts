import { Middleware } from '@oak'

const cors: Middleware = async (ctx, next) => {
	ctx.response.headers.set('Access-Control-Allow-Origin', '*')
	ctx.response.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE')
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
