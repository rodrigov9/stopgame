import * as z from 'zod'
import { processError } from '@/utils/processError.js'

type MaybePromise<T> = T | Promise<T>

type EventCallback<T> = (
  response:
    | ({
        success: false
      } & ReturnType<typeof processError>)
    | {
        success: true
        data: T
      }
) => void

export type EventArgsWithAck<I extends Array<unknown>, O = void> = [
  ...I,
  EventCallback<O>
]

export function socketEventHandler<
  I extends z.ZodTuple,
  O extends z.ZodType = z.ZodVoid
>(
  schemas: { input: I; output?: O },
  fn: (...args: z.output<I>) => MaybePromise<z.infer<O>>
) {
  return async (...event: EventArgsWithAck<z.input<I>, z.infer<O>>) => {
    const callback = event.pop() as EventCallback<z.infer<O>>
    if (typeof callback !== 'function') return

    try {
      const args = schemas.input.parse(event)
      const result = await fn(...args)
      callback({
        success: true,
        data: result
      })
    } catch (error) {
      const processedError = processError(error)

      if (processedError.statusCode === 500) console.error(error)

      callback({
        success: false,
        ...processedError
      })
    }
  }
}
