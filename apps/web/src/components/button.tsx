import type { ComponentProps } from 'react'
import * as Slot from '@radix-ui/react-slot'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'flex items-center justify-center gap-3',
  variants: {
    variant: {
      default:
        'bg-yellow p-3 text-black shadow-button transition-all active:translate-1 active:shadow-button-active',
      link: 'w-fit decoration-2 hover:underline'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export function Button({ className, variant, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'

  return <Comp className={buttonVariants({ variant, className })} {...props} />
}
