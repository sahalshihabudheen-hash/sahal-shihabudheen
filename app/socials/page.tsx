'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Copy, Check, Share2, Sparkles, Zap, ShieldCheck } from 'lucide-react'
import { FaInstagram, FaDiscord, FaGithub } from 'react-icons/fa6'

const DISCORD_USER_ID = '1146350719507648643'
const FALLBACK_DECORATION = 'a_f7e6e3ba47bf54880bf601735d5fb9bf'

interface LanyardData {
  discord_user: {
    id: string
    username: string
    avatar: string | null
    global_name?: string
    display_name?: string
    avatar_decoration_data?: {
      asset: string
      sku_id?: string
    } | null
    collectibles?: {
      nameplate?: {
        asset: string
        label?: string
        palette?: string
        sku_id?: string
      }
    } | null
  }
  discord_status: 'online' | 'idle' | 'dnd' | 'offline'
  activities?: Array<{
    name: string
    type: number
    state?: string
    details?: string
  }>
}

export default function SocialsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [lanyard, setLanyard] = useState<LanyardData | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchLanyard = async () => {
      try {
        const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`)
        const json = await res.json()
        if (isMounted && json.success && json.data) {
          setLanyard(json.data)
        }
      } catch (err) {
        console.error('Failed to fetch Lanyard Discord data:', err)
      }
    }

    fetchLanyard()
    const interval = setInterval(fetchLanyard, 30000)
    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => {
      setCopiedId(null)
    }, 2500)
  }

  // Discord Avatar, Decoration & Presence
  const discordAvatarUrl = lanyard?.discord_user?.avatar
    ? `https://cdn.discordapp.com/avatars/${DISCORD_USER_ID}/${lanyard.discord_user.avatar}.png?size=256`
    : `https://api.lanyard.rest/${DISCORD_USER_ID}.png`

  const avatarDecorationAsset =
    lanyard?.discord_user?.avatar_decoration_data?.asset || FALLBACK_DECORATION

  const nameplate = lanyard?.discord_user?.collectibles?.nameplate

  const discordStatus = lanyard?.discord_status || 'dnd'
  const discordDisplayName =
    lanyard?.discord_user?.global_name || lanyard?.discord_user?.display_name || '𝐒𝐀𝐇𝐀𝐋_𝐏𝐑𝐎'

  const statusConfig = {
    online: { color: 'bg-emerald-500', label: 'Online', text: 'text-emerald-400' },
    idle: { color: 'bg-amber-500', label: 'Idle / Away', text: 'text-amber-400' },
    dnd: { color: 'bg-rose-500', label: 'Do Not Disturb', text: 'text-rose-400' },
    offline: { color: 'bg-slate-500', label: 'Offline', text: 'text-slate-400' },
  }

  const currentStatus = statusConfig[discordStatus] || statusConfig.dnd

  return (
    <div className="min-h-screen grid-bg pt-24 pb-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/30 text-blue-400 text-sm mb-4">
            <Share2 size={15} /> Let&apos;s Connect
          </div>
          <h1 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight">
            My <span className="gradient-text">Socials</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg">
            Find me across the web with real-time presence &amp; direct links. Whether you want to talk code, collaborate, or say hi — let&apos;s connect!
          </p>
        </motion.div>

        {/* Social Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* ─── 1. INSTAGRAM CARD ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            whileHover={{ y: -5 }}
            className="relative rounded-2xl glass p-7 border border-white/10 hover:border-pink-500/50 transition-all duration-300 flex flex-col justify-between group"
            style={{
              boxShadow: '0 8px 32px 0 rgba(236, 72, 153, 0.22)',
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-pink-500/15 transition-all duration-300" />

            <div>
              {/* Top Bar: DP & Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="relative">
                  {/* Instagram Story Gradient Ring */}
                  <div className="w-16 h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 shadow-lg shadow-rose-500/25 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full p-[2px] bg-[#030712] overflow-hidden">
                      <img
                        src="/images/main-pic.jpg"
                        alt="Sahal Instagram DP"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  {/* IG Icon Badge */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-tr from-rose-500 to-purple-600 border-2 border-[#030712] flex items-center justify-center text-white shadow">
                    <FaInstagram size={11} />
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-medium glass border border-pink-500/20 text-pink-300">
                  Photos &amp; Stories
                </span>
              </div>

              {/* Title & Handle */}
              <h2 className="text-2xl font-bold text-white mb-0.5">Instagram</h2>
              <div className="inline-block text-pink-400 font-mono text-sm mb-3 font-semibold">
                @sahal._shihab
              </div>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Follow my journey, campus moments from Madin Polytechnic, tech updates, stories, and daily life highlights.
              </p>
            </div>

            {/* Action */}
            <div className="pt-2">
              <a
                href="https://www.instagram.com/sahal._shihab/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:opacity-95 text-white font-medium text-sm transition-all duration-200 shadow-md shadow-pink-500/25 hover:shadow-pink-500/40"
              >
                <span>Open Instagram Profile</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </motion.div>

          {/* ─── 2. DISCORD CARD (WITH AVATAR DECORATION & PROFILE EFFECTS) ─ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            whileHover={{ y: -5 }}
            className="relative rounded-2xl glass p-7 border border-indigo-500/40 hover:border-cyan-400/60 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
            style={{
              boxShadow: '0 8px 36px 0 rgba(56, 189, 248, 0.22)',
            }}
          >
            {/* ⚡ DISCORD PROFILE EFFECT AURA (Electric Storm / Cyber Aura) */}
            <div className="absolute top-0 inset-x-0 h-36 overflow-hidden pointer-events-none rounded-t-2xl">
              {/* Electric ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/15 via-blue-600/10 to-transparent" />
              {/* Cyber lightning beam across top edge */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
              {/* Pulsing energy sphere behind avatar */}
              <motion.div
                className="absolute -top-16 -left-10 w-44 h-44 bg-cyan-500/20 rounded-full blur-3xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.35, 0.7, 0.35] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute top-2 right-4 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            <div className="relative z-10">
              {/* Top Bar: Live Avatar + Animated Avatar Decoration + Status Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="relative flex items-center justify-center">
                  {/* Outer avatar container sized to fit avatar + decoration glow */}
                  <div className="relative w-18 h-18 flex items-center justify-center">
                    {/* The Avatar Base */}
                    <div className="w-15 h-15 rounded-full bg-[#030712] overflow-hidden border border-cyan-500/30 shadow-md">
                      <img
                        src={discordAvatarUrl}
                        alt="Sahal Discord Avatar"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>

                    {/* ⚡ Real Animated Discord Avatar Decoration Overlay */}
                    {avatarDecorationAsset && (
                      <img
                        src={`https://cdn.discordapp.com/avatar-decoration-presets/${avatarDecorationAsset}.png?size=256&passthrough=true`}
                        alt="Discord Avatar Decoration"
                        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20 select-none scale-[1.24] -translate-y-[1px]"
                      />
                    )}

                    {/* Live Discord Status Dot */}
                    <span
                      className={`absolute bottom-0 right-0 z-30 w-4.5 h-4.5 rounded-full border-2 border-[#030712] ${currentStatus.color} shadow-lg ring-2 ring-black/50`}
                      title={`Discord Status: ${currentStatus.label}`}
                    />
                  </div>
                </div>

                {/* Live Status & Profile Effect Badge */}
                <div className="flex flex-col items-end gap-1.5">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium glass border border-cyan-500/30 shadow-sm shadow-cyan-500/10">
                    <span className={`w-2 h-2 rounded-full ${currentStatus.color} animate-pulse`} />
                    <span className={currentStatus.text}>{currentStatus.label}</span>
                  </div>

                  {/* Collectible Profile Nameplate tag */}
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-950/50 border border-rose-500/30 text-rose-300 text-[10px] font-semibold tracking-wide shadow-sm">
                    <span className="text-rose-400">♈</span>
                    <span>Aries Crimson</span>
                  </div>
                </div>
              </div>

              {/* Title, Collectibles & Handle */}
              <div className="mb-0.5 flex items-center flex-wrap gap-2">
                <h2 className="text-2xl font-bold text-white flex items-center gap-1.5">
                  Discord
                  <Zap size={16} className="text-cyan-400 animate-pulse" />
                </h2>
                <span className="text-xs text-cyan-300 font-medium px-2 py-0.5 rounded-md bg-cyan-950/40 border border-cyan-500/30">
                  {discordDisplayName}
                </span>
              </div>

              <div className="inline-block text-cyan-400 font-mono text-sm mb-3 font-semibold">
                sahal_pro
              </div>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Connect with me on Discord for real-time developer talk, bot creation, tech collabs, or hanging out.
              </p>
            </div>

            {/* Action: Copy username */}
            <div className="pt-2 relative z-10">
              <button
                onClick={() => handleCopy('sahal_pro', 'discord-card')}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 ${
                  copiedId === 'discord-card'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 hover:shadow-cyan-500/30'
                }`}
              >
                {copiedId === 'discord-card' ? (
                  <>
                    <Check size={16} />
                    <span>Copied: sahal_pro!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy Username: sahal_pro</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* ─── 3. GITHUB CARD (LIVE GITHUB AVATAR) ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            whileHover={{ y: -5 }}
            className="relative rounded-2xl glass p-7 border border-white/10 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between group"
            style={{
              boxShadow: '0 8px 32px 0 rgba(59, 130, 246, 0.22)',
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/15 transition-all duration-300" />

            <div>
              {/* Top Bar: GitHub Avatar & Badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="relative">
                  {/* GitHub Blue Gradient Ring */}
                  <div className="w-16 h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-blue-600 via-blue-500 to-cyan-400 shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full p-[2px] bg-[#030712] overflow-hidden">
                      <img
                        src="https://github.com/sahalshihabudheen-hash.png"
                        alt="Sahal GitHub Avatar"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  {/* GitHub Icon Badge */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border-2 border-[#030712] flex items-center justify-center text-white shadow">
                    <FaGithub size={11} />
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-medium glass border border-blue-500/20 text-blue-300">
                  Open Source Code
                </span>
              </div>

              {/* Title & Handle */}
              <h2 className="text-2xl font-bold text-white mb-0.5">GitHub</h2>
              <div className="inline-block text-blue-400 font-mono text-sm mb-3 font-semibold">
                @sahalshihabudheen-hash
              </div>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Explore my repositories, star projects, and check out codebases in Next.js, AI, and embedded electronics.
              </p>
            </div>

            {/* Action */}
            <div className="pt-2">
              <a
                href="https://github.com/sahalshihabudheen-hash"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all duration-200 shadow-md shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                <span>View Repositories</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-2xl glass border border-blue-500/20 p-8 text-center relative overflow-hidden"
        >
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium mb-3">
              <Sparkles size={13} /> Open to Collaboration
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Have a project or cool idea in mind?
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Drop me a message on Instagram or add me on Discord. Let&apos;s build high-impact digital experiences together.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://www.instagram.com/sahal._shihab/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <FaInstagram size={15} /> Message on Instagram
              </a>
              <button
                onClick={() => handleCopy('sahal_pro', 'banner-discord')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-indigo-500/30 text-slate-200 hover:text-white text-sm font-semibold transition-colors"
              >
                {copiedId === 'banner-discord' ? (
                  <>
                    <Check size={15} className="text-emerald-400" />
                    <span>Discord Tag Copied!</span>
                  </>
                ) : (
                  <>
                    <FaDiscord size={15} className="text-indigo-400" />
                    <span>Copy Discord ID (sahal_pro)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
