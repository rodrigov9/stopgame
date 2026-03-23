import { useState } from 'react'
import { Field } from '@base-ui/react'

import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { Plus } from 'pixelarticons/react'

import { Category } from './category'

type CategoryInputProps = {
  value: string[]
  addCategory: (category: string) => void
  removeCategory: (index: number) => void
}

export function CategoryInput({
  value,
  addCategory,
  removeCategory
}: CategoryInputProps) {
  const [newCategory, setNewCategory] = useState('')

  const validCategory =
    newCategory.trim().length > 0 &&
    value.every(c => c.toLowerCase() !== newCategory.trim().toLowerCase())

  function handleSubmit() {
    if (validCategory) {
      addCategory(newCategory.trim())
      setNewCategory('')
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSubmit()
    }
  }

  return (
    <>
      <div className="flex gap-3">
        <Field.Root className="flex-1">
          <Field.Label className="sr-only">Nome da nova categoria</Field.Label>
          <Input
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={20}
            className="h-full"
          />
        </Field.Root>

        <Button disabled={!validCategory} onClick={handleSubmit}>
          <span className="sr-only">Adicionar categoria</span>
          <Plus className="size-6" />
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {value.map((category, index) => (
          <Category onClick={() => removeCategory(index)} key={category}>
            {category}
          </Category>
        ))}
      </div>

      <span className="text-center text-xs text-white/75">
        Clica numa categoria para a remover
      </span>
    </>
  )
}
