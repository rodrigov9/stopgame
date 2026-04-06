import fp from 'fastify-plugin'
import { STATUS_CODES } from 'node:http'
import { processError } from '@/utils/processError.js'

export const errorHandler = fp(
  async app => {
    app.setErrorHandler((error, req, reply) => {
      const { statusCode, message } = processError(error)

      if (statusCode === 500) req.log.error(error)

      return reply.status(statusCode).send({
        statusCode,
        error: STATUS_CODES[statusCode],
        message
      })
    })
  },
  { name: 'error-handler' }
)
