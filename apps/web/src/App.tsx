import { Header } from '@/components/header'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Plus, ChevronRight2 } from 'pixelarticons/react'

function App() {
  return (
    <div className="flex h-dvh items-center justify-center p-4 sm:p-8">
      <Header />

      <main className="flex w-full flex-col gap-12 overflow-auto border-4 border-magenta bg-black/60 p-8 shadow-panel sm:w-auto sm:min-w-md">
        <h1 className="text-center text-5xl text-yellow text-shadow-magenta text-shadow-title">
          STOP
        </h1>

        <Button>
          <Plus className="size-6" /> Criar nova sala
        </Button>

        <section>
          <h2 className="mb-3 text-center">Entrar com código</h2>

          <form className="flex gap-3">
            <Input className="uppercase" placeholder="123456" />

            <Button type="submit" className="p-0">
              <ChevronRight2 className="size-12" />
            </Button>
          </form>
        </section>
      </main>
    </div>
  )
}

export default App
