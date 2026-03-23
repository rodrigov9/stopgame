import { avatars } from '@/assets/avatars'
import { type ComponentProps } from 'react'

type AvatarProps = ComponentProps<'svg'> & {
  src: string | number
}

export function Avatar({ src, ...props }: AvatarProps) {
  const avatarUrl =
    typeof src === 'number'
      ? avatars[src]?.src
      : (avatars.find(avatar => avatar.slug === src)?.src ?? src)

  return (
    <svg width={32} height={32} viewBox="0 0 32 32" {...props}>
      <defs>
        <clipPath id="avatar-mask">
          <path d="M27 1H29V2H30V3H31V5H32V27H31V29H30V30H29V31H27V32H5V31H3V30H2V29H1V27H0V5H1V3H2V2H3V1H5V0H27V1Z" />
        </clipPath>
      </defs>

      <image
        href={avatarUrl}
        x={0}
        y={0}
        width={32}
        height={32}
        clipPath="url(#avatar-mask)"
      />
    </svg>
  )
}
