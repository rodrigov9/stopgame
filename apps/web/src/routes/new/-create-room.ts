import type { FormValues } from './-steps/validators'
import { avatars } from '@/assets/avatars'

export async function createRoom(form: FormValues) {
  await new Promise(resolve => setTimeout(resolve, 3000))

  const gameOptions = {
    ...form.gameOptions,
    time: form.gameOptions.time.enabled ? form.gameOptions.time.value : null
  }

  const profile = {
    ...form.profile,
    avatar: avatars[form.profile.avatar].slug
  }

  console.log('Game options:', gameOptions)
  console.log('Profile:', profile)
}
