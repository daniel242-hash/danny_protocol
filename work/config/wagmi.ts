import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, polygon, arbitrum, optimism, bsc } from 'wagmi/chains'
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors'

const projectId = '3a8170812b534d0ff9d794f19a901d64'

export const config = createConfig({
  chains: [mainnet, polygon, arbitrum, optimism, bsc, sepolia],
  connectors: [
    walletConnect({ projectId, showQrModal: true }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [bsc.id]: http(),
  },
})
