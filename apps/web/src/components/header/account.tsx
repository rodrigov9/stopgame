import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { Button } from '../button'
import { User } from 'pixelarticons/react'

export function Account() {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger>
        <Button asChild>
          <div>
            <User className="size-6" />
            <span className="sr-only">Conta</span>
          </div>
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={12}
          align="end"
          className="flex flex-col gap-5 border-4 border-yellow bg-black p-5 shadow-panel"
        >
          <DropdownMenu.Item asChild>
            <Button variant="link">Histórico</Button>
          </DropdownMenu.Item>

          <DropdownMenu.Item asChild>
            <Button variant="link">Definições</Button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
