import { createFileRoute, notFound, redirect } from '@tanstack/react-router'
import { useAppForm } from '@/hooks/form'
import { formOpts } from './-form-options'
import { getRoom, joinRoom } from '@/lib/api/room'
import { avatars } from '@/assets/avatars'

import { Panel } from '@/components/panel'
import { Separator } from '@/components/separator'

import { ProfileForm } from './-components/profile-form'
import { GameOptions } from './-components/game-options'

export const Route = createFileRoute('/_app/join/$id')({
  beforeLoad: ({ params }) => {
    const id = params.id.toUpperCase()
    if (localStorage.getItem(`token_${id}`))
      throw redirect({
        to: '/play/$id',
        params: { id },
        replace: true
      })
  },
  loader: async ({ params, abortController }) => {
    try {
      const room = await getRoom(params.id, {
        signal: abortController.signal
      })
      return room
    } catch {
      throw notFound()
    }
  },
  component: RoomInvite
})

function RoomInvite() {
  const room = Route.useLoaderData()
  const navigate = Route.useNavigate()

  const form = useAppForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      const { token } = await joinRoom(room.code, {
        ...value,
        avatar: avatars[value.avatar].slug
      })
      localStorage.setItem(`token_${room.code}`, token)

      await navigate({
        to: '/play/$id',
        params: { id: room.code },
        replace: true
      })
    }
  })

  return (
    <Panel className="w-4xl">
      <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
        <GameOptions game={room} />

        <Separator orientation="vertical" className="not-md:hidden" />
        <Separator orientation="horizontal" className="md:hidden" />

        <ProfileForm form={form} id="profile-form" />
      </div>

      <form.AppForm>
        <form.SubmitButton
          form="profile-form"
          disabled={room.players >= room.maxPlayers}
        >
          Entrar
        </form.SubmitButton>
      </form.AppForm>
    </Panel>
  )
}
