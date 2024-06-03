import { hello } from './functions/hello.ts'
import { hello_middleware } from './middlewares/hello.ts'

/**
 * Routes objects that define each route endpoint, middleware, and function.
 *
 * Structure:
 * routes
 * 		routeName
 * 				methods
 * 						get ['endpoint', [middlewares], function?]
 * 						post ['endpoint', [middlewares], function?]
 * 		routeName
 * 				methods
 * 						delete ['endpoint', [middlewares], function?]
 * 		... etc.
 */
const routes: { [key: string]: RouteIFC } = {
	home: {
		methods: {
			get: ['/v0', [], (ctx) => ctx.response.body = { caffeine: `home("Uncomplicate JavaScript")` }],
		},
	},
	hello: {
		methods: {
			get: ['/v0/hello', [hello_middleware], hello],
		},
	},
	notFound: {
		methods: {
			all: ['/v0/:notFound*', [(ctx) => {
				ctx.response.status = 404
				ctx.response.body = { caffeine: 'notFound("404 Not Found")' }
			}]],
		},
	},
}

export { routes }
