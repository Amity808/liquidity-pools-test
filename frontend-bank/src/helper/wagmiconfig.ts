import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, celoAlfajores } from 'wagmi/chains'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors'

const projectId = "a3ee5bcc5e40e2e76756a65955636634"

export const config = createConfig({
  chains: [mainnet, sepolia, celoAlfajores],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    // metaMask(),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [celoAlfajores.id]: http(),
  },
})