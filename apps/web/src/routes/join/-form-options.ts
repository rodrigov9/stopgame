import { formOptions } from '@tanstack/react-form'
import * as z from 'zod'

const schema = z.object({
  name: z.string().min(1),
  avatar: z.int()
})

export const formOpts = formOptions({
  defaultValues: {
    name: '',
    avatar: 0
  } satisfies z.infer<typeof schema>,
  validators: {
    onChange: schema,
    onMount: schema
  }
})
