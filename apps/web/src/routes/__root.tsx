import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: RootLayout
})

function RootLayout() {
  return (
    <>
      <div className="flex h-dvh flex-col items-center justify-center p-4 sm:p-8">
        <Outlet />
      </div>

      <TanStackRouterDevtools />
    </>
  )
}
