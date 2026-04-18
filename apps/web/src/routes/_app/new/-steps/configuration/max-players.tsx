import { withForm } from '@/hooks/form'
import { formOpts } from '../../-form-options'

import { Field } from '@base-ui/react'
import { Users } from 'pixelarticons/react'

export const MaxPlayers = withForm({
  ...formOpts,
  render: ({ form }) => (
    <Field.Root className="flex flex-col gap-3">
      <Field.Label className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
        <Users className="size-6" />
        Máximo de jogadores
      </Field.Label>

      <form.AppField name="gameOptions.maxPlayers">
        {field => <field.Slider min={3} max={30} />}
      </form.AppField>
    </Field.Root>
  )
})
