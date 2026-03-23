import { Input as InputPrimitive } from '@base-ui/react'
import { cn } from 'tailwind-variants'

export type InputProps = InputPrimitive.Props

export function Input({ className, ...props }: InputProps) {
  return (
    <InputPrimitive
      className={cn(
        'w-full border-4 border-white bg-black p-2 text-sm placeholder:text-muted',
        className
      )}
      {...props}
    />
  )
}
