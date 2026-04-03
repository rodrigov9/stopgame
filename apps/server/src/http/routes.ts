import { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'

export const routes: FastifyPluginCallbackZod = app => {
  app.get('/', (_req, reply) => {
    reply.send({ hello: 'world' })
  })
}
