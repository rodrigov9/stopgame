import { lazy } from 'react'
import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from './form-context'

const Input = lazy(() => import('@/components/tanstack-form/input'))
const Slider = lazy(() => import('@/components/tanstack-form/slider'))
const Switch = lazy(() => import('@/components/tanstack-form/switch'))
const AvatarSelector = lazy(
  () => import('@/components/tanstack-form/avatar-selector')
)

const SubmitButton = lazy(
  () => import('@/components/tanstack-form/submit-button')
)

export const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldComponents: {
    Input,
    Slider,
    Switch,
    AvatarSelector
  },
  formComponents: {
    SubmitButton
  },
  fieldContext,
  formContext
})
