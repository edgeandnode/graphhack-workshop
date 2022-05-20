import '../src/global.css'

import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'theme-ui'

import { theme } from '../src/theme'
import { ConnectButton, WalletProvider } from '../src/wallet'

const queryClient = new QueryClient({
  defaultOptions: { queries: { keepPreviousData: true } },
})

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <WalletProvider>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </WalletProvider>
      <Footer />
    </ThemeProvider>
  )
}

function Footer() {
  return <footer sx={{ height: '8rem' }} />
}
