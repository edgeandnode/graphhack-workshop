import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'theme-ui'

import { theme } from '../src/theme'
import { WalletProvider } from '../src/wallet'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <WalletProvider>
        <Component {...pageProps} />
      </WalletProvider>
    </ThemeProvider>
  )
}
