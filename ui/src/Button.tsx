import { ComponentPropsWithoutRef, ReactNode } from 'react'

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  icon?: ReactNode
}

export function Button({ children, icon, ...rest }: ButtonProps) {
  return (
    <button
      sx={{
        backgroundColor: 'primary.64',
        color: 'white',
        borderRadius: '4px',
        p: '1rem 2rem',
        fontSize: '0.875rem',
        fontWeight: 600,
        display: 'flex',
        flexDirection: 'row',
        gap: '0.25rem',
        alignItems: 'center',
        justifyContent: 'center',
        ':hover, :focus-visible': {
          backgroundColor: 'primary',
        },
        '> svg': icon && { ml: '-0.5rem' },
      }}
      {...rest}
    >
      {icon}
      {children}
    </button>
  )
}
