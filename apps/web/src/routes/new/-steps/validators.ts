import * as z from 'zod'
import { roomOptionsSchema } from '@stopgame/schemas/room'
import { profileSchema } from '@stopgame/schemas/player'

export const configurationStepSchema = z.object({
  gameOptions: roomOptionsSchema.omit({ categories: true })
})

export const categoriesStepSchema = z.object({
  gameOptions: roomOptionsSchema.pick({ categories: true })
})

export const profileStepSchema = z.object({
  profile: profileSchema
})

export const formSchema = z.object({
  currentStep: z.int(),
  gameOptions: roomOptionsSchema,
  profile: profileSchema
})

export type FormValues = z.infer<typeof formSchema>
