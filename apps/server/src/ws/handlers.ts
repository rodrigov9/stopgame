import { FastifyPluginCallback } from 'fastify'

export const handlers: FastifyPluginCallback = app => {
  app.io.on('connection', socket => {
    app.log.info(`Socket connected ${socket.id}`)

    socket.on('disconnect', reason => {
      app.log.info(`Socket disconnected ${socket.id} (${reason})`)
    })
  })
}
