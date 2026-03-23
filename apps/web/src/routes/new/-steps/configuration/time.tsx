import { Activity } from 'react'
import { withForm } from '@/hooks/form'
import { formOpts } from '../../-form-options'
import { formatTime } from '@/utils/format-time'

import { Field } from '@base-ui/react'
import { AlarmClock } from 'pixelarticons/react'

export const Time = withForm({
  ...formOpts,
  render: ({ form }) => (
    <div className="flex flex-col gap-3">
      <Field.Root className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
        <Field.Label className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
          <AlarmClock className="size-6" />
          STOP! automático
        </Field.Label>

        <form.AppField name="gameOptions.time.enabled">
          {field => <field.Switch />}
        </form.AppField>
      </Field.Root>

      <form.Subscribe selector={state => state.values.gameOptions.time.enabled}>
        {timeEnabled => (
          <Activity mode={timeEnabled ? 'visible' : 'hidden'}>
            <Field.Root>
              <Field.Label className="sr-only">
                Tempo do STOP automático
              </Field.Label>

              <form.AppField name="gameOptions.time.value">
                {field => (
                  <field.Slider
                    min={30}
                    max={5 * 60}
                    step={30}
                    format={formatTime}
                  />
                )}
              </form.AppField>
            </Field.Root>
          </Activity>
        )}
      </form.Subscribe>
    </div>
  )
})
