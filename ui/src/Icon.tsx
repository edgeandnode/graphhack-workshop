import { SVGProps } from 'react'

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: string | number
}

export function Icon({ size, children, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} {...rest}>
      {children}
    </svg>
  )
}
