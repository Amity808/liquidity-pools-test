import * as React from 'react';
import { Connector, useConnect, useAccount, useDisconnect } from 'wagmi';
import { useEffect, useState, type PropsWithChildren } from "react";

const WalletOptions = ({ children }: PropsWithChildren) => {
  const [isClient, setIsClient] = useState(false);
  const { isConnecting, isDisconnected, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect()

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading indicator
  }

  if (isDisconnected) {
    return connectors.map((connector) => (
      <div key={connector.uid}>
        <button onClick={() => connect({ connector })}>
          {connector.name}
        </button>
      </div>
    ));
  }

  if (isConnected) {
    // return (
    //   <button onClick={() => disconnect()}>
    //   Disconnect
    // </button>
    // )

    return <>{children}</>;
  }

};

export default WalletOptions;
