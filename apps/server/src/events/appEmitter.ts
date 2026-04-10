import { EventEmitter } from 'node:events'
import { Player } from '@/models/Player.js'

type EventMap = {
  playerAdd: [string, Player]
  playerUpdate: [string, Player]
  playerRemove: [string, Player]
}

export const appEmitter = new EventEmitter<EventMap>()
