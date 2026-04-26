import { http, createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { celo } from 'wagmi/chains'
import { getConfig } from './config'

const config = getConfig()

const anvilChain = {
  id: 31337,
  name: 'Anvil Local',
  nativeCurrency: { decimals: 18, name: 'Ether', symbol: 'ETH' },
  rpcUrls: {
    default: { http: ['http://localhost:8545'] },
    public: { http: ['http://localhost:8545'] },
  },
} as const

const celoSepoliaChain = {
  id: 11142220,
  name: 'Celo Sepolia',
  nativeCurrency: { decimals: 18, name: 'Celo', symbol: 'CELO' },
  rpcUrls: {
    default: { http: ['https://rpc.ankr.com/celo_sepolia'] },
    public: { http: ['https://rpc.ankr.com/celo_sepolia'] },
  },
  blockExplorers: {
    default: { name: 'CeloScan', url: 'https://sepolia.celoscan.io' },
  },
  testnet: true,
} as const

// For Anvil local dev: use plain createConfig with only the injected connector.
// This avoids WalletConnect initialization entirely — no Reown API calls, no 403.
// For production networks: use getDefaultConfig which wires up WalletConnect properly.
// A real WalletConnect project ID is required; get one free at cloud.walletconnect.com.
function buildConfig() {
  if (config.network === 'anvil') {
    return createConfig({
      chains: [anvilChain],
      connectors: [injected()],
      transports: { [anvilChain.id]: http(config.rpcUrl) },
    })
  }

  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
  if (!projectId) {
    throw new Error(
      'NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is required for non-Anvil networks.\n' +
      'Get a free project ID at https://cloud.walletconnect.com and add it to .env.local.'
    )
  }

  return getDefaultConfig({
    appName: 'Aura.farm',
    projectId,
    chains: [celo, celoSepoliaChain] as any,
    transports: { [config.chainId]: http(config.rpcUrl) },
  })
}

export const wagmiConfig = buildConfig()

export const currentChain = config.network === 'anvil' ? anvilChain : celo

export function isCorrectNetwork(chainId?: number): boolean {
  return chainId === config.chainId
}
