import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Header } from '@/components/header'

export const Route = createRootRoute({
  component: RootLayout
})

function RootLayout() {
  return (
    <>
      <div className="flex h-dvh items-center justify-center p-4 sm:p-8">
        <Header />

        <main className="flex w-full flex-col gap-12 overflow-auto border-4 border-magenta bg-black/60 p-8 shadow-panel sm:w-auto sm:min-w-md">
          <Outlet />
        </main>
      </div>

      <TanStackRouterDevtools />
    </>
  )
}
