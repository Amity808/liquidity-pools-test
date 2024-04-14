import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from "react"
import { config } from "@/helper/wagmiconfig"

const queryClient = new QueryClient()

const WagmiWrapperLayout = ({ children }: PropsWithChildren) => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}

export default WagmiWrapperLayout;

