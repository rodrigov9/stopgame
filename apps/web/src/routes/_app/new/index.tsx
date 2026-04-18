import { createFileRoute } from '@tanstack/react-router'
import { useStore } from '@tanstack/react-form'
import { useAppForm } from '@/hooks/form'
import { formOpts } from './-form-options'
import { createRoom } from './-create-room'

import { steps } from './-steps'

import { Panel } from '@/components/panel'
import { Button } from '@/components/button'
import { Spinner } from '@/components/spinner'
import { ChevronLeft, ChevronRight } from 'pixelarticons/react'

export const Route = createFileRoute('/_app/new/')({
  component: NewRoom
})

function NewRoom() {
  const navigate = Route.useNavigate()

  const form = useAppForm({
    ...formOpts,
    validators: {
      onChange: ({ value, formApi }) =>
        formApi.parseValuesWithSchema(
          steps[value.currentStep].validator as never
        )
    },
    onSubmit: async ({ value, formApi }) => {
      if (value.currentStep < steps.length - 1)
        return formApi.setFieldValue('currentStep', prev => prev + 1)

      const code = await createRoom(value)

      await navigate({
        to: '/play/$id',
        params: { id: code }
      })
    }
  })

  const isSubmitting = useStore(form.store, state => state.isSubmitting)

  const stepIndex = useStore(form.store, state => state.values.currentStep)
  const step = steps[stepIndex]
  const isFirstStep = stepIndex === 0
  const isLastStep = stepIndex === steps.length - 1

  if (isSubmitting)
    return (
      <Panel className="w-xl">
        <Spinner className="self-center" alt="A criar sala..." />
      </Panel>
    )

  function previousStep() {
    if (stepIndex > 0) form.setFieldValue('currentStep', prev => prev - 1)
  }

  return (
    <Panel className="w-xl">
      <form
        className="flex flex-col gap-6"
        onSubmit={e => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <h2 className="text-center text-2xl text-yellow text-shadow-title">
          {step.title}
        </h2>

        <step.component form={form} />

        <footer className="mt-6 flex w-full">
          {!isFirstStep && (
            <Button onClick={previousStep}>
              <ChevronLeft className="size-6" />
              <span className="sr-only">
                Voltar para {steps[stepIndex - 1].title}
              </span>
            </Button>
          )}

          <form.AppForm>
            <form.SubmitButton className="ml-auto">
              {isLastStep ? (
                'Criar sala'
              ) : (
                <>
                  <ChevronRight className="size-6" />
                  <span className="sr-only">
                    Avançar para {steps[stepIndex + 1].title}
                  </span>
                </>
              )}
            </form.SubmitButton>
          </form.AppForm>
        </footer>
      </form>
    </Panel>
  )
}
