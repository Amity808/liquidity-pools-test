import React, { useState, useEffect } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import BankAbi from "../contract/Bankabi.json"
import { parseEther, formatEther} from 'viem'
import { ethers } from "ethers"
import LoadingIcon from "../components/LoadingIcon";

import { useWriteContract, useSimulateContract, useAccount, useReadContract  } from "wagmi";

const Home: NextPage = () => {
  const [valueinput, setValueInput] = useState('')
  const [loading, setloading] = useState(false)
  const [messages, setMessages] = useState('')
  const [withMesssage, setWithMesssage] = useState('')

  const { address } = useAccount()

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
  const {data: readBalance } = useReadContract({
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
    <div className={styles.container}>
     

    <main>
      <ConnectButton />
      <p style={{ color: "green"}}>{messages}</p>
      <form onSubmit={handleDeposit}>

      <input type="text" value={valueinput} onChange={(e) => setValueInput(e.target.value)} placeholder="" />
      <button type="submit" disabled={loading} style={{ display: "flex"}}>
      {loading ? (<>
        <LoadingIcon /> Deposit</>) : "Deposit" } 
      </button>
      </form>

      <div>
        <p style={{ color: "green"}}>{withMesssage}</p>
        <button onClick={withdraw} disabled={loading}>Withdraw
        </button>
      </div>

      <div>
        Balance: {formatBalance} ether
      </div>
    </main>

    <footer className={styles.footer}>
      <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
      © 2024 QUICKGIG
      </a>
    </footer>
  </div>
  );
};

export default Home;
