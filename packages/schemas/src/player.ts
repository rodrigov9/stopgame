import * as z from 'zod'

export const profileSchema = z.object({
  name: z.string().min(1),
  avatar: z.int()
})

export type PlayerModel = {
  id: string
  name: string
  avatar: number
  score: number
  isConnected: boolean
  isReady: boolean
}
