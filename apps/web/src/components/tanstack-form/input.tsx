import { Input, type InputProps } from '../input'
import { useFieldContext } from '@/hooks/form-context'

export default function TanstackFormInput(props: InputProps) {
  const field = useFieldContext<string>()

  return (
    <Input
      value={field.state.value}
      onChange={e => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
      {...props}
    />
  )
}
