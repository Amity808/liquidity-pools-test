
import React, { ReactElement, useState, useEffect } from 'react'
import WagmiWrapperLayout from '@/layouts/Wagmi'
import dynamic from 'next/dynamic'
import WalletOptions from '@/layouts/wallet-option'
import { useDisconnect } from "wagmi"
import { useWriteContract, useSimulateContract, useAccount, useReadContract } from "wagmi";
import { parseEther, formatEther } from 'viem'
import { ethers } from "ethers"
import BankAbi from "@/ccontractabi/Bankabi.json"
import LoadingIcon from "@/components/LoadingIcon"

// const WalletOption = dynamic(() => import('@/layouts/wallet-option'), {

// })

const Dashboard = (): JSX.Element => {

    const { disconnect } = useDisconnect()
    const { address } = useAccount()

    const [valueinput, setValueInput] = useState('')
    const [loading, setloading] = useState(false)
    const [messages, setMessages] = useState('')
    const [withMesssage, setWithMesssage] = useState('')

    const { data: simulateDeposit } = useSimulateContract({
        abi: BankAbi.abi,
        address: BankAbi.address as `0x${string}`,
        functionName: "deposit",
        args: [],
        value: parseEther(valueinput),
        // account: 
    });
    const { data: simulateWithdraw } = useSimulateContract({
        abi: BankAbi.abi,
        address: BankAbi.address as `0x${string}`,
        functionName: "withdraw",
        args: [],

        // account: 
    });
    const { writeContractAsync } = useWriteContract();
    const { data: readBalance } = useReadContract({
        abi: BankAbi.abi,
        address: BankAbi.address as `0x${string}`,
        functionName: 'balance',
        args: [address as `0x${string}`]
    })

    const withdraw = async () => {
        setloading(true)
        setWithMesssage("Withdrawing funds")
        try {
            await writeContractAsync(simulateWithdraw!.request)
            setloading(false)
            setWithMesssage("")
        } catch (error) {
            setloading(false)
            setWithMesssage("")
            console.log(error)
        }
    }

    const handleDeposit = async (e: any) => {
        e.preventDefault();
        setloading(true)
        setMessages("Depositing funds")
        try {
            await writeContractAsync(simulateDeposit!.request)
            setloading(false)
            setMessages("")
        } catch (error) {
            setloading(false)
            setMessages("")
            console.log(error);

        }
    }

    const formatBalance = ethers.formatEther(readBalance?.toString() || "0")

    return (
        <>
            <div className=' md:px-2 sm:px-2 max-sm:px-2 '>
                {/* <Header /> */}
                <p>Bank</p>
                <p>Conected to {address}</p>
                <button className=" py-2 px-3 rounded  bg-red-500 text-white " onClick={() => disconnect()}>
                    Disconnect
                </button>
            </div>
            <main>
        {/* <ConnectButton /> */}
        <p style={{ color: "green"}}>{messages}</p>
        <form onSubmit={handleDeposit} >

        <input type="number" placeholder='input amount' className=" w-[400px] h-10 border-2 rounded-sm my-4" value={valueinput} onChange={(e) => setValueInput(e.target.value)} />
        <button className="py-2 px-3 rounded bg-black text-white" type="submit" disabled={loading} style={{ display: "flex"}}>
        {loading ? (<>
          <LoadingIcon /> Deposit</>) : "Deposit" } 
        </button>
        </form>

          <div className=' mt-4'>
            Balance: {formatBalance} ether
          </div>
        <div className="mt-4">
          <p style={{ color: "green"}}>{withMesssage}</p>
          <button onClick={withdraw} disabled={loading}
          className="py-2 px-3 rounded bg-black text-white"
          >Withdraw
          </button>
        </div>

      </main>

        </>
    )
}
Dashboard.getLayout = function getLayout(page: ReactElement) {
    return (
        <WagmiWrapperLayout>
            <WalletOptions>
                {page}
            </WalletOptions>
        </WagmiWrapperLayout>
    )
}

export default Dashboard