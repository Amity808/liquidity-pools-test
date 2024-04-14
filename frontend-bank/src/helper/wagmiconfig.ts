import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, celoAlfajores } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = "Admin"

export const config = createConfig({
  chains: [mainnet, sepolia, celoAlfajores],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [celoAlfajores.id]: http(),
  },
})