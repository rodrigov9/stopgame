import { fastify } from 'fastify'
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod'
import { env } from './env.js'

import { socketIO } from './plugins/socket-io.js'
import { routes } from './http/routes.js'
import { handlers } from './ws/handlers.js'

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
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(socketIO)

app.register(routes)
app.register(handlers)

app.listen({ port: env.PORT, host: '0.0.0.0' }).catch(err => {
  app.log.error(err)
  process.exit(1)
})
