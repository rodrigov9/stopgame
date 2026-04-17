import { ExtendedError } from 'socket.io'
import { Socket } from '../types/socketIO.js'

import { BaseError } from '@/errors/BaseError.js'
import { processError } from '@/utils/processError.js'

export function middleware(fn: (socket: Socket) => unknown) {
  return async (socket: Socket, next: (err?: ExtendedError) => void) => {
    try {
      await fn(socket)
      next()
    } catch (error) {
      const errorToSend: ExtendedError =
        error instanceof BaseError
          ? error
          : new Error(processError(error).message)

      errorToSend.data = errorToSend.name

      next(errorToSend)
    }
  }
}
