'use client'
import { SwapInterface } from '@/components/features/swap/SwapInterface'
import { Header } from '@/components/layout/Header'

export default function SwapPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <Header />
            <div className="container mx-auto px-4 py-8 flex justify-center pt-20">
                <div className="w-full lg:max-w-md">
                    <SwapInterface />
                </div>
            </div>
        </div>
    )
}
