import { RoomEventMap } from '../schemas/roomSchemas.js'

type ClientToServerEventMap = RoomEventMap

export type ClientToServerEvents = {
  [event in keyof ClientToServerEventMap]: (
    ...args: ClientToServerEventMap[event]
  ) => void
}
