import { createFileRoute } from '@tanstack/react-router'
import { useAppForm } from '@/hooks/form'
import { formOpts } from './-form-options'

import { Panel } from '@/components/panel'
import { Separator } from '@/components/separator'

import { ProfileForm } from './-components/profile-form'
import { GameOptions } from './-components/game-options'

export const Route = createFileRoute('/join/$id')({
  component: RoomInvite
})

function RoomInvite() {
  const { id } = Route.useParams()

  const form = useAppForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      await new Promise(resolve => setTimeout(resolve, 3000))

      console.log(value)

      // TODO: redirect to the room page
    }
  })

  return (
    <Panel className="w-4xl">
      <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
        <GameOptions
          game={{
            code: id,
            owner: 'Rodrigo',
            players: {
              max: 10,
              current: 1
            },
            round: 1,
            time: null,
            categories: [
              'Nomes',
              'Objetos',
              'TPC',
              'Comida',
              'Animais',
              'Marcas',
              'Profissões',
              'Famosos'
            ]
          }}
        />

        <Separator orientation="vertical" className="not-md:hidden" />
        <Separator orientation="horizontal" className="md:hidden" />

        <ProfileForm form={form} id="profile-form" />
      </div>

      <form.AppForm>
        <form.SubmitButton form="profile-form">Entrar</form.SubmitButton>
      </form.AppForm>
    </Panel>
  )
}
