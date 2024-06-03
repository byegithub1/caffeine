import { Context, Middleware } from '@oak'

declare global {
	type KV = Deno.Kv
	type RequestLimitMap = Map<string, RequestLimitIFC>
	type RouteMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options' | 'all'

	interface RequestLimitIFC {
		count: number
		lastRequestTime: number
	}

	interface RouteIFC {
		methods: {
			[method: string]: [string, Array<Middleware>, ((ctx: Context) => void)?]
		}
	}

	interface RoutesIFC {
		[key: string]: RouteIFC
	}

	interface FunctionIFC {
		(ctx: Context): void
	}
}
