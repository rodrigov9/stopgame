import { fastify, FastifyServerOptions } from 'fastify'
import { env } from './env.js'

import { http } from './http/register.js'
import { websockets } from './ws/register.js'

const devLoggerOptions = {
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname'
    }
  }
} satisfies FastifyServerOptions['logger']

const app = fastify({
  logger: env.NODE_ENV === 'development' ? devLoggerOptions : true
})

app.register(http)
app.register(websockets)

if (env.NODE_ENV === 'development') {
  import('@/services/seed.js')
}

app.listen({ port: env.PORT, host: '0.0.0.0' }).catch(err => {
  app.log.error(err)
  process.exit(1)
})
