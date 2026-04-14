import { BaseError } from '@/errors/BaseError.js'
import { ValidationError } from '@/errors/ValidationError.js'
import { ZodError } from 'zod'

export function processError(error: unknown) {
  if (error instanceof BaseError) return error

  if (error instanceof ZodError) {
    const issue = error.issues[0]
    const message = issue
      ? `${issue.path.join('/')} ${issue.message}`
      : 'Validation error'

    return new ValidationError(message)
  }

  if (error instanceof Error) {
    let statusCode: number | undefined

    if ('statusCode' in error && typeof error.statusCode === 'number')
      statusCode = error.statusCode

    if (statusCode !== 500) return new BaseError(error.message, statusCode)
  }

  return new BaseError('An unexpected error occurred')
}
