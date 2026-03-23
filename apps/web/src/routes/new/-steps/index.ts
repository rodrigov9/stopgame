import { NewRoomConfiguration } from './configuration'
import { NewRoomCategories } from './categories'
import { NewRoomProfile } from './profile'

import {
  configurationStepSchema,
  categoriesStepSchema,
  profileStepSchema
} from './validators'

export const steps = [
  {
    title: 'Configurações da sala',
    component: NewRoomConfiguration,
    validator: configurationStepSchema
  },
  {
    title: 'Categorias',
    component: NewRoomCategories,
    validator: categoriesStepSchema
  },
  {
    title: 'Perfil',
    component: NewRoomProfile,
    validator: profileStepSchema
  }
]
