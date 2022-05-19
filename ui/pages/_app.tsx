import '../src/global.css'

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'theme-ui'

import { theme } from '../src/theme'
import { ConnectButton, WalletProvider } from '../src/wallet'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <WalletProvider>
        <header
          sx={{
            display: 'flex',
            p: '1rem 1rem 0 1rem',
            justifyContent: 'flex-end',
            maxWidth: '$container',
            mx: 'auto',
          }}
        >
          <ConnectButton />
        </header>
        <Component {...pageProps} />
      </WalletProvider>
      <Footer />
    </ThemeProvider>
  )
}

function Footer() {
  return <footer sx={{ height: '8rem' }} />
}
