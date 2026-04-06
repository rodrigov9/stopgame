import * as z from 'zod'

export const roomOptionsSchema = z.object({
  maxPlayers: z.int().min(3).max(30).default(10),
  time: z
    .int()
    .min(30)
    .max(5 * 60)
    .multipleOf(30)
    .nullable()
    .default(null),
  categories: z.array(z.string().min(1).max(20)).min(1)
})
