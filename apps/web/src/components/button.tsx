import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { tv, type VariantProps } from 'tailwind-variants'
import { resolveTv } from '@/utils/resolve-tv'

export const buttonVariants = tv({
  base: 'flex items-center justify-center gap-3',
  variants: {
    variant: {
      default:
        'bg-yellow p-3 text-black shadow-button transition-all outline-none focus-visible:translate-1 focus-visible:shadow-button-active active:translate-1 active:shadow-button-active data-active:translate-1 data-active:shadow-button-active',
      link: 'w-fit decoration-2 outline-none hover:underline focus-visible:underline'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
})

export function Button({
  className,
  variant,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      className={resolveTv(buttonVariants, { variant, className })}
      {...props}
    />
  )
}
