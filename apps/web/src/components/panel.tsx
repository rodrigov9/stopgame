import type { ComponentProps } from 'react'
import { cn } from 'tailwind-variants'

export function Panel({
  className,
  children,
  ...props
}: ComponentProps<'main'>) {
  return (
    <main
      className={cn(
        'flex flex-col gap-12 border-4 border-magenta bg-black/60 p-8 shadow-panel not-sm:w-full',
        className
      )}
      {...props}
    >
      <h1 className="text-center text-5xl text-yellow text-shadow-title">
        STOP
      </h1>

      {children}
    </main>
  )
}
