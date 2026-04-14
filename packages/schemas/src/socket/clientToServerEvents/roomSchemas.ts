import * as z from 'zod'
import { EventArgsWithAck } from '../acknowledgements.js'

export const readySchema = {
  input: z.tuple([z.boolean()])
}

export type RoomEventMap = {
  ready: EventArgsWithAck<z.input<(typeof readySchema)['input']>>
}
