import { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import { cn } from 'tailwind-variants'

export type SwitchProps = SwitchPrimitive.Root.Props

export function Switch({ className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        'flex h-6 w-12 cursor-pointer justify-start bg-muted p-1 data-checked:justify-end data-checked:bg-magenta',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb className="aspect-square h-full bg-white" />
    </SwitchPrimitive.Root>
  )
}
