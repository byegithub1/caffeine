import { Server as Websocket, Socket } from '@socket'

const server: Websocket = new Websocket({
	path: '/socket',
	cors: {
		origin: /^.+localhost:(7952|3000)$/,
		credentials: true,
		methods: ['GET', 'POST'],
		allowedHeaders: ['Access-Control-Allow-Origin'],
	},
	connectTimeout: 45000,
	upgradeTimeout: 10000,
})

server.on('connection', (socket: Socket): void => {
	// Put your logic here ...
	socket.on('disconnect', (): void => {
		// ...
	})
	socket.on('error', (_error: Error): void => {
		// ...
	})
})

export { server }
