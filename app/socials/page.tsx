'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Copy, Check, Share2, Sparkles } from 'lucide-react'
import { FaInstagram, FaDiscord, FaGithub } from 'react-icons/fa6'

interface SocialPlatform {
  id: string
  name: string
  handle: string
  url?: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  badge: string
  accentColor: string
  glowColor: string
  borderHover: string
  description: string
  copyValue?: string
  isDirectLink?: boolean
  buttonText: string
}

const socials: SocialPlatform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@sahal._shihab',
    url: 'https://www.instagram.com/sahal._shihab/',
    icon: FaInstagram,
    badge: 'Photos & Stories',
    accentColor: 'from-pink-500 via-purple-500 to-indigo-500',
    glowColor: 'rgba(236, 72, 153, 0.25)',
    borderHover: 'hover:border-pink-500/50',
    description:
      'Follow my journey, behind-the-scenes moments, campus vibes at Madin Polytechnic, tech projects, and daily life highlights.',
    isDirectLink: true,
    buttonText: 'Open Instagram Profile',
  },
  {
    id: 'discord',
    name: 'Discord',
    handle: 'sahal_pro',
    copyValue: 'sahal_pro',
    url: 'https://discord.com',
    icon: FaDiscord,
    badge: 'Real-time Chat',
    accentColor: 'from-indigo-500 via-blue-500 to-cyan-500',
    glowColor: 'rgba(99, 102, 241, 0.25)',
    borderHover: 'hover:border-indigo-500/50',
    description:
      'Connect with me on Discord for tech discussions, developer collaborations, bot building, or sharing ideas.',
    isDirectLink: false,
    buttonText: 'Copy Discord Tag',
  },
  {
    id: 'github',
    name: 'GitHub',
    handle: '@sahalshihabudheen-hash',
    url: 'https://github.com/sahalshihabudheen-hash',
    icon: FaGithub,
    badge: 'Open Source Code',
    accentColor: 'from-blue-600 via-blue-500 to-cyan-400',
    glowColor: 'rgba(59, 130, 246, 0.25)',
    borderHover: 'hover:border-blue-500/50',
    description:
      'Explore my codebases, repositories, full-stack web applications, AI models, and embedded IoT firmware experiments.',
    isDirectLink: true,
    buttonText: 'View Repositories',
  },
]

export default function SocialsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => {
      setCopiedId(null)
    }, 2500)
  }

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
            Find me across the web. Whether you want to talk code, collaborate on a project, or just say hi — I&apos;m always happy to connect!
          </p>
        </motion.div>

        {/* Social Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {socials.map((platform, idx) => {
            const Icon = platform.icon
            const isCopied = copiedId === platform.id

            return (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -5 }}
                className={`relative rounded-2xl glass p-7 border border-white/10 ${platform.borderHover} transition-all duration-300 flex flex-col justify-between group`}
                style={{
                  boxShadow: `0 8px 32px 0 ${platform.glowColor}`,
                }}
              >
                {/* Subtle card glow inside */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/15 transition-all duration-300" />

                <div>
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${platform.accentColor} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      <Icon size={26} />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium glass border border-white/10 text-slate-300">
                      {platform.badge}
                    </span>
                  </div>

                  {/* Title & Handle */}
                  <h2 className="text-2xl font-bold text-white mb-1">{platform.name}</h2>
                  <div className="inline-block text-blue-400 font-mono text-sm mb-3">
                    {platform.handle}
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {platform.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-2">
                  {platform.isDirectLink && platform.url ? (
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all duration-200 shadow-md shadow-blue-500/20 hover:shadow-blue-500/40"
                    >
                      <span>{platform.buttonText}</span>
                      <ExternalLink size={15} />
                    </a>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => platform.copyValue && handleCopy(platform.copyValue, platform.id)}
                        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 ${
                          isCopied
                            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/40'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check size={16} />
                            <span>Copied: {platform.handle}!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={16} />
                            <span>Copy Username: {platform.handle}</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
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
              Drop me a message on Instagram or Discord. Let&apos;s turn visionary concepts into high-impact digital experiences.
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
