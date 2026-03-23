import * as z from 'zod'

export const configurationStepSchema = z.object({
  gameOptions: z.object({
    maxPlayers: z.int().min(3).max(30),
    time: z.object({
      enabled: z.boolean(),
      value: z
        .int()
        .min(30)
        .max(5 * 60)
        .multipleOf(30)
    })
  })
})

export const categoriesStepSchema = z.object({
  gameOptions: z.object({
    categories: z.array(z.string().min(1).max(20)).min(1)
  })
})

export const profileStepSchema = z.object({
  profile: z.object({
    name: z.string().min(1),
    avatar: z.int()
  })
})

export const formSchema = z.object({
  currentStep: z.int(),
  gameOptions: z.object({
    ...configurationStepSchema.shape.gameOptions.shape,
    ...categoriesStepSchema.shape.gameOptions.shape
  }),
  ...profileStepSchema.shape
})

export type FormValues = z.infer<typeof formSchema>
