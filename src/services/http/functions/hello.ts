export const hello: FunctionIFC = (ctx) => {
	// Put your logic here ...
	const name: string | null = ctx.request.url.searchParams.get('name')

	if (name) return ctx.response.body = { caffeine: `hello("${name}")` }
	ctx.response.body = { caffeine: `hello("Uncomplicate JavaScript")` }
}
