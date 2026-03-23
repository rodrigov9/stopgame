import { useState, type SubmitEvent } from 'react'
import { useNavigate } from '@tanstack/react-router'

import { Field } from '@base-ui/react'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { Spinner } from '@/components/spinner'
import { ChevronRight2 } from 'pixelarticons/react'

export function JoinForm() {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault()

    setIsPending(true)
    setIsInvalid(false)

    try {
      // TODO: Check if the room exists before navigating
      await new Promise(resolve => setTimeout(resolve, 1000))
      if (code.length !== 6) throw new Error('Invalid code')

      navigate({
        to: '/join/$id',
        params: {
          id: code
        }
      })
    } catch {
      setIsInvalid(true)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field.Root>
        <Field.Label className="mb-3 block text-center">
          Entrar com código
        </Field.Label>

        <div className="flex gap-3">
          <Input
            value={code}
            onChange={e =>
              setCode(e.currentTarget.value.replace(/\s/g, '').toUpperCase())
            }
            placeholder="123456"
            required
            autoComplete="off"
            spellCheck={false}
          />

          <Button type="submit" className="p-0">
            {isPending ? (
              <Spinner className="m-3 size-6" />
            ) : (
              <ChevronRight2 className="size-12" />
            )}
            <span className="sr-only">Entrar</span>
          </Button>
        </div>
      </Field.Root>

      {isInvalid && (
        <span role="alert" className="mt-3 block text-center text-red">
          Código inválido
        </span>
      )}
    </form>
  )
}
