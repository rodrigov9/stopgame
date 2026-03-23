import type { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'

const separatorVariants = tv({
  variants: {
    orientation: {
      horizontal: '',
      vertical: ''
    },
    hasChildren: {
      true: 'flex items-center gap-3 before:bg-white after:bg-white',
      false: 'bg-white'
    }
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      hasChildren: false,
      class: 'h-0.5 w-full'
    },
    {
      orientation: 'horizontal',
      hasChildren: true,
      class: 'before:h-0.5 before:w-full after:h-0.5 after:w-full'
    },
    {
      orientation: 'vertical',
      hasChildren: false,
      class: 'h-full w-0.5'
    },
    {
      orientation: 'vertical',
      hasChildren: true,
      class: 'flex-col before:h-full before:w-0.5 after:h-full after:w-0.5'
    }
  ]
})

type SeparatorProps = {
  orientation?: 'horizontal' | 'vertical'
} & ComponentProps<'div'>

export function Separator({
  className,
  orientation = 'horizontal',
  ...props
}: SeparatorProps) {
  return (
    <div
      className={separatorVariants({
        orientation,
        hasChildren: !!props.children,
        className
      })}
      role="separator"
      aria-orientation={orientation}
      {...props}
    />
  )
}
