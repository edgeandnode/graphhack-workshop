import { keyframes } from '@emotion/react'
import NextLink from 'next/link'

const pointLeft = keyframes({
  '0%': { transform: 'translateX(0)' },
  '25%': { transform: 'translateX(-0.125rem)' },
  '100%': { transform: 'translateX(0)' },
})

export function BackToHomeLink() {
  return (
    <NextLink href="/">
      <a
        sx={{
          cursor: 'pointer',
          color: 'neutral.32',
          transition: '100ms linear',
          ':hover, :focus-visible': { color: 'neutral.88', animation: `1s ease-out ${pointLeft}` },
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          sx={{ size: '1.5rem' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
      </a>
    </NextLink>
  )
}
