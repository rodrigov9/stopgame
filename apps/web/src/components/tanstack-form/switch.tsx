import { Switch, type SwitchProps } from '../switch'
import { useFieldContext } from '@/hooks/form-context'

export default function TanstackFormSwitch(props: SwitchProps) {
  const field = useFieldContext<boolean>()

  return (
    <Switch
      checked={field.state.value}
      onCheckedChange={field.handleChange}
      onBlur={field.handleBlur}
      {...props}
    />
  )
}
