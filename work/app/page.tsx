'use client'
import { Header } from '@/components/layout/Header'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Header />

      <main className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <h1 className="text-6xl font-bold tracking-tighter uppercase mb-6 max-w-3xl">
          The Modern Standard for <span className="text-gray-500">DeFi</span>
        </h1>
        <p className="text-xl text-gray-400 mb-12 max-w-xl">
          Access the future of finance with a minimal, high-performance interface. Swap tokens and earn yields instanty.
        </p>

        <div className="flex gap-6">
          <Link href="/swap" className="group flex items-center gap-2 bg-white text-black px-8 py-3 text-sm font-bold uppercase hover:bg-gray-200 transition-colors">
            Start Swapping
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/stake" className="flex items-center gap-2 border border-white px-8 py-3 text-sm font-bold uppercase hover:bg-white hover:text-black transition-colors">
            Earn Yield
          </Link>
        </div>
      </main>
    </div>
  )
}
