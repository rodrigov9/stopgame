import { FastifyRequest, FastifyReply } from 'fastify'
import { processError } from '@/utils/processError.js'

export function errorHandler(
  error: unknown,
  req: FastifyRequest,
  reply: FastifyReply
) {
  const processedError = processError(error)

  if (processedError.statusCode === 500) req.log.error(error)

  return reply.status(processedError.statusCode).send(processedError)
}
