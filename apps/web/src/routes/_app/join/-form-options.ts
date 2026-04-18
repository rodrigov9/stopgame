import { formOptions } from '@tanstack/react-form'
import * as z from 'zod'
import { profileSchema } from '@stopgame/schemas/player'

const validator = profileSchema.extend({
  avatar: z.int().min(0)
})

export const formOpts = formOptions({
  defaultValues: {
    name: '',
    avatar: 0
  } satisfies z.infer<typeof validator>,
  validators: {
    onChange: validator,
    onMount: validator
  }
})
