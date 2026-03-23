import type { ComponentProps } from 'react'
import { cn } from 'tailwind-variants'

type SpinnerProps = Omit<ComponentProps<'div'>, 'children'> & {
  alt?: string
}

export function Spinner({
  className,
  alt = 'A carregar...',
  ...props
}: SpinnerProps) {
  return (
    <div
      className={cn(
        'size-12 bg-current mask-(--spinner) mask-cover',
        className
      )}
      {...props}
    >
      <span className="sr-only">{alt}</span>
    </div>
  )
}
