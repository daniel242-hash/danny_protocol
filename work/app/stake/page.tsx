'use client'
import { StakingDashboard } from '@/components/features/stake/StakingDashboard'
import { Header } from '@/components/layout/Header'

export default function StakePage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            <Header />
            <div className="container mx-auto px-4 py-8 flex justify-center pt-20">
                <div className="w-full lg:max-w-md">
                    <StakingDashboard />
                </div>
            </div>
        </div>
    )
}
