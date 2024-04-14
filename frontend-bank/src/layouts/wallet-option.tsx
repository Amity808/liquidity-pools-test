import * as React from 'react';
import { Connector, useConnect, useAccount, useDisconnect } from 'wagmi';
import { useEffect, useState, type PropsWithChildren } from "react";
import PreLoading from '@/components/PreLoading';


const WalletOptions = ({ children }: PropsWithChildren) => {
  const [isClient, setIsClient] = useState(false);
  const { isConnecting, isDisconnected, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect()
  const [toggle, setToggle] = useState(false);


  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading indicator
  }

  if (isConnecting) {
    return <PreLoading />
  }

  if (isDisconnected) {
    return (

      <div className={`flex flex-col justify-center items-center`}>
        <button
          id="modalBioDate"
          type="button"
          data-bs-toggle="modalBioData"
          data-bs-target="#modalCenter"
          className="py-2 px-3 rounded bg-black text-white "
          onClick={() => setToggle(true)}
        >
          Connect Wallet
        </button>
        {toggle && (


          <div className=" bg-black rounded-2xl my-10 text-white p-5 ">

            <button type="button" onClick={() => setToggle(false)} className=' text-white'>
              X
            </button>

            {connectors.map((connector) => (
              <div key={connector.uid} className='flex mb-6'>
                <button onClick={() => connect({ connector })} className='py-2 px-3 rounded bg-white text-white my-5'>
                  {connector.name}
                </button>
              </div>
            ))}

          </div>


        )}
      </div>
    )

  }

  // if (isConnected) {
  // return (
  //   <button onClick={() => disconnect()}>
  //   Disconnect
  // </button>
  // )

  return <>{children}</>;
}



export default WalletOptions;
