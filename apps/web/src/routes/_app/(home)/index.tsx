import { createFileRoute, Link } from '@tanstack/react-router'

import { Panel } from '@/components/panel'
import { buttonVariants } from '@/components/button'
import { JoinForm } from './-components/join-form'
import { Plus } from 'pixelarticons/react'

export const Route = createFileRoute('/_app/(home)/')({
  component: Home
})

function Home() {
  return (
    <Panel>
      <Link to="/new" className={buttonVariants()}>
        <Plus className="size-6" /> Criar nova sala
      </Link>

      <JoinForm />
    </Panel>
  )
}
