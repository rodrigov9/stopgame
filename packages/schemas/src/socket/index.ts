import { ClientToServerEventMap } from './clientToServerEvents/index.js'
import { ServerToClientEventMap } from './serverToClientEvents.js'

type SocketEvents<Map extends Record<string, unknown[]>> = {
  [event in keyof Map]: (...args: Map[event]) => void
}

export type ClientToServerEvents = SocketEvents<ClientToServerEventMap>
export type ServerToClientEvents = SocketEvents<ServerToClientEventMap>
