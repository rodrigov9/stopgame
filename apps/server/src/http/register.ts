import { FastifyPluginCallback } from 'fastify'
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod'
import cors from '@fastify/cors'
import { corsConfig } from '@/utils/cors.js'

import { routes } from './routes.js'
import { errorHandler } from './errorHandler.js'

export const http: FastifyPluginCallback = fastify => {
  const app = fastify.withTypeProvider<ZodTypeProvider>()

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  fastify.register(cors, corsConfig)

  app.register(routes)
  app.setErrorHandler(errorHandler)
}
