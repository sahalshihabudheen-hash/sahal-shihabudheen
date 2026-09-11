'use client'

import { motion } from 'framer-motion'
import { Heart, Code2 } from 'lucide-react'
import { FaGithub as Github } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="relative border-t border-blue-500/10 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <Code2 size={16} className="text-white" />
            </div>
            <span className="font-bold gradient-text">Sahal Shihabudheen</span>
          </div>

          {/* Center text */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-500 text-sm flex items-center gap-1"
          >
            Built with <Heart size={14} className="text-red-500 fill-red-500" /> and lots of ☕
          </motion.p>

          {/* Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/sahalshihabudheen-hash"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors duration-200"
            >
              <Github size={20} />
            </a>
            <a
              href="https://nyra-music-player.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-cyan-400 text-sm transition-colors duration-200"
            >
              NYRA Music ↗
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-slate-600 text-xs">
          © 2026 Sahal Shihabudheen · AI Engineer & Developer · Kerala, India
        </div>
      </div>

      {/* Glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
    </footer>
  )
}
