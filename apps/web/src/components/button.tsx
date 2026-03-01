import type { ComponentProps } from 'react'
import { cn } from '@/utils/cn'

export function Button({ className, ...props }: ComponentProps<'button'>) {
  return (
    <button
      className={cn(
        'flex items-center justify-center gap-3 bg-yellow p-3 text-black shadow-button transition-all active:translate-1 active:shadow-button-active',
        className
      )}
      {...props}
    />
  )
}
