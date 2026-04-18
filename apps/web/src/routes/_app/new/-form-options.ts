import { formOptions } from '@tanstack/react-form'
import type { FormValues } from './-steps/validators'

const defaultValues: FormValues = {
  currentStep: 0,
  gameOptions: {
    maxPlayers: 10,
    time: {
      enabled: false,
      value: 90
    },
    categories: [
      'Nomes',
      'Objetos',
      'TPC',
      'Comida',
      'Animais',
      'Marcas',
      'Profissões',
      'Famosos'
    ]
  },
  profile: {
    name: '',
    avatar: 0
  }
}

export const formOpts = formOptions({
  defaultValues
})
