import { useFieldContext } from '@/hooks/form-context'

import { Button } from '@base-ui/react'
import { Avatar } from '@/components/avatar'

import { avatars } from '@/assets/avatars'
import { ChevronLeft2, ChevronRight2 } from 'pixelarticons/react'

export default function AvatarSelector() {
  const field = useFieldContext<number>()

  function previousAvatar() {
    field.handleChange(prev => (prev - 1 + avatars.length) % avatars.length)
  }

  function nextAvatar() {
    field.handleChange(prev => (prev + 1) % avatars.length)
  }

  return (
    <div className="flex items-center justify-center">
      <Button onClick={previousAvatar}>
        <ChevronLeft2 className="size-12" />
        <span className="sr-only">Avatar anterior</span>
      </Button>

      <Avatar src={field.state.value} className="size-32" />

      <Button onClick={nextAvatar}>
        <ChevronRight2 className="size-12" />
        <span className="sr-only">Avatar seguinte</span>
      </Button>
    </div>
  )
}
