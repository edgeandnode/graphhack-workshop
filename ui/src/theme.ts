import { makeTheme } from '@theme-ui/css/utils'

export const theme = makeTheme({
  colors: {
    primary: '#03e',
    background: '#fff',
  },
  buttons: {
    primary: {
      cursor: 'pointer',
    },
  },
  layout: {
    container: {
      p: 3,
      maxWidth: '960px',
    },
  },
})
