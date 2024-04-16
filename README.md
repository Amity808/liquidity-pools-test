## Intrduction 
 
We implemented the new Wagmi library from [https://wagmi.sh/core/installation](https://wagmi.sh/core/installation )
User can connect to three EVM networks which are the mainnet(Ethereum), sepolia(Ethereum), and celoAlfajores.

Wallet can be connected through MetaMask, CoinbaseWallet, WalletConnect and Injected network.

##  To set up the wallet connection 


** We setup the wagmi config to specify the configuration wallets we want to connect connect. **

 ### We set
    - Injected wallet - To prompt any injected wallet to connect
    - WalletConnect
    - CoinbaseWallet
    - MetaMask

    <img src="wagmiconfig.png" alt="wagmiconfig" width="200"/>





### We stup a wagmi wrapper layout to wrapped every
    
    <img src="wrapper.png" alt="wagmiconfig" width="200"/>


## Getting Started

First, run the development server:

```
cd frontend-bank 
```

``` 
yarn  
```


```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

You can find the contract inside the cntract folder

```
cd contract
```





Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
