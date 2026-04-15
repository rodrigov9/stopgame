import { useFormContext } from '@/hooks/form-context'
import { Button, type ButtonProps } from '@/components/button'

export default function SubmitButton(props: ButtonProps) {
  const form = useFormContext()

  return (
    <form.Subscribe selector={state => state.isSubmitting || !state.canSubmit}>
      {disabled => (
        <Button
          type="submit"
          {...props}
          disabled={disabled || props.disabled}
        />
      )}
    </form.Subscribe>
  )
}
