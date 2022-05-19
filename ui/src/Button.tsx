import { ComponentPropsWithoutRef } from 'react'

export function Button(props: ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      sx={{
        backgroundColor: 'primary.64',
        color: 'white',
        borderRadius: '4px',
        p: '1rem 2rem',
        fontSize: '0.875rem',
        ':hover, :focus-visible': {
          backgroundColor: 'primary',
        },
      }}
      {...props}
    />
  )
}
