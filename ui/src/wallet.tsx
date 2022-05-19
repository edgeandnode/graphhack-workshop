import '@rainbow-me/rainbowkit/styles.css'

import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  lightTheme,
  midnightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit'
import { ReactNode, useEffect, useState } from 'react'
import { useThemeUI } from 'theme-ui'
import { chain, createClient, WagmiProvider } from 'wagmi'

import { theme, useColorMode } from './theme'

const { chains, provider } = configureChains(
  [chain.rinkeby],
  [apiProvider.infura(process.env.INFURA_KEY), apiProvider.fallback()],
)

const { connectors } = getDefaultWallets({
  appName: 'Graphhack Workshop',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

const rainbowKitThemes = {
  light: lightTheme({
    accentColor: theme.colors.primary.__default,
    accentColorForeground: theme.colors.background.__default,
  }),
  dark: midnightTheme({
    accentColor: theme.colors.primary.__default,
    accentColorForeground: theme.colors.background.__default,
  }),
}

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const colorMode = useColorMode()

  return (
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={rainbowKitThemes[colorMode]}>
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  )
}

export { ConnectButton } from '@rainbow-me/rainbowkit'
