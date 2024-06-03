import { Middleware } from '@oak'

const requestLimitMap: RequestLimitMap = new Map()
const rateLimit: Middleware = async (ctx, next) => {
	const ip: string = ctx.request.ip
	const limit: number = 100
	const interval: number = 60 * 1000 // 60 seconds
	const currentTime: number = Date.now()

	if (!requestLimitMap.has(ip)) {
		requestLimitMap.set(ip, { count: 1, lastRequestTime: currentTime })
	} else {
		const requestLimit: RequestLimitIFC | undefined = requestLimitMap.get(ip)
		if (requestLimit) {
			if (currentTime - requestLimit.lastRequestTime < interval) {
				requestLimit.count += 1
				if (requestLimit.count > limit) {
					ctx.response.status = 429
					ctx.response.body = 'Too many requests.'
					return
				}
			} else {
				requestLimit.count = 1
				requestLimit.lastRequestTime = currentTime
			}
			requestLimitMap.set(ip, requestLimit)
		}
	}

	await next()
}

export default rateLimit
