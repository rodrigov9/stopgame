import { withForm } from '@/hooks/form'
import { formOpts } from '../../-form-options'

import { MaxPlayers } from './max-players'
import { Time } from './time'

export const NewRoomConfiguration = withForm({
  ...formOpts,
  render: ({ form }) => (
    <>
      <MaxPlayers form={form} />
      <Time form={form} />
    </>
  )
})
