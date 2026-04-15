import * as z from 'zod'
import { roomOptionsSchema } from '@stopgame/schemas/room'
import { profileSchema } from '@stopgame/schemas/player'

export const formSchema = z.object({
  currentStep: z.int(),
  gameOptions: roomOptionsSchema.extend({
    time: z.object({
      enabled: z.boolean(),
      value: roomOptionsSchema.shape.time
    })
  }),
  profile: profileSchema.extend({
    avatar: z.int().min(0)
  })
})

export type FormValues = z.infer<typeof formSchema>

export const configurationStepSchema = z.object({
  gameOptions: formSchema.shape.gameOptions.omit({ categories: true })
})

export const categoriesStepSchema = z.object({
  gameOptions: formSchema.shape.gameOptions.pick({ categories: true })
})

export const profileStepSchema = formSchema.pick({ profile: true })
