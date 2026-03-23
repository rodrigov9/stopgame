import { createFileRoute, Link } from '@tanstack/react-router'

import { Panel } from '@/components/panel'
import { Button, buttonVariants } from '@/components/button'
import { Input } from '@/components/input'
import { Plus, ChevronRight2 } from 'pixelarticons/react'

export const Route = createFileRoute('/')({
  component: Home
})

function Home() {
  return (
    <Panel>
      <Link to="/new" className={buttonVariants()}>
        <Plus className="size-6" /> Criar nova sala
      </Link>

      <section>
        <h2 className="mb-3 text-center">Entrar com código</h2>

        <form className="flex gap-3">
          <Input className="uppercase" placeholder="123456" />

          <Button type="submit" className="p-0">
            <ChevronRight2 className="size-12" />
            <span className="sr-only">Entrar</span>
          </Button>
        </form>
      </section>
    </Panel>
  )
}
