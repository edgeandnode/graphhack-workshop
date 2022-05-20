import { makeTheme } from '@theme-ui/css/utils'
import { useEffect, useState } from 'react'
import { ThemeProvider, useThemeUI } from 'theme-ui'

const lightMode = {
  background: {
    __default: '#fff',
    card: '#fff',
    secondary: '#E5E5E5',
  },
  primary: {
    64: 'rgba(111, 76, 255, 0.64)',
    88: 'rgba(111, 76, 255, 0.88)',
    __default: '#6F4CFF',
  },
  neutral: {
    32: 'rgba(9, 6, 16, 0.32)',
    64: 'rgba(9, 6, 16, 0.64)',
    88: 'rgba(9, 6, 16, 0.88)',
    __default: 'rgb(9, 6, 16)',
  },
}

const darkMode: typeof lightMode = {
  background: {
    __default: '#0f0f0f',
    card: '#000',
    secondary: '#0c0c0c',
  },
  primary: lightMode.primary,
  neutral: {
    32: 'rgba(235, 240, 255, 0.32)',
    64: 'rgba(235, 240, 255, 0.64)',
    88: 'rgba(235, 240, 255, 0.88)',
    __default: 'rgb(235, 240, 255)',
  },
}

export type ColorModeName = 'light' | 'dark'
export const initialColorModeName: ColorModeName = 'light'

export const theme = makeTheme({
  config: {
    useColorSchemeMediaQuery: true,
    useLocalStorage: false,
    initialColorModeName,
  },
  colors: {
    ...lightMode,
    modes: { dark: darkMode },
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
    $container: '1280px',
  },
  styles: {
    /* styles added to `body` by theme-ui */
    root: { color: 'neutral' },
  },
})

/**
 * @returns color scheme preferred by the user or `'light'` during SSR
 */
export function useColorMode() {
  const colorMode = useThemeUI().colorMode as ColorModeName | undefined
  const [state, setState] = useState<ColorModeName | undefined>(undefined)

  // https://github.com/pacocoursey/next-themes#avoid-hydration-mismatch
  // color mode can't be read during SSR, so we postpone it with useEffect
  useEffect(() => {
    setState(colorMode)
  }, [colorMode])

  return state || initialColorModeName
}
