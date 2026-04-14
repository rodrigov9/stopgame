import { formOptions } from '@tanstack/react-form'
import * as z from 'zod'
import { profileSchema } from '@stopgame/schemas/player'

export const formOpts = formOptions({
  defaultValues: {
    name: '',
    avatar: 0
  } satisfies z.infer<typeof profileSchema>,
  validators: {
    onChange: profileSchema,
    onMount: profileSchema
  }
})
