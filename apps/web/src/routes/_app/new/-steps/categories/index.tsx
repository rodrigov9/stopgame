import { withForm } from '@/hooks/form'
import { formOpts } from '../../-form-options'

import { CategoryInput } from './category-input'

export const NewRoomCategories = withForm({
  ...formOpts,
  render: ({ form }) => (
    <form.Field name="gameOptions.categories" mode="array">
      {field => (
        <CategoryInput
          value={field.state.value}
          addCategory={field.pushValue}
          removeCategory={field.removeValue}
        />
      )}
    </form.Field>
  )
})
