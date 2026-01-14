'use client'
import Link from 'next/link'
import { ConnectButton } from '@/components/web3/ConnectButton'

export function Header() {
    return (
        <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/20 relative">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity z-10 shrink-0">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-black rounded-full" />
                </div>
                <h1 className="text-xl font-bold tracking-tighter uppercase hidden sm:block">Danny Protocol</h1>
            </Link>

            {/* Mobile: Static position, simplified. Desktop: Absolute center */}
            <nav className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-8">
                <Link href="/swap" className="text-sm font-bold uppercase text-gray-400 hover:text-white transition-colors">Swap</Link>
                <Link href="/stake" className="text-sm font-bold uppercase text-gray-400 hover:text-white transition-colors">Stake</Link>
            </nav>

            {/* Mobile Nav - Visible only on small screens, placed next to logo or integrated */}
            <nav className="flex sm:hidden gap-4 mx-2">
                <Link href="/swap" className="text-xs font-bold uppercase text-gray-400 hover:text-white transition-colors">Swap</Link>
                <Link href="/stake" className="text-xs font-bold uppercase text-gray-400 hover:text-white transition-colors">Stake</Link>
            </nav>

            <div className="z-10 shrink-0">
                <ConnectButton />
            </div>
        </header>
    )
}
