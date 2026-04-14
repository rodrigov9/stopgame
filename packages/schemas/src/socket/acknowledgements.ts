import { ErrorResponse } from '../error.js'

export type EventCallback<T> = (
  response:
    | ({
        success: false
      } & ErrorResponse)
    | {
        success: true
        data: T
      }
) => void

export type EventArgsWithAck<I extends Array<unknown>, O = void> = [
  ...I,
  EventCallback<O>
]
