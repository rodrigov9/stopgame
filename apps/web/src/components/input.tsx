import type { ComponentProps } from 'react'
import { cn } from '@/utils/cn'

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return (
    <input
      className={cn(
        'w-full border-4 border-white bg-black p-2 text-sm placeholder:text-muted',
        className
      )}
      {...props}
    />
  )
}
