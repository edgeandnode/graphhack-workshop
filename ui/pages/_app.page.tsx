import '../src/global.css'

import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ThemeProvider } from 'theme-ui'

import { BackToHomeLink } from '../src/BackToHomeLink'
import { theme } from '../src/theme'
import { ConnectButton, WalletProvider } from '../src/wallet'

const queryClient = new QueryClient({
  defaultOptions: { queries: { keepPreviousData: true } },
})

export default function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <WalletProvider>
        <QueryClientProvider client={queryClient}>
          <header
            sx={{
              display: 'flex',
              pt: '1rem',
              px: '1rem',
              pb: ['1rem', '2rem', '4rem'],
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: '$container',
              mx: 'auto',
            }}
          >
            {router.pathname === '/' ? <div /> : <BackToHomeLink />}
            <ConnectButton />
          </header>

          <Component {...pageProps} />

          <ReactQueryDevtools />
        </QueryClientProvider>
      </WalletProvider>
      <Footer />
    </ThemeProvider>
  )
}

function Footer() {
  return <footer sx={{ height: '8rem' }} />
}
