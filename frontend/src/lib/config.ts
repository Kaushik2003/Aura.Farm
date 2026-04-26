import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_NETWORK: z.enum(['anvil', 'base-sepolia', 'base']),
  NEXT_PUBLIC_RPC_URL: z.string().url(),
  NEXT_PUBLIC_VAULT_FACTORY_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  NEXT_PUBLIC_AURA_ORACLE_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  NEXT_PUBLIC_TREASURY_ADDRESS: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  NEXT_PUBLIC_CHAIN_ID: z.string().transform(Number),
  NEXT_PUBLIC_CHAIN_NAME: z.string(),
})

export type NetworkConfig = {
  network: 'anvil' | 'base-sepolia' | 'base'
  chainId: number
  chainName: string
  rpcUrl: string
  contracts: {
    vaultFactory: `0x${string}`
    auraOracle: `0x${string}`
    treasury: `0x${string}`
  }
}

function validateEnv() {
  try {
    return envSchema.parse({
      NEXT_PUBLIC_NETWORK: process.env.NEXT_PUBLIC_NETWORK,
      NEXT_PUBLIC_RPC_URL: process.env.NEXT_PUBLIC_RPC_URL,
      NEXT_PUBLIC_VAULT_FACTORY_ADDRESS: process.env.NEXT_PUBLIC_VAULT_FACTORY_ADDRESS,
      NEXT_PUBLIC_AURA_ORACLE_ADDRESS: process.env.NEXT_PUBLIC_AURA_ORACLE_ADDRESS,
      NEXT_PUBLIC_TREASURY_ADDRESS: process.env.NEXT_PUBLIC_TREASURY_ADDRESS,
      NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
      NEXT_PUBLIC_CHAIN_NAME: process.env.NEXT_PUBLIC_CHAIN_NAME,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map(e => e.path.join('.')).join(', ')
      throw new Error(`Invalid or missing environment variables: ${missingVars}`)
    }
    throw error
  }
}

export function getConfig(): NetworkConfig {
  const env = validateEnv()

  const zeroAddress = '0x0000000000000000000000000000000000000000'
  if (
    env.NEXT_PUBLIC_VAULT_FACTORY_ADDRESS === zeroAddress ||
    env.NEXT_PUBLIC_AURA_ORACLE_ADDRESS === zeroAddress ||
    env.NEXT_PUBLIC_TREASURY_ADDRESS === zeroAddress
  ) {
    console.warn(`[Aura.Farm] Contract addresses not yet set for ${env.NEXT_PUBLIC_NETWORK}. Deploy contracts first.`)
  }

  return {
    network: env.NEXT_PUBLIC_NETWORK,
    chainId: env.NEXT_PUBLIC_CHAIN_ID,
    chainName: env.NEXT_PUBLIC_CHAIN_NAME,
    rpcUrl: env.NEXT_PUBLIC_RPC_URL,
    contracts: {
      vaultFactory: env.NEXT_PUBLIC_VAULT_FACTORY_ADDRESS as `0x${string}`,
      auraOracle: env.NEXT_PUBLIC_AURA_ORACLE_ADDRESS as `0x${string}`,
      treasury: env.NEXT_PUBLIC_TREASURY_ADDRESS as `0x${string}`,
    },
  }
}

export function getContractAddress(contractName: keyof NetworkConfig['contracts']): `0x${string}` {
  return getConfig().contracts[contractName]
}

export const NETWORK_CONFIGS = {
  anvil: {
    chainId: 31337,
    name: 'Anvil Local',
    rpcUrls: {
      default: { http: ['http://localhost:8545'] },
      public: { http: ['http://localhost:8545'] },
    },
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  },
  'base-sepolia': {
    chainId: 84532,
    name: 'Base Sepolia',
    rpcUrls: {
      default: { http: ['https://sepolia.base.org'] },
      public: { http: ['https://sepolia.base.org'] },
    },
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    blockExplorers: {
      default: { name: 'BaseScan', url: 'https://sepolia.basescan.org' },
    },
    testnet: true,
  },
  base: {
    chainId: 8453,
    name: 'Base',
    rpcUrls: {
      default: { http: ['https://mainnet.base.org'] },
      public: { http: ['https://mainnet.base.org'] },
    },
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    blockExplorers: {
      default: { name: 'BaseScan', url: 'https://basescan.org' },
    },
  },
} as const
