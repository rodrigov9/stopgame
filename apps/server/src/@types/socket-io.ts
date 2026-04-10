import {
  DefaultEventsMap,
  Server as DefaultServer,
  Socket as DefaultSocket
} from 'socket.io'

import { TokenPayload } from '@/utils/playerTokens.js'
import { Room } from '@/models/Room.js'
import { Player } from '@/models/Player.js'

type ClientToServerEvents = {
  ready: (isReady: boolean) => void
}

type ServerToClientEvents = {
  initialData: (room: ReturnType<typeof Room.prototype.toJSON>) => void

  playerJoin: (player: ReturnType<typeof Player.prototype.toJSON>) => void
  playerUpdate: (player: ReturnType<typeof Player.prototype.toJSON>) => void
  playerLeave: (playerId: string) => void
}

type InterServerEvents = DefaultEventsMap

type SocketData = TokenPayload

export type Socket = DefaultSocket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>

export type Server = DefaultServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>
