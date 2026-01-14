'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { useState, useEffect } from 'react'
import { ChevronDown, Copy, LogOut } from 'lucide-react'
import { toast } from 'sonner'

// Wallet Icons
const WalletConnectIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M4.77 8.87L3.46 7.56C3.06 7.16 3.06 6.53 3.46 6.13C6.71 2.88 11.23 2.19 15.08 3.56L14.63 5.48C11.5 4.38 8.01 5.09 5.56 7.54L4.77 8.32V8.87ZM19.23 8.87L20.54 7.56C20.94 7.16 20.94 6.53 20.54 6.13C17.29 2.88 12.77 2.19 8.92 3.56L9.37 5.48C12.5 4.38 15.99 5.09 18.44 7.54L19.23 8.32V8.87ZM12 12.87L7.9 16.97C7.5 17.37 6.87 17.37 6.47 16.97L5.06 15.56C4.66 15.16 4.66 14.53 5.06 14.13L11.29 7.9C11.69 7.5 12.32 7.5 12.72 7.9L18.94 14.12C19.34 14.52 19.34 15.15 18.94 15.55L17.53 16.96C17.13 17.36 16.5 17.36 16.1 16.96L12 12.87Z" fill="#3B99FC" />
    </svg>
)

const MetaMaskIcon = () => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path fillRule="evenodd" clipRule="evenodd" d="M27.2618 3.93556C26.5599 3.57501 25.8032 3.32832 25.0211 3.20455L24.8961 3.16641L23.8687 11.5947L17.9103 12.9868L22.9961 2.375L22.8465 2.15833C20.9136 0.165275 18.2389 -0.569477 15.6021 0.449767C12.9654 -0.569477 10.2907 0.165275 8.35777 2.15833L8.20822 2.375L13.294 12.9868L7.33555 11.5947L6.30722 3.16738L6.18318 3.20455C5.40108 3.32832 4.64434 3.57501 3.94247 3.93556L3.43555 4.38289L6.50294 13.9113L2.24754 11.0827L1.69189 11.4589C0.605333 13.0645 0 14.9452 0 16.8927C0 23.3676 5.09332 28.91 11.8385 29.5638L12.0163 29.5667L12.0837 29.1729L13.7667 21.0457H17.4376L19.1206 29.1729L19.1879 29.5667L19.3658 29.5638C26.111 28.91 31.2043 23.3676 31.2043 16.8927C31.2043 14.9452 30.599 13.0645 29.5124 11.4589L28.9567 11.0827L24.7013 13.9113L27.7687 4.38289L27.2618 3.93556ZM19.2949 19H11.9085L11.5032 20.8997L10.0572 17.587L11.7766 16.2081L11.4281 12.9517L15.6026 15.5492L19.7752 12.9517L19.4267 16.2081L21.1461 17.587L19.7001 20.8997L19.2949 19ZM25.0747 17.1517L22.2536 15.4208L22.9564 12.9468L25.3212 9.47958L25.0747 17.1517ZM24.4027 18.067L22.3923 23.7788L20.4786 21.3789L21.5791 16.3355L24.4027 18.067ZM6.12961 17.1517L5.88313 9.47958L8.24792 12.9468L8.95071 15.4208L6.12961 17.1517ZM6.80165 18.067L9.62522 16.3355L10.7257 21.3789L8.81203 23.7788L6.80165 18.067Z" fill="#E2761B" />
    </svg>
)

const PhantomIcon = () => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
        <path d="M24.686 15.116C24.686 9.876 21.493 5.422 16.345 5.422C11.508 5.422 7.734 8.761 6.551 13.253L2.247 25.101C1.942 25.922 2.656 26.744 3.511 26.549L8.148 25.592C8.758 25.475 9.356 25.759 9.613 26.297L10.981 29.231C11.373 30.071 12.564 30.081 12.969 29.231L15.352 24.238L18.892 24.238C23.238 24.238 24.686 19.392 24.686 15.116Z" fill="#AB9FF2" />
        <circle cx="11.456" cy="14.861" r="2.049" fill="white" />
        <circle cx="18.913" cy="14.861" r="2.049" fill="white" />
    </svg>
)

const DefaultWalletIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7h-9" />
        <path d="M14 17H5" />
        <circle cx="17" cy="17" r="3" />
        <circle cx="7" cy="7" r="3" />
    </svg>
)

export function ConnectButton() {
    const { address, isConnected, chain } = useAccount()
    const { connect, connectors, isPending } = useConnect()
    const { disconnect } = useDisconnect()
    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    // Prevent hydration errors
    useEffect(() => {
        setMounted(true)
    }, [])

    const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''

    const getConnectorIcon = (name: string) => {
        const lowerName = name.toLowerCase()
        if (lowerName.includes('metamask')) return <MetaMaskIcon />
        if (lowerName.includes('phantom')) return <PhantomIcon />
        if (lowerName.includes('walletconnect')) return <WalletConnectIcon />
        return <DefaultWalletIcon />
    }

    if (!mounted) return <Button isLoading>Loading</Button>

    if (isConnected) {
        return (
            <div className="relative">
                <Button
                    variant="secondary"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2"
                >
                    {shortAddress}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </Button>

                {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-full min-w-[160px] bg-black border border-white p-1 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(address || '')
                                toast.success("Address copied")
                                setIsDropdownOpen(false)
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-left"
                        >
                            <Copy className="w-4 h-4" />
                            Copy Address
                        </button>
                        <button
                            onClick={() => {
                                disconnect()
                                setIsDropdownOpen(false)
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/10 transition-colors text-left"
                        >
                            <LogOut className="w-4 h-4" />
                            Disconnect
                        </button>
                    </div>
                )}

                {/* Overlay to close dropdown when clicking outside */}
                {isDropdownOpen && (
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsDropdownOpen(false)}
                    />
                )}
            </div>
        )
    }

    return (
        <>
            <Button
                isLoading={isPending}
                onClick={() => setIsWalletModalOpen(true)}
            >
                Connect Wallet
            </Button>

            <Modal
                isOpen={isWalletModalOpen}
                onClose={() => setIsWalletModalOpen(false)}
                title="Select Wallet"
            >
                <div className="flex flex-col gap-3">
                    {connectors.map((connector) => {
                        // Don't show injected if it's generic and we have specific ones, 
                        // but here we just list what Wagmi gives us.
                        // Usually Injected is named "Injected" or the detected wallet name (e.g. "MetaMask").
                        return (
                            <Button
                                key={connector.uid}
                                variant="secondary"
                                fullWidth
                                className="flex items-center justify-between group"
                                onClick={() => {
                                    connect({ connector }, {
                                        onError: (err) => toast.error("Connection failed", { description: err.message }),
                                        onSuccess: () => setIsWalletModalOpen(false)
                                    })
                                }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 flex items-center justify-center p-1 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                                        {getConnectorIcon(connector.name)}
                                    </div>
                                    <span className="font-bold tracking-wide text-lg">{connector.name}</span>
                                </div>
                            </Button>
                        )
                    })}
                </div>
            </Modal>
        </>
    )
}
