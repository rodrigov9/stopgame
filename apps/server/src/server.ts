import { fastify } from 'fastify'
import { env } from './env.js'

import { http } from './http/register.js'
import { websockets } from './ws/register.js'

const app = fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname'
      }
    }
  }
})

app.register(http)
app.register(websockets)

app.listen({ port: env.PORT, host: '0.0.0.0' }).catch(err => {
  app.log.error(err)
  process.exit(1)
})
