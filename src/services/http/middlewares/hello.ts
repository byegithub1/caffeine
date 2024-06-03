import { Middleware } from '@oak'

export const hello_middleware: Middleware = async (_ctx, next) => {
	// Put your logic here ...
	await next()
}
