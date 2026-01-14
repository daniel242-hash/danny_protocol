'use client'
import { useState, useEffect } from 'react'
import { useAccount, useBalance, useChainId } from 'wagmi'
import { useTokenPrices } from './useTokenPrices'
import { CHAIN_TOKENS, TOKENS } from '@/config/tokens'
import { toast } from 'sonner'
import { formatUnits } from 'viem'

type TokenSymbol = 'NATIVE' | 'USDC' | 'USDT'
type SwapMode = 'EXACT_IN' | 'EXACT_OUT'

export function useSwap() {
    const { address, isConnected } = useAccount()
    const chainId = useChainId()
    const { prices } = useTokenPrices()

    const [inputValue, setInputValue] = useState('')
    const [mode, setMode] = useState<SwapMode>('EXACT_IN')

    const [payToken, setPayToken] = useState<TokenSymbol>('NATIVE')
    const [receiveToken, setReceiveToken] = useState<TokenSymbol>('USDC')
    const [isLoading, setIsLoading] = useState(false)

    const [amountIn, setAmountIn] = useState('')
    const [amountOut, setAmountOut] = useState('')

    const tokenAddress = (payToken === 'NATIVE' ? undefined : (CHAIN_TOKENS[chainId]?.[payToken] as `0x${string}`))
    const { data: balanceData } = useBalance({
        address,
        token: tokenAddress,
        query: { enabled: !!isConnected }
    } as any)
    const formattedBalance = balanceData ? formatUnits(balanceData.value, balanceData.decimals) : undefined

    useEffect(() => {
        if (!inputValue || !prices[payToken] || !prices[receiveToken]) {
            setAmountIn('')
            setAmountOut('')
            return
        }

        const priceIn = prices[payToken]
        const priceOut = prices[receiveToken]

        if (mode === 'EXACT_IN') {
            const valIn = parseFloat(inputValue)
            const valOut = (valIn * priceIn) / priceOut

            setAmountIn(inputValue)
            setAmountOut(valOut.toFixed(6))
        } else {
            const valOut = parseFloat(inputValue)
            const valIn = (valOut * priceOut) / priceIn

            setAmountOut(inputValue)
            setAmountIn(valIn.toFixed(6))
        }
    }, [inputValue, mode, payToken, receiveToken, prices])

    const swap = async () => {
        if (!isConnected) {
            toast.error("Please connect your wallet first")
            return
        }

        const parsedAmount = parseFloat(amountIn)
        if (!parsedAmount || parsedAmount <= 0) return

        if (formattedBalance && parsedAmount > parseFloat(formattedBalance)) {
            toast.error("Insufficient balance")
            return
        }

        setIsLoading(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            const currentNative = CHAIN_TOKENS[chainId]?.NATIVE_SYMBOL || 'ETH'
            const paySymbol = payToken === 'NATIVE' ? currentNative : payToken
            const receiveSymbol = receiveToken === 'NATIVE' ? currentNative : receiveToken

            toast.success("Swap successful", {
                description: `Swapped ${amountIn} ${paySymbol} for ${amountOut} ${receiveSymbol}`
            })
            setInputValue('')
            return true
        } catch (error) {
            toast.error("Swap failed", {
                description: "Transaction rejected or failed"
            })
            return false
        } finally {
            setIsLoading(false)
        }
    }

    return {
        inputValue,
        setInputValue,
        mode,
        setMode,
        amountIn,
        amountOut,
        payToken,
        setPayToken,
        receiveToken,
        setReceiveToken,
        isLoading,
        swap,
        balance: formattedBalance,
        symbol: balanceData?.symbol,
        prices
    }
}
