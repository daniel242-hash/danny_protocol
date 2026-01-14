'use client'
import { useState } from 'react'

import { useAccount } from 'wagmi'
import { toast } from 'sonner'

export function useStaking() {
    const [stakedBalance, setStakedBalance] = useState('100.00')
    const [rewards, setRewards] = useState('5.42')
    const [isLoading, setIsLoading] = useState(false)
    const { isConnected } = useAccount()

    const checkConnection = () => {
        if (!isConnected) {
            toast.error("Please connect your wallet first")
            return false
        }
        return true
    }

    const stake = async (amount: string) => {
        if (!checkConnection()) return
        setIsLoading(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500))
            setStakedBalance(prev => (parseFloat(prev) + parseFloat(amount)).toFixed(2))
            toast.success("Staked successfully", { description: `Deposited ${amount} ETH` })
        } catch (e) {
            toast.error("Staking failed")
        } finally {
            setIsLoading(false)
        }
    }

    const unstake = async (amount: string) => {
        if (!checkConnection()) return
        setIsLoading(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 1500))
            setStakedBalance(prev => (parseFloat(prev) - parseFloat(amount)).toFixed(2))
            toast.success("Unstaked successfully", { description: `Withdrew ${amount} ETH` })
        } catch (e) {
            toast.error("Unstaking failed")
        } finally {
            setIsLoading(false)
        }
    }

    const claim = async () => {
        if (!checkConnection()) return
        setIsLoading(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            setRewards('0.00')
            toast.success("Rewards claimed", { description: "You have claimed your yield" })
        } catch (e) {
            toast.error("Claim failed")
        } finally {
            setIsLoading(false)
        }
    }

    return {
        stakedBalance,
        rewards,
        isLoading,
        stake,
        unstake,
        claim
    }
}
