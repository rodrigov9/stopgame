import { Slider, type SliderProps } from '../slider'
import { useFieldContext } from '@/hooks/form-context'

export default function TanstackFormSlider(props: SliderProps) {
  const field = useFieldContext<number>()

  return (
    <Slider
      value={field.state.value}
      onValueChange={value => field.handleChange(Number(value))}
      onBlur={field.handleBlur}
      {...props}
    />
  )
}
