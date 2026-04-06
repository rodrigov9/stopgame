import { BaseError } from '@/errors/BaseError.js'

export function processError(error: unknown) {
  if (error instanceof BaseError) return error

  if (error instanceof Error) {
    let statusCode: number | undefined

    if ('statusCode' in error && typeof error.statusCode === 'number')
      statusCode = error.statusCode

    if (statusCode !== 500) return new BaseError(error.message, statusCode)
  }

  return new BaseError('An unexpected error occurred')
}
