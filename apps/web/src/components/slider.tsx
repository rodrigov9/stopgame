import { Slider as SliderPrimitive } from '@base-ui/react/slider'
import { cn } from 'tailwind-variants'

export type SliderProps = Omit<SliderPrimitive.Root.Props, 'format'> & {
  format?: (value: number) => string
}

export function Slider({ className, format, ...props }: SliderProps) {
  const min = props.min ?? 0
  const max = props.max ?? 100

  return (
    <SliderPrimitive.Root
      className={cn('flex flex-col gap-3', className)}
      {...props}
    >
      <SliderPrimitive.Value className="text-center text-sm text-yellow">
        {format && ((_, [value]) => format(value))}
      </SliderPrimitive.Value>

      <SliderPrimitive.Control
        className={
          'relative flex touch-none items-center select-none data-dragging:cursor-grabbing'
        }
      >
        <SliderPrimitive.Track className="relative h-3 grow bg-muted">
          <SliderPrimitive.Indicator className="bg-magenta" />
          <SliderPrimitive.Thumb className="h-6 w-3 bg-white not-data-dragging:cursor-grab has-focus-visible:scale-125" />
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>

      <div className="flex justify-between">
        <span className="text-sm text-muted">{format ? format(min) : min}</span>
        <span className="text-sm text-muted">{format ? format(max) : max}</span>
      </div>
    </SliderPrimitive.Root>
  )
}
