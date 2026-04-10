import { FastifyRequest, FastifyReply } from 'fastify'
import { STATUS_CODES } from 'node:http'
import { processError } from '@/utils/processError.js'

export function errorHandler(
  error: unknown,
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { statusCode, message } = processError(error)

  if (statusCode === 500) req.log.error(error)

  return reply.status(statusCode).send({
    statusCode,
    error: STATUS_CODES[statusCode],
    message
  })
}
