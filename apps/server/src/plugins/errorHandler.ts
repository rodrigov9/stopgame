import fp from 'fastify-plugin'
import { STATUS_CODES } from 'node:http'
import { processError } from '@/utils/processError.js'

export const errorHandler = fp(
  async app => {
    app.setErrorHandler((error, _req, reply) => {
      const { statusCode, message } = processError(error)

      if (statusCode === 500) app.log.error(error)

      return reply.status(statusCode).send({
        statusCode,
        error: STATUS_CODES[statusCode],
        message
      })
    })
  },
  { name: 'error-handler' }
)
