import * as z from 'zod'

export const roomCodeSchema = z
  .string()
  .length(6)
  .toUpperCase()
  .regex(/^[A-Z0-9]+$/)
