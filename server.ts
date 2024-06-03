/*
|-------------------------------------------------------------------------------
| © 2024 Caffeine
|-------------------------------------------------------------------------------
|
| Author    : Rivane Rasetiansyah <re@redvelvet.me> (https://redvelvet.me)
| GitHub    : https://github.com/rvnrstnsyh
| GitLab    : https://gitlab.com/rvnrstnsyh
|
*/

import { serve } from '@std/http'
import { config as loadEnv } from '@dotenv'

import { http } from './src/services/http/config.ts'
import { server as socket } from './src/services/socket/config.ts'

loadEnv({ export: true })

const hostname: string = Deno.env.get('APP_HOSTNAME') || '127.0.0.1'
const port: number = parseInt(Deno.env.get('APP_PORT') || '5000', 10)

await serve(
	socket.handler(async (request: Request): Promise<Response> => {
		return await http.handle(request) || new Response(null, { status: 404 })
	}),
	{ hostname, port },
)
