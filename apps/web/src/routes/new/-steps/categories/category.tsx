import type { ComponentProps } from 'react'
import { cn } from 'tailwind-variants'

export function Category({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      className={cn(
        'bg-cyan px-4 py-2 text-sm/[1] text-black badge',
        className
      )}
      {...props}
    />
  )
}
