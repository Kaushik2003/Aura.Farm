'use client'

import Link from 'next/link'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Play } from 'lucide-react'
import { WalletConnect } from '../components/wallet-connect'

// ─── Floating node label ──────────────────────────────────────────
function NodeLabel({
  name,
  value,
  side,
  top,
  icon,
}: {
  name: string
  value: string
  side: 'left' | 'right'
  top: string
  icon?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.8 }}
      className={`absolute flex items-start gap-2 select-none ${side === 'right' ? 'flex-row-reverse text-right' : ''}`}
      style={{ top, [side]: '6%' }}
    >
      {/* connector line */}
      <div className="flex flex-col items-center mt-1.5 gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
        <div className={`h-px w-8 bg-white/20 ${side === 'right' ? 'ml-auto' : ''}`} />
      </div>
      <div>
        {icon && <div className="text-white/40 text-xs mb-0.5">{icon}</div>}
        <div className="text-white/80 text-sm font-medium tracking-wide">{name}</div>
        <div className="text-white/35 text-xs font-mono">{value}</div>
      </div>
    </motion.div>
  )
}

// ─── Main page ────────────────────────────────────────────────────
export default function Home() {
  const { address } = useAccount()
  const [mounted, setMounted] = useState(false)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="min-h-screen bg-[#07090c] text-white overflow-x-hidden font-[var(--font-geist-sans)]">

      {/* ── AMBIENT GLOW ─────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Large top-right green/sage blob — matches the reference */}
        <div
          className="absolute top-[-18%] right-[-12%] w-[680px] h-[520px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(120,160,130,0.22) 0%, rgba(80,120,90,0.10) 45%, transparent 75%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Subtle bottom-left dark teal */}
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[420px] h-[340px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(60,100,80,0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Faint center horizon glow */}
        <div
          className="absolute bottom-[28%] left-1/2 -translate-x-1/2 w-[900px] h-[160px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.025) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
      </div>

      {/* ── NAV ──────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2 w-36">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.9) 40%, rgba(200,220,210,0.6) 100%)' }}
          >
            <span className="text-[#07090c] font-black text-xs tracking-tighter">A</span>
          </div>
          <span className="font-semibold text-white/90 text-sm tracking-wide">Aura.Farm</span>
        </div>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] rounded-full px-2 py-1.5 backdrop-blur-xl">
          {[
            { label: 'Home', href: '/' },
            { label: 'Vaults', href: '/vaults' },
            { label: 'Liquidate', href: '/liquidate' },
            { label: 'Features', href: '#features' },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="px-4 py-1 text-sm text-white/55 hover:text-white transition-colors rounded-full hover:bg-white/[0.06]"
            >
              {label}
            </Link>
          ))}
          <div className="w-px h-4 bg-white/10 mx-1" />
          <Link
            href="/vaults"
            className="flex items-center gap-1.5 px-4 py-1 text-sm text-white/75 hover:text-white transition-colors rounded-full bg-white/[0.07] border border-white/10"
          >
            Explore Vaults
            <ArrowUpRight size={11} className="opacity-60" />
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 w-36 justify-end">
          <WalletConnect />
        </div>
      </nav>

      {/* ── HERO ─────────────────────────── */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">

        {/* Floating node labels — LEFT */}
        <NodeLabel name="Vitalik.eth" value="Aura 174" side="left" top="22%" icon="△" />
        <NodeLabel name="jessepollak" value="Aura 162" side="left" top="55%" icon="✦" />

        {/* Floating node labels — RIGHT */}
        <NodeLabel name="dwr.eth" value="Aura 148" side="right" top="20%" />
        <NodeLabel name="Creator Vaults" value="TVL $2.4M" side="right" top="54%" icon="◎" />

        {/* Connector lines — decorative horizontal lines across */}
        <div className="absolute left-0 right-0 pointer-events-none" style={{ top: '23.5%' }}>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>
        <div className="absolute left-0 right-0 pointer-events-none" style={{ top: '56.5%' }}>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        {/* Play button pill — top center */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 mt-4"
        >
          <button className="flex items-center gap-2.5 bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.10] rounded-full px-5 py-2 text-sm text-white/70 hover:text-white transition-all backdrop-blur-xl">
            <Play size={11} className="fill-white/60 text-white/60" />
            <span>How Aura.Farm works</span>
          </button>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-[82px] font-bold leading-[1.04] tracking-[-0.02em] max-w-4xl"
        >
          <span className="text-white">Tokenize Creator</span>{' '}
          <span
            className="italic font-bold"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(180,210,190,0.85) 60%, rgba(120,170,140,0.7) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Influence.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-6 text-base md:text-lg text-white/45 max-w-md leading-relaxed"
        >
          Creator tokens backed by real CELO collateral and priced by live Farcaster engagement — not speculation.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-10"
        >
          <Link
            href={mounted && address ? '/creator/create' : '/vaults'}
            className="flex items-center gap-2 bg-white text-[#07090c] font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/90 transition-all shadow-[0_0_30px_rgba(255,255,255,0.08)]"
          >
            Launch Your Vault
            <ArrowUpRight size={14} />
          </Link>
          <Link
            href="/vaults"
            className="flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.10] border border-white/[0.10] text-white/80 font-medium text-sm px-6 py-3 rounded-full transition-all backdrop-blur-xl"
          >
            Explore Creator Markets
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-6 mt-10 text-xs text-white/30"
        >
          {['Built on Celo', 'Farcaster Native', 'CELO Collateralized', 'Real-Time Aura Oracle'].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-white/20" />
              {t}
            </span>
          ))}
        </motion.div>

        {/* Scroll indicator — bottom-left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 left-8 flex items-center gap-2 text-white/25 text-xs font-mono"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center"
          >
            <span className="text-[8px]">↓</span>
          </motion.div>
          01/04 · Scroll down
        </motion.div>

        {/* DeFi horizons — bottom-right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 right-8 text-right"
        >
          <div className="text-white/30 text-xs font-medium tracking-wide">Aura horizons</div>
          <div className="mt-1 w-6 h-px bg-white/20 ml-auto" />
        </motion.div>

        {/* Vertical bar chart decoration — center bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end gap-[3px] pointer-events-none opacity-20">
          {[18, 28, 42, 60, 80, 60, 42, 28, 18].map((h, i) => (
            <div key={i} className="w-[2px] bg-white/60 rounded-t" style={{ height: h }} />
          ))}
        </div>
      </section>

      {/* ── PARTNER LOGOS BAR ────────────────── */}
      <section className="relative z-10 border-t border-white/[0.06] bg-[#07090c]/80 backdrop-blur-xl py-6 px-6 md:px-12">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {[
            { name: 'Celo', prefix: '▲' },
            { name: 'Farcaster', prefix: '✦' },
            { name: 'IPFS', prefix: '◎' },
            { name: 'Wagmi', prefix: '_' },
            { name: 'Viem', prefix: '⬡' },
            { name: 'Base', prefix: '◈' },
            { name: 'Chainlink', prefix: '⬟' },
          ].map(({ name, prefix }) => (
            <div key={name} className="flex items-center gap-1.5 text-white/25 hover:text-white/45 transition-colors text-sm font-medium tracking-wide">
              <span className="text-xs opacity-60">{prefix}</span>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS SECTION ────────────────────── */}
      <section className="relative z-10 py-28 px-6 md:px-12 border-t border-white/[0.04]" id="features">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 border border-white/[0.08] rounded-full px-4 py-1.5 text-xs text-white/50 mb-5 bg-white/[0.03]">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400/70 animate-pulse" />
              Protocol Live · Celo Mainnet
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Real numbers. No hype.</h2>
            <p className="mt-4 text-white/40 text-base max-w-md mx-auto">
              Every metric is onchain, verifiable, and updated in real time by the Aura Oracle.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Total Value Locked', value: '$2.4M', sub: 'CELO in collateral' },
              { label: 'Creator Vaults', value: '128', sub: 'Deployed onchain' },
              { label: 'Active Vaults', value: '94', sub: 'Bootstrapped & minting' },
              { label: 'Collateral Ratio', value: '150%', sub: 'Protocol minimum' },
            ].map(({ label, value, sub }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] rounded-2xl p-6 transition-all"
              >
                <div className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">{value}</div>
                <div className="text-sm text-white/60 mb-1">{label}</div>
                <div className="text-xs text-white/25">{sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────── */}
      <section className="relative z-10 py-28 px-6 md:px-12 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 border border-white/[0.08] rounded-full px-4 py-1.5 text-xs text-white/50 mb-5 bg-white/[0.03]">
              Protocol Architecture
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight max-w-xl">
              Creator → Vault → Fans → Growth
            </h2>
            <p className="mt-4 text-white/40 text-base max-w-lg">
              Fully autonomous. No custodians, no middlemen. Your Farcaster engagement drives onchain token economics.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-white/15 via-white/08 to-transparent hidden md:block" />

            <div className="space-y-0">
              {[
                { step: '01', title: 'Creator Deploys a Vault', desc: 'Bootstrap 0.001 CELO stake to unlock Stage 1. The vault generates a dedicated ERC-20 token representing your creator equity.' },
                { step: '02', title: 'Aura Oracle Sets the Price', desc: 'Every 6 hours, Farcaster metrics compute an Aura score (0–200) that anchors token price and supply cap — fully onchain.' },
                { step: '03', title: 'Fans Mint at 150% Collateral', desc: 'Fans invest by minting creator tokens. Each token is backed by 150% CELO collateral — real value, not speculation.' },
                { step: '04', title: 'Dynamic Pricing Reflects Growth', desc: 'Aura rises → price rises. The protocol auto-adjusts supply and liquidates if health drops below 120%.' },
              ].map(({ step, title, desc }, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-8 group py-8 border-b border-white/[0.04] last:border-0"
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.10] flex items-center justify-center text-xs font-mono text-white/40 group-hover:border-white/20 group-hover:text-white/60 transition-all">
                      {step}
                    </div>
                  </div>
                  <div className="pt-1.5">
                    <div className="text-white font-semibold mb-2 text-lg">{title}</div>
                    <div className="text-white/40 text-sm leading-relaxed max-w-2xl">{desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY AURA WINS ────────────────────── */}
      <section className="relative z-10 py-28 px-6 md:px-12 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 border border-white/[0.08] rounded-full px-4 py-1.5 text-xs text-white/50 mb-5 bg-white/[0.03]">
              Why Aura Wins
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Not another creator coin.</h2>
            <p className="mt-4 text-white/40 text-base max-w-xl mx-auto">
              Every existing creator token is speculation. Aura.Farm is the first protocol that backs creator tokens with real, verifiable collateral — and prices them by real social engagement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { title: '150% Real Collateral', desc: 'Every token is over-collateralized with CELO. If the vault goes unhealthy, the protocol auto-liquidates — protecting all stakeholders.' },
              { title: 'Aura-Anchored Pricing', desc: 'Token price is not speculative. It is computed from live Farcaster metrics and pushed onchain every 6 hours.' },
              { title: 'Farcaster-Native Identity', desc: 'Creators link their Farcaster handle. No anonymous rug-pulls, no fake traction. The social graph is real.' },
              { title: 'Verifiable Onchain Trust', desc: 'All oracle computations are stored on IPFS with full audit trails. Every aura update is a transaction. Nothing is hidden.' },
              { title: 'Dynamic Supply Control', desc: 'When aura drops, supply cap shrinks. Forced burns protect collateral ratios automatically — no human intervention needed.' },
              { title: 'Permissionless Liquidation', desc: 'Anyone can liquidate unhealthy vaults and earn a 1% bounty. The protocol is self-healing by design.' },
            ].map(({ title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}
                className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-white/[0.12] rounded-2xl p-6 transition-all"
              >
                <div className="text-white font-semibold mb-3">{title}</div>
                <div className="text-white/40 text-sm leading-relaxed">{desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED VAULTS ──────────────────── */}
      <section className="relative z-10 py-28 px-6 md:px-12 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <div className="inline-flex items-center gap-2 border border-white/[0.08] rounded-full px-4 py-1.5 text-xs text-white/50 mb-5 bg-white/[0.03]">
                Creator Markets
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Featured Vaults</h2>
            </div>
            <Link href="/vaults" className="hidden md:flex items-center gap-1.5 text-sm text-white/35 hover:text-white transition-colors">
              View all <ArrowUpRight size={13} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: 'Vitalik', handle: '@vitalik.eth', aura: 174, peg: '0.00174', tvl: '$890K', change: '+18.2%', badge: 'Top Vault' },
              { name: 'Jesse', handle: '@jessepollak', aura: 162, peg: '0.00162', tvl: '$540K', change: '+11.4%' },
              { name: 'Dan', handle: '@dwr.eth', aura: 148, peg: '0.00148', tvl: '$320K', change: '+7.8%' },
            ].map(({ name, handle, aura, peg, tvl, change, badge }, i) => (
              <motion.div
                key={handle}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-white/[0.14] rounded-2xl p-5 cursor-pointer transition-all relative"
              >
                {badge && (
                  <div className="absolute top-4 right-4 text-[10px] font-semibold uppercase tracking-wider text-white/50 bg-white/[0.07] border border-white/[0.10] px-2 py-0.5 rounded-full">
                    {badge}
                  </div>
                )}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-white/[0.08] border border-white/[0.10] flex items-center justify-center font-bold text-white text-sm">
                    {name[0]}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{name}</div>
                    <div className="text-white/30 text-xs">{handle}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-white/30">Aura Score</span>
                    <span className="text-white/60 font-mono">{aura}/200</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/[0.07] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-white/30"
                      style={{ width: `${(aura / 200) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    { val: peg, label: 'Peg' },
                    { val: tvl, label: 'TVL' },
                    { val: change, label: '7d', green: true },
                  ].map(({ val, label, green }) => (
                    <div key={label} className="bg-white/[0.04] border border-white/[0.06] rounded-xl py-2.5">
                      <div className={`text-xs font-semibold ${green ? 'text-green-400/80' : 'text-white/80'}`}>{val}</div>
                      <div className="text-white/25 text-[10px] mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                  <span className="text-white/25 text-xs">View vault</span>
                  <ArrowUpRight size={13} className="text-white/30" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/vaults"
              className="inline-flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/60 hover:text-white text-sm font-medium px-7 py-3 rounded-full transition-all"
            >
              Browse all creator vaults <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────── */}
      <section className="relative z-10 py-36 px-6 md:px-12 border-t border-white/[0.04] overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(120,160,130,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              Your audience is your
              <br />
              <span
                className="italic"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(160,200,175,0.8) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                greatest asset.
              </span>
            </h2>
            <p className="text-lg text-white/40 mb-12 max-w-xl mx-auto leading-relaxed">
              Aura.Farm lets you tokenize it — with real collateral, real pricing, and real protection. Not a meme. Not speculation. A protocol.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={mounted && address ? '/creator/create' : '/vaults'}
                className="flex items-center justify-center gap-2 bg-white text-[#07090c] font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-all text-base shadow-[0_0_50px_rgba(255,255,255,0.08)]"
              >
                {mounted && address ? 'Launch Your Vault' : 'Explore Creator Vaults'}
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/creator/create"
                className="flex items-center justify-center gap-2 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.10] text-white font-medium px-8 py-4 rounded-full transition-all text-base"
              >
                Create Your Vault
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.06] py-10 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.85) 40%, rgba(200,220,210,0.5) 100%)' }}
            >
              <span className="text-[#07090c] font-black text-[10px]">A</span>
            </div>
            <span className="font-semibold text-white/80 text-sm">Aura.Farm</span>
            <span className="text-white/20 text-xs ml-1">Decentralized creator economy</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-white/25">
            <Link href="/vaults" className="hover:text-white transition-colors">Vaults</Link>
            <Link href="/liquidate" className="hover:text-white transition-colors">Liquidate</Link>
            {mounted && address && (
              <Link href="/creator" className="hover:text-white transition-colors">Dashboard</Link>
            )}
            <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
          </div>
          <div className="text-xs text-white/20">Built on Celo · Powered by Farcaster</div>
        </div>
      </footer>
    </div>
  )
}
