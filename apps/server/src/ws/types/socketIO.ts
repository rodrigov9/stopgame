import {
  DefaultEventsMap,
  Server as DefaultServer,
  Socket as DefaultSocket
} from 'socket.io'

import { ClientToServerEvents } from './clientToServerEvents.js'
import { ServerToClientEvents } from './serverToClientEvents.js'
import { TokenPayload } from '@/utils/playerTokens.js'

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
