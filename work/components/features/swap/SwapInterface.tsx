'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useSwap } from '@/hooks/useSwap'
import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import { CHAIN_TOKENS } from '@/config/tokens'
import { useState, useEffect } from 'react'

export function SwapInterface() {
    const {
        inputValue, setInputValue, mode, setMode, amountIn, amountOut,
        isLoading, swap,
        payToken, setPayToken, receiveToken, setReceiveToken,
        balance, prices
    } = useSwap()

    const { isConnected } = useAccount()
    const chainId = useChainId()
    const { switchChain } = useSwitchChain()

    const [isInverted, setIsInverted] = useState(false)
    const currentNative = CHAIN_TOKENS[chainId]?.NATIVE_SYMBOL || 'ETH'

    useEffect(() => {
        if (isInverted) {
            setPayToken('USDC')
            setReceiveToken('NATIVE')
        } else {
            setPayToken('NATIVE')
            setReceiveToken('USDC')
        }
    }, [isInverted, setPayToken, setReceiveToken])

    const payOptions = [
        { label: 'ETH', value: 'NATIVE', chainId: 1 },
        { label: 'MATIC', value: 'NATIVE', chainId: 137 },
        { label: 'BNB', value: 'NATIVE', chainId: 56 }
    ]

    const handleChainSwitch = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLabel = e.target.options[e.target.selectedIndex].text
        const selected = payOptions.find(o => o.label === selectedLabel)

        if (selected && selected.chainId && selected.chainId !== chainId) {
            switchChain({ chainId: selected.chainId })
        }
    }

    const topLabel = isInverted ? 'You Receive' : 'You Pay'
    const bottomLabel = isInverted ? 'You Pay' : 'You Receive'

    const handleTopInput = (val: string) => {
        if (!isInverted) {
            setMode('EXACT_IN')
            setInputValue(val)
        } else {
            setMode('EXACT_OUT')
            setInputValue(val)
        }
    }

    const handleBottomInput = (val: string) => {
        if (isInverted) {
            setMode('EXACT_IN')
            setInputValue(val)
        } else {
            setMode('EXACT_OUT')
            setInputValue(val)
        }
    }

    const topDisplay = isInverted ? amountOut : amountIn
    const bottomDisplay = isInverted ? amountIn : amountOut

    return (
        <Card className="w-full max-w-md mx-auto">
            <div className="mb-6">
                <h2 className="text-xl font-bold uppercase mb-4 text-white">Swap</h2>

                <div className="bg-white/5 p-4 border border-white/20 mb-4">
                    <div className="flex justify-between mb-2">
                        <span className="text-xs text-gray-400 uppercase">{topLabel}</span>
                        <div className="flex items-center gap-2">
                            {!isInverted && isConnected && balance && (
                                <span className="text-xs text-gray-400">Bal: {parseFloat(balance).toFixed(4)}</span>
                            )}
                            <select
                                value={currentNative}
                                onChange={handleChainSwitch}
                                className="bg-black text-white text-xs font-bold uppercase border border-white/20 p-1 outline-none"
                            >
                                {payOptions.map((opt, i) => (
                                    <option key={i} value={opt.label}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <Input
                        placeholder="0.0"
                        value={topDisplay}
                        onChange={(e) => handleTopInput(e.target.value)}
                        type="number"
                        className="bg-transparent text-2xl font-mono text-white p-0 border-none focus:outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>

                <div className="flex justify-center my-4 relative z-10">
                    <button
                        onClick={() => setIsInverted(!isInverted)}
                        className="bg-black border border-white p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <ArrowDown className={`w-4 h-4 text-white transition-transform duration-300 ${isInverted ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                <div className="bg-white/5 p-4 border border-white/20 mt-4">
                    <div className="flex justify-between mb-2">
                        <span className="text-xs text-gray-400 uppercase">{bottomLabel}</span>
                        <select className="bg-black text-white text-xs font-bold uppercase border border-white/20 p-1 outline-none">
                            {['USDC', 'USDT'].map(symbol => (
                                <option key={symbol} value={symbol}>{symbol}</option>
                            ))}
                        </select>
                    </div>
                    <Input
                        placeholder="0.0"
                        value={bottomDisplay}
                        onChange={(e) => handleBottomInput(e.target.value)}
                        type="number"
                        className="bg-transparent text-2xl font-mono text-white p-0 border-none focus:outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>
            </div>

            <AnimatePresence>
                {amountOut && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mb-4 overflow-hidden"
                    >
                        <div className="text-xs text-gray-400 flex justify-between uppercase font-mono border-t border-white/20 pt-2">
                            <span>Rate</span>
                            <span>1 {currentNative} = {(parseFloat(amountOut) / parseFloat(amountIn)).toFixed(2)} USDC</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                fullWidth
                isLoading={isLoading}
                onClick={swap}
                disabled={!isConnected || !amountOut}
            >
                {isConnected ? 'Swap Tokens' : 'Connect Wallet'}
            </Button>
        </Card>
    )
}
