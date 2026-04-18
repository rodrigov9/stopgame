import { withForm } from '@/hooks/form'
import { formOpts } from '../-form-options'

import { Field } from '@base-ui/react'

type ProfileFormProps = {
  id?: string
}

export const ProfileForm = withForm({
  ...formOpts,
  props: {} as ProfileFormProps,
  render: ({ form, id }) => (
    <form
      id={id}
      className="flex flex-col gap-6"
      onSubmit={e => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <form.AppField name="avatar">
        {field => <field.AvatarSelector />}
      </form.AppField>

      <Field.Root className="flex flex-col gap-1">
        <Field.Label>Nome</Field.Label>
        <form.AppField name="name">{field => <field.Input />}</form.AppField>
      </Field.Root>
    </form>
  )
})
