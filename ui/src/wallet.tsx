import '@rainbow-me/rainbowkit/styles.css'

import { apiProvider, configureChains, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'

import { chain, createClient, WagmiProvider } from 'wagmi'
import { ReactNode } from 'react'

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

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiProvider>
  )
}

export { ConnectButton } from '@rainbow-me/rainbowkit'
