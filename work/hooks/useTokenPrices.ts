'use client'

import { useState, useEffect } from 'react'
import { useChainId } from 'wagmi'

const COINGECKO_IDS: Record<number, string> = {
    1: 'ethereum',
    137: 'polygon-ecosystem-token',
    42161: 'ethereum', // Arb uses ETH
    10: 'ethereum',    // Opt uses ETH
    56: 'binancecoin',
    11155111: 'ethereum'
}

export function useTokenPrices() {
    const chainId = useChainId()
    const [prices, setPrices] = useState<{ [key: string]: number }>({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchPrices = async () => {
            setIsLoading(true)
            try {
                // Fetch Native, USDC, USDT
                const nativeId = COINGECKO_IDS[chainId] || 'ethereum'
                const response = await fetch(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${nativeId},usd-coin,tether&vs_currencies=usd`
                )
                const data = await response.json()

                setPrices({
                    NATIVE: data[nativeId]?.usd || 0,
                    USDC: data['usd-coin']?.usd || 1, // Stablecoin fallback
                    USDT: data['tether']?.usd || 1
                })
            } catch (error) {
                console.error("Failed to fetch prices", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchPrices()
        // Poll every 60s
        const interval = setInterval(fetchPrices, 60000)
        return () => clearInterval(interval)
    }, [chainId])

    return { prices, isLoading }
}
