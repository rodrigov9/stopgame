import { Server } from './socket-io.js'

declare module 'fastify' {
  interface FastifyInstance {
    io: Server
  }
}
