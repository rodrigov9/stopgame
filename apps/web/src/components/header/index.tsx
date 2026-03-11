import { Link } from '@tanstack/react-router'
import { buttonVariants } from '../button'
import { Home } from 'pixelarticons/react'

import { Account } from './account'

export function Header() {
  return (
    <nav className="absolute inset-x-0 top-0 flex gap-6 self-start justify-self-end p-[inherit]">
      <Link to="/" className={buttonVariants()}>
        <Home className="size-6" />
        <span className="sr-only">Início</span>
      </Link>

      <Account />
    </nav>
  )
}
