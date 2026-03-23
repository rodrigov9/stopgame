import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { tv, type VariantProps } from 'tailwind-variants'
import { resolveTv } from '@/utils/resolve-tv'

export const buttonVariants = tv({
  base: 'flex items-center justify-center gap-3',
  variants: {
    variant: {
      default:
        'bg-yellow p-3 text-black shadow-button transition-all outline-none focus-visible:translate-1 focus-visible:shadow-button-active not-disabled:active:translate-1 not-disabled:active:shadow-button-active disabled:opacity-50 not-disabled:data-active:translate-1 not-disabled:data-active:shadow-button-active',
      link: 'w-fit decoration-2 outline-none hover:underline focus-visible:underline'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants>

export function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      className={resolveTv(buttonVariants, { variant, className })}
      {...props}
    />
  )
}
