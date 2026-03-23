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

        <Outlet />
      </div>

      <TanStackRouterDevtools />
    </>
  )
}
