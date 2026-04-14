import { STATUS_CODES } from 'node:http'
import { ZodError } from 'zod'

export function processError(error: unknown) {
  let statusCode = 500
  let message = 'An unexpected error occurred'

  if (error instanceof ZodError) {
    statusCode = 400
    const issue = error.issues[0]
    message = issue
      ? `${issue.path.join('/')} ${issue.message}`
      : 'Validation error'
  } else if (
    error instanceof Error &&
    'statusCode' in error &&
    typeof error.statusCode === 'number' &&
    error.statusCode !== 500
  ) {
    statusCode = error.statusCode
    message = error.message
  }

  return {
    statusCode,
    error: STATUS_CODES[statusCode],
    message
  }
}
