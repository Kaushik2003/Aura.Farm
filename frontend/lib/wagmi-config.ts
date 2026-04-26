import { http, createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { baseSepolia, base } from 'wagmi/chains'
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

function buildConfig() {
  if (config.network === 'anvil') {
    // Local dev: skip WalletConnect entirely — no Reown API calls
    return createConfig({
      chains: [anvilChain],
      connectors: [injected()],
      transports: { [anvilChain.id]: http(config.rpcUrl) },
    })
  }

  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
  if (!projectId) {
    throw new Error(
      'NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is required for Base networks.\n' +
      'Get a free project ID at https://cloud.walletconnect.com and add it to .env.local.'
    )
  }

  const chain = config.network === 'base' ? base : baseSepolia

  return getDefaultConfig({
    appName: 'Aura.Farm',
    projectId,
    chains: [chain] as any,
    transports: { [chain.id]: http(config.rpcUrl) },
  })
}

export const wagmiConfig = buildConfig()

export const currentChain =
  config.network === 'anvil' ? anvilChain :
  config.network === 'base'  ? base :
  baseSepolia

export function isCorrectNetwork(chainId?: number): boolean {
  return chainId === config.chainId
}
