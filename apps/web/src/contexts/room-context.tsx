import { createContext } from 'react'
import type { RoomModel } from '@stopgame/schemas/room'
import type { PlayerModel } from '@stopgame/schemas/player'

type RoomContextData = {
  isConnected: boolean
  room: Omit<RoomModel, 'players'>
  players: PlayerModel[]
}

export const RoomContext = createContext({} as RoomContextData)
