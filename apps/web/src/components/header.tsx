import * as Popover from '@radix-ui/react-popover'

import { Button } from './button'
import { User } from 'pixelarticons/react'

export function Header() {
  return (
    <header className="absolute top-0 right-0 flex gap-6 self-start justify-self-end p-[inherit]">
      <Popover.Root>
        <Popover.Anchor>
          <Popover.Trigger asChild>
            <Button>
              <User className="size-6" />
            </Button>
          </Popover.Trigger>
        </Popover.Anchor>

        <Popover.Portal>
          <Popover.Content
            sideOffset={12}
            align="end"
            className="flex flex-col gap-5 border-4 border-yellow bg-black p-5 shadow-panel"
          >
            <span>Histórico</span>
            <span>Definições</span>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </header>
  )
}
