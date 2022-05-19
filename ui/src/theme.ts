import { makeTheme } from '@theme-ui/css/utils'

export const theme = makeTheme({
  colors: {
    background: '#fff',
    primary: {
      64: 'rgba(111, 76, 255, 0.64)',
      88: 'rgba(111, 76, 255, 0.88)',
      __default: '#6F4CFF',
    },
    neutral: {
      32: 'rgba(9, 6, 16, 0.32)',
      64: 'rgba(9, 6, 16, 0.64)',
      88: 'rgba(9, 6, 16, 0.88)',
    },
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xxl: '2.25rem',
  },
  space: [],
  sizes: {
    $container: '1100px',
  },
})
