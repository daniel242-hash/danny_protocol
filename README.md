# Danny Protocol

A modern, high-performance DeFi frontend built with Next.js 14, Wagmi, and Viem.

## Features

-   **Multi-Chain Support**: Seamlessly switch between Ethereum, Polygon, and BSC.
-   **Intelligent Swap Interface**:
    -   **Bidirectional Editing**: Exact input and exact output modes.
    -   **Smart Routing**: Adapts to connected chain (ETH/MATIC/BNB).
    -   **Invertible Direction**: Easily swap Native <-> Stablecoin flow.
-   **Staking Dashboard**: View staked balances, rewards, and manage assets.
-   **Wallet Integration**: Secure connection via WalletConnect with real-time balance tracking.
-   **Real-Time Data**: Live price feeds powered by CoinGecko.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/daniel242-hash/danny_protocol.git
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the app:**
    Navigate to [http://localhost:3000](http://localhost:3000).

## Tech Stack

-   **Framework**: Next.js 14 (App Router)
-   **Styling**: Tailwind CSS
-   **Web3**: Wagmi + Viem
-   **Animations**: Framer Motion
-   **Icons**: Lucide React
