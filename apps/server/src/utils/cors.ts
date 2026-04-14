import { FastifyCorsOptions } from '@fastify/cors'
import { env } from '@/env.js'

export const corsConfig = {
  origin: env.CORS_ORIGIN,
  methods: ['GET', 'POST']
} satisfies FastifyCorsOptions
