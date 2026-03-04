import { Link } from '@tanstack/react-router'
import { Button } from '../button'
import { Home } from 'pixelarticons/react'

import { Account } from './account'

export function Header() {
  return (
    <nav className="absolute inset-x-0 top-0 flex gap-6 self-start justify-self-end p-[inherit]">
      <Button asChild>
        <Link to="/">
          <Home className="size-6" />
          <span className="sr-only">Início</span>
        </Link>
      </Button>

      <Account />
    </nav>
  )
}
