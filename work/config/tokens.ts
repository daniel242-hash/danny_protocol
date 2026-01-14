export const TOKENS = {
    NATIVE: {
        symbol: 'ETH',
        decimals: 18,
        name: 'Native Token'
    },
    USDC: {
        symbol: 'USDC',
        decimals: 6,
        name: 'USD Coin'
    },
    USDT: {
        symbol: 'USDT',
        decimals: 6,
        name: 'Tether USD'
    }
} as const

export const CHAIN_TOKENS: Record<number, { USDC: string; USDT: string; NATIVE_SYMBOL: string }> = {
    1: {
        USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        NATIVE_SYMBOL: 'ETH'
    },
    137: {
        USDC: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
        USDT: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
        NATIVE_SYMBOL: 'MATIC'
    },
    42161: {
        USDC: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        USDT: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
        NATIVE_SYMBOL: 'ETH'
    },
    10: {
        USDC: '0x0b2C639c533813f4Aa9D7837CAf992c923F61625',
        USDT: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
        NATIVE_SYMBOL: 'ETH'
    },
    56: {
        USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
        USDT: '0x55d398326f99059fF775485246999027B3197955',
        NATIVE_SYMBOL: 'BNB'
    },
    11155111: {
        USDC: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
        USDT: '0x7169D38820dfd117C3FA1f22a697dBA58d90BA06',
        NATIVE_SYMBOL: 'ETH'
    }
}
