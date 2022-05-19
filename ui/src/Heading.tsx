import { ComponentPropsWithoutRef } from 'react'
import { ThemeUICSSObject } from 'theme-ui'

export interface HeadingProps extends ComponentPropsWithoutRef<'h1'> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const headingStyles: ThemeUICSSObject = { letterSpacing: '-0.8px', fontSize: 'xxl', fontWeight: 700 }

export function Heading({ as: Root = 'h1', ...rest }: HeadingProps) {
  return <Root sx={headingStyles} {...rest} />
}
