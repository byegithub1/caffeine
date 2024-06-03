import cors from '../../utils/middlewares/cors.ts'
import rateLimit from '../../utils/middlewares/ratelimit.ts'

import { routes } from './routes.ts'
import { Application, Context, Router } from '@oak'

const http: Application = new Application()
const router: Router = new Router()

http
	.use(cors)
	.use(rateLimit)
	.use(router.routes())
	.use(router.allowedMethods())

// Define your routes in the 'routes.ts' file

const methods: Array<string> = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'ALL']
const validHttpMethod = (method: string): method is RouteMethod => methods.includes(method.toUpperCase())
const routeLists = (router: Router, routes: { [key: string]: RouteIFC }): void => {
	for (const { methods } of Object.values(routes)) {
		for (const [method, [endpoint, middleware, handler]] of Object.entries(methods)) {
			if (validHttpMethod(method)) {
				const composedMiddleware = [
					...middleware,
					async (ctx: Context, next: () => Promise<void>) => {
						if (handler) handler(ctx)
						await next()
					},
				]
				router[method](endpoint, async (ctx: Context) => {
					for (const mw of composedMiddleware) await mw(ctx, async () => {})
				})
			} else {
				console.warn(`Invalid HTTP method: ${method.toUpperCase()}`)
			}
		}
	}
}

routeLists(router, routes)

export { http }
