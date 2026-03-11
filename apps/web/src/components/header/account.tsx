import { useRef, useState } from 'react'
import { Menu } from '@base-ui/react/menu'

import { Button } from '../button'
import { User } from 'pixelarticons/react'

export function Account() {
  const anchorRef = useRef<HTMLDivElement>(null)
  const [triggerActive, setTriggerActive] = useState(false)

  return (
    <Menu.Root modal={false}>
      <div ref={anchorRef}>
        <Menu.Trigger
          render={<Button />}
          onPointerDown={() => setTriggerActive(true)}
          onPointerUp={() => setTriggerActive(false)}
          data-active={triggerActive ? '' : undefined}
        >
          <User className="size-6" />
          <span className="sr-only">Conta</span>
        </Menu.Trigger>
      </div>

      <Menu.Portal>
        <Menu.Positioner sideOffset={12} align="end" anchor={anchorRef}>
          <Menu.Popup className="flex flex-col gap-5 border-4 border-yellow bg-black p-5 shadow-panel outline-none">
            <Menu.Item render={<Button variant="link" />} nativeButton>
              Histórico
            </Menu.Item>

            <Menu.Item render={<Button variant="link" />} nativeButton>
              Definições
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
