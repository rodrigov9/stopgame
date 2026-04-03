import fp from 'fastify-plugin'
import { Server, ServerOptions } from 'socket.io'

export const socketIO = fp(
  async (app, opts: Partial<ServerOptions>) => {
    const io = new Server(app.server, opts)

    app.decorate('io', io)

    app.addHook('preClose', done => {
      io.local.disconnectSockets(true)
      done()
    })

    app.addHook('onClose', (instance, done) => {
      instance.io.close()
      done()
    })
  },
  { name: 'socket-io' }
)
