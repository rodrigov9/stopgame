import type { VariantProps } from 'tailwind-variants'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function resolveTv<T extends (...args: any[]) => string, S>(
  tvFunction: T,
  props: VariantProps<T> & {
    className?: string | ((state: S) => string | undefined)
  }
) {
  const { className } = props

  if (typeof className === 'function') {
    return (state: S) => tvFunction({ ...props, className: className(state) })
  }

  return tvFunction(props)
}
