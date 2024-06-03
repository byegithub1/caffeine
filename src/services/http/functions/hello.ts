export const hello: FunctionIFC = (ctx) => {
	// Put your logic here ...
	ctx.response.body = { caffeine: `hello("Uncomplicate JavaScript")` }
}
