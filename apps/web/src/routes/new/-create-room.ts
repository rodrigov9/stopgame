import * as z from 'zod'
import { roomOptionsSchema } from '@stopgame/schemas/room'
import { profileSchema } from '@stopgame/schemas/player'

import * as api from '@/lib/api/room'
import type { FormValues } from './-steps/validators'
import { avatars } from '@/assets/avatars'

export async function createRoom(form: FormValues) {
  const options: z.infer<typeof roomOptionsSchema> = {
    ...form.gameOptions,
    time: form.gameOptions.time.enabled ? form.gameOptions.time.value : null
  }

  const profile: z.infer<typeof profileSchema> = {
    ...form.profile,
    avatar: avatars[form.profile.avatar].slug
  }

  const { roomCode, token } = await api.createRoom({
    options,
    profile
  })

  localStorage.setItem(`token_${roomCode}`, token)
  return roomCode
}
