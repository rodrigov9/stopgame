import * as z from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string()
})

export const env = envSchema.parse(process.env)
