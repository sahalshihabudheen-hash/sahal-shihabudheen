'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Brain, Globe, Bot, Music, Cpu, Zap,
  ArrowRight, Code2, Layers
} from 'lucide-react'

// ─── Typing Effect ────────────────────────────────────────────────────────────
const titles = [
  'AI Engineer',
  'Web Developer',
  'IoT Enthusiast',
  'Discord Bot Maker',
  'Music Platform Builder',
  'Problem Solver',
]

function TypingText() {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = titles[index]
    let timeout: ReturnType<typeof setTimeout>
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIndex((prev) => (prev + 1) % titles.length)
    }
    return () => clearTimeout(timeout)
  }, [displayed, deleting, index])

  return (
    <span className="text-blue-400">
      {displayed}
      <span className="cursor text-cyan-400">|</span>
    </span>
  )
}

// ─── Particles — client-only to avoid hydration mismatch ─────────────────────
type Particle = { x: number; y1: number; y2: number; duration: number; delay: number }

function Particles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 25 }, () => ({
        x: Math.random() * 100,
        y1: Math.random() * 100,
        y2: Math.random() * 100,
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 5,
      }))
    )
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-blue-400/30"
          initial={{ x: `${p.x}%`, y: `${p.y1}%`, opacity: 0 }}
          animate={{ y: [`${p.y1}%`, `${p.y2}%`], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'linear' }}
        />
      ))}
    </div>
  )
}

// ─── Skills ───────────────────────────────────────────────────────────────────
const skills = [
  { icon: Brain, label: 'AI & Machine Learning', color: 'from-purple-500 to-blue-500', desc: 'Building intelligent systems & AI-powered apps' },
  { icon: Globe, label: 'Web Development', color: 'from-blue-500 to-cyan-500', desc: 'Full-stack apps with modern frameworks' },
  { icon: Bot, label: 'Discord Bots', color: 'from-indigo-500 to-purple-500', desc: 'Automation & community bots' },
  { icon: Music, label: 'Music Platforms', color: 'from-pink-500 to-rose-500', desc: 'NYRA Music & streaming experiences' },
  { icon: Cpu, label: 'IoT & ESP32', color: 'from-green-500 to-teal-500', desc: 'Hardware meets software innovation' },
  { icon: Zap, label: 'Automation', color: 'from-amber-500 to-orange-500', desc: 'Smart scripts & workflow automation' },
]

const stats = [
  { value: '∞', label: 'Ideas in Queue' },
  { value: '100%', label: 'Passion' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="grid-bg">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
        <Particles />

        {/* Background orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Left — Text */}
          <div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-black mb-4 leading-tight"
            >
              Hi, I&apos;m{' '}
              <span className="gradient-text">Sahal</span>
              <br />
              <span className="text-white text-4xl lg:text-5xl">Shihabudheen</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl lg:text-3xl font-semibold text-slate-300 mb-6 h-10"
            >
              <TypingText />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-slate-400 text-lg leading-relaxed mb-8 max-w-xl"
            >
              A passionate developer and innovator from Kerala 🇮🇳 who loves turning ideas into
              real-world projects — from AI apps to music platforms, IoT devices to Discord bots.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow"
                >
                  View My Work <ArrowRight size={18} />
                </motion.button>
              </Link>
              <Link href="/journey">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-blue-500/30 text-slate-300 hover:text-white font-semibold transition-colors"
                >
                  My Journey <Layers size={18} />
                </motion.button>
              </Link>

            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-10 flex gap-10 border-t border-white/5 pt-8"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-black gradient-text">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
            className="flex justify-center relative"
          >

            {/* Main photo */}
            <div className="relative w-72 h-80 lg:w-80 lg:h-96 rounded-3xl overflow-hidden border-2 border-blue-500/30"
              style={{ boxShadow: '0 0 40px rgba(59,130,246,0.2)' }}
            >
              <Image
                src="/images/main-pic.jpg"
                alt="Sahal Shihabudheen"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/30 via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-0 w-64 h-20 bg-blue-500/20 blur-2xl rounded-full pointer-events-none" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 text-xs"
        >
          <span>Scroll down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-slate-600 flex items-center justify-center"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">About Me</span>
              <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-black mb-6">
              I turn <span className="gradient-text">ideas</span> into reality
            </h2>
            <div className="space-y-4 text-slate-400 leading-relaxed text-lg">
              <p>
                I&apos;m <strong className="text-white">Sahal Shihabudheen</strong>, a passionate developer,
                innovator, and technology enthusiast who loves turning ideas into real-world projects.
              </p>
              <p>
                I enjoy building <span className="text-blue-400">AI-powered applications</span>, websites,
                Discord bots, music platforms, IoT devices, and other technology projects while
                constantly exploring new tools and technologies.
              </p>
              <p>
                From developing projects like <span className="text-cyan-400">SAI – Smart Assistant for Your Idea</span>{' '}
                and <span className="text-pink-400">NYRA Music</span> to experimenting with JARVIS, ESP32,
                AI, and automation — I&apos;m always looking for ways to learn, create, and solve problems.
              </p>
              <p>
                My goal is to grow as an <strong className="text-white">AI engineer</strong> and build
                innovative products that are useful, creative, and impactful.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {['Python', 'JavaScript', 'TypeScript', 'Next.js', 'React', 'Node.js', 'ESP32', 'AI/ML'].map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-full glass border border-blue-500/20 text-blue-300 text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Skills ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-blue-400 text-sm mb-4">
              <Code2 size={14} /> What I Build
            </div>
            <h2 className="text-4xl lg:text-5xl font-black">
              My <span className="gradient-text">Superpowers</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass rounded-2xl p-6 border border-white/5 hover:border-blue-500/30 transition-all duration-300 group cursor-default relative overflow-hidden"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <skill.icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">{skill.label}</h3>
                <p className="text-slate-500 text-sm">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
