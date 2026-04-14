import { RoomModel } from '../room.js'
import { PlayerModel } from '../player.js'

export type ServerToClientEventMap = {
  initialData: [RoomModel]
  playerJoin: [PlayerModel]
  playerUpdate: [PlayerModel]
  playerLeave: [string]
}
