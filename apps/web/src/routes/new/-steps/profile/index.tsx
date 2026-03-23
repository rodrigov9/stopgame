import { withForm } from '@/hooks/form'
import { formOpts } from '../../-form-options'

import { Field } from '@base-ui/react'

export const NewRoomProfile = withForm({
  ...formOpts,
  render: ({ form }) => (
    <>
      <form.AppField name="profile.avatar">
        {field => <field.AvatarSelector />}
      </form.AppField>

      <Field.Root className="flex flex-col gap-1">
        <Field.Label>Nome</Field.Label>
        <form.AppField name="profile.name">
          {field => <field.Input />}
        </form.AppField>
      </Field.Root>
    </>
  )
})
