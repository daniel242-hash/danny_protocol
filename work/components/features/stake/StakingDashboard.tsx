'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useStaking } from '@/hooks/useStaking'

import { useAccount } from 'wagmi'

export function StakingDashboard() {
    const { stakedBalance, rewards, isLoading, stake, unstake, claim } = useStaking()
    const { isConnected } = useAccount()
    const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake')
    const [amount, setAmount] = useState('')

    const handleAction = async () => {
        if (activeTab === 'stake') await stake(amount)
        else await unstake(amount)
        setAmount('')
    }

    return (
        <Card className="w-full max-w-md mx-auto h-full flex flex-col">
            <div className="mb-6 border-b border-white/20 pb-4">
                <h2 className="text-xl font-bold uppercase text-white mb-1">Staking Vault</h2>
                <div className="flex gap-4 text-xs font-mono text-gray-400">
                    <div>APR: <span className="text-white">5.4%</span></div>
                    <div>TVL: <span className="text-white">$12.4M</span></div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 p-3 border border-white/10">
                    <div className="text-xs text-gray-400 uppercase mb-1">Staked Balance</div>
                    <div className="text-xl font-mono text-white">{stakedBalance}</div>
                </div>
                <div className="bg-white/5 p-3 border border-white/10 relative">
                    <div className="text-xs text-gray-400 uppercase mb-1">Earned Rewards</div>
                    <div className="text-xl font-mono text-white">{rewards}</div>
                    {parseFloat(rewards) > 0 && (
                        <button
                            onClick={claim}
                            disabled={!isConnected}
                            className={`absolute top-2 right-2 text-[10px] uppercase border border-white px-2 py-0.5 transition-colors ${isConnected ? 'hover:bg-white hover:text-black' : 'opacity-50 cursor-not-allowed'}`}
                        >
                            Claim
                        </button>
                    )}
                </div>
            </div>

            {/* Tabs */}
            <div className="flex mb-4 border border-white/20">
                {(['stake', 'unstake'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 text-sm font-bold uppercase transition-colors ${activeTab === tab ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="flex-1 flex flex-col gap-4">
                <div className="bg-white/5 p-4 border border-white/20">
                    <div className="flex justify-between mb-2">
                        <span className="text-xs text-gray-400 uppercase">Amount</span>
                        <span className="text-xs text-white uppercase cursor-pointer">Max</span>
                    </div>
                    <Input
                        placeholder="0.0"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        className="bg-transparent text-2xl font-mono text-white p-0 border-none focus:outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>

                <Button
                    fullWidth
                    isLoading={isLoading}
                    onClick={handleAction}
                    disabled={!isConnected || !amount}
                >
                    {!isConnected ? 'Connect Wallet' : (activeTab === 'stake' ? 'Deposit Assets' : 'Withdraw Assets')}
                </Button>
            </div>
        </Card>
    )
}
