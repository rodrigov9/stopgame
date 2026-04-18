import { useState, type SubmitEvent } from 'react'
import {
  useNavigate,
  useRouter,
  type NavigateOptions
} from '@tanstack/react-router'

import { Field } from '@base-ui/react'
import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { Spinner } from '@/components/spinner'
import { ChevronRight2 } from 'pixelarticons/react'

export function JoinForm() {
  const router = useRouter()
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault()

    setIsPending(true)
    setIsInvalid(false)

    const page: NavigateOptions = {
      to: '/join/$id',
      params: {
        id: code
      }
    }

    const matches = await router.preloadRoute(page)

    if (matches) {
      navigate(page)
    } else {
      setIsInvalid(true)
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

          <Button type="submit" className="p-0" disabled={isPending}>
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
