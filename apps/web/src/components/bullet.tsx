import { useRender } from '@base-ui/react'
import { cn } from 'tailwind-variants'

type BulletProps = useRender.ComponentProps<'span'>

export function Bullet({ className, render, ...props }: BulletProps) {
  const element = useRender({
    defaultTagName: 'span',
    render,
    props: {
      className: cn(
        'bg-cyan px-4 py-2 text-sm/[1] text-black badge',
        className
      ),
      ...props
    }
  })

  return element
}
