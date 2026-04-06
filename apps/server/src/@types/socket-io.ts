import {
  DefaultEventsMap,
  Server as DefaultServer,
  Socket as DefaultSocket
} from 'socket.io'
import { TokenPayload } from '@/utils/playerTokens.js'

type ClientToServerEvents = DefaultEventsMap

type ServerToClientEvents = DefaultEventsMap

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
