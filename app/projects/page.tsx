'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ExternalLink, Music, Film, Bot, Brain,
  Cpu, Globe, Star, Code2, Filter, Zap
} from 'lucide-react'
import { FaGithub as Github } from 'react-icons/fa'

// ─── Projects Data ────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    name: 'NYRA Music',
    tagline: 'Your vibe, your music — anytime, anywhere.',
    description:
      'A full-featured music streaming platform with beautiful UI, playlist management, and smooth playback. NYRA delivers a premium music experience right in the browser with a sleek, modern interface.',
    icon: Music,
    color: 'from-pink-600 to-rose-500',
    glowColor: 'rgba(244,63,94,0.3)',
    borderColor: 'border-rose-500/30',
    category: 'Web App',
    tags: ['Music', 'Streaming', 'UI/UX', 'React'],
    liveUrl: 'https://nyra-music-player.vercel.app',
    githubUrl: 'https://github.com/sahalshihabudheen-hash',
    featured: true,
    status: 'Live',
    emoji: '🎵',
  },
  {
    id: 2,
    name: 'Movie Hub (JARVIS)',
    tagline: 'Discover, explore, and watch movies intelligently.',
    description:
      'A movie discovery platform powered by the TMDB API, featuring smart search, trending movies, detailed info pages, and a sleek dark UI. Named after the legendary AI assistant — because good taste in movies is intelligence.',
    icon: Film,
    color: 'from-blue-600 to-indigo-500',
    glowColor: 'rgba(99,102,241,0.3)',
    borderColor: 'border-indigo-500/30',
    category: 'Web App',
    tags: ['Movies', 'API', 'Next.js', 'TMDB'],
    liveUrl: 'https://jarvis-hub-eight.vercel.app/',
    githubUrl: 'https://github.com/sahalshihabudheen-hash',
    featured: true,
    status: 'Live',
    emoji: '🎬',
  },
  {
    id: 3,
    name: 'SAI — Smart Assistant',
    tagline: 'Smart Assistant for Your Idea.',
    description:
      'An AI-powered assistant designed to help you brainstorm, plan, and execute your ideas. SAI uses large language models to give you intelligent suggestions, answer questions, and help turn raw ideas into actionable plans.',
    icon: Brain,
    color: 'from-violet-600 to-purple-500',
    glowColor: 'rgba(139,92,246,0.3)',
    borderColor: 'border-violet-500/30',
    category: 'AI',
    tags: ['AI', 'LLM', 'Chatbot', 'Python'],
    liveUrl: null,
    githubUrl: 'https://github.com/sahalshihabudheen-hash',
    featured: true,
    status: 'In Development',
    emoji: '🤖',
  },
  {
    id: 4,
    name: 'Discord Bots',
    tagline: 'Automation & fun for Discord communities.',
    description:
      'A collection of custom Discord bots built to automate server management, play music, run games, handle moderation, and add fun features to communities. Each bot is tailored to specific server needs.',
    icon: Bot,
    color: 'from-indigo-600 to-blue-500',
    glowColor: 'rgba(99,102,241,0.3)',
    borderColor: 'border-indigo-500/30',
    category: 'Bot',
    tags: ['Discord.py', 'Automation', 'Python', 'Bot'],
    liveUrl: null,
    githubUrl: 'https://github.com/sahalshihabudheen-hash',
    featured: false,
    status: 'Ongoing',
    emoji: '🤖',
  },
  {
    id: 5,
    name: 'ESP32 / IoT Projects',
    tagline: 'Where hardware meets software innovation.',
    description:
      'A series of IoT projects using ESP32 microcontrollers — from smart home automation to sensor dashboards and wireless data collection. Bridging the physical and digital worlds through code.',
    icon: Cpu,
    color: 'from-green-600 to-teal-500',
    glowColor: 'rgba(16,185,129,0.3)',
    borderColor: 'border-green-500/30',
    category: 'IoT',
    tags: ['ESP32', 'IoT', 'C++', 'Hardware'],
    liveUrl: null,
    githubUrl: 'https://github.com/sahalshihabudheen-hash',
    featured: false,
    status: 'Ongoing',
    emoji: '⚡',
  },
  {
    id: 6,
    name: 'More Coming Soon',
    tagline: 'The build never stops.',
    description:
      'I\'m constantly building, experimenting, and shipping new projects. From automation scripts to full-stack apps — there\'s always something cooking. Stay tuned for more drops!',
    icon: Zap,
    color: 'from-amber-500 to-orange-500',
    glowColor: 'rgba(245,158,11,0.3)',
    borderColor: 'border-amber-500/30',
    category: 'Coming Soon',
    tags: ['AI', 'Web', 'IoT', '...'],
    liveUrl: null,
    githubUrl: 'https://github.com/sahalshihabudheen-hash',
    featured: false,
    status: 'Soon',
    emoji: '🚀',
  },
]

const categories = ['All', 'Web App', 'AI', 'Bot', 'IoT', 'Coming Soon']

const statusColors: Record<string, string> = {
  Live: 'bg-green-500/20 text-green-400 border-green-500/30',
  'In Development': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Ongoing: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Soon: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const Icon = project.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className={`relative glass rounded-2xl border ${project.borderColor} overflow-hidden group transition-all duration-300`}
      style={{ boxShadow: `0 0 0 0 ${project.glowColor}` }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 30px ${project.glowColor}`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 0 ${project.glowColor}`
      }}
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-semibold">
            <Star size={10} fill="currentColor" /> Featured
          </div>
        </div>
      )}

      {/* Header gradient */}
      <div className={`h-2 w-full bg-gradient-to-r ${project.color}`} />

      <div className="p-6">
        {/* Icon + Name */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center flex-shrink-0 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={22} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-black text-white text-lg">{project.name}</h3>
              <span className="text-lg">{project.emoji}</span>
            </div>
            <p className="text-slate-500 text-xs mt-0.5">{project.tagline}</p>
          </div>
        </div>

        {/* Status */}
        <div className="mb-4">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold ${statusColors[project.status]}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {project.status}
          </span>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-full glass border border-white/5 text-slate-400 text-[11px] font-medium">
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r ${project.color} text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg`}
            >
              <Globe size={15} /> Live Demo
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${project.liveUrl ? '' : 'flex-1'} flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl glass border border-white/10 text-slate-400 hover:text-white text-sm font-semibold transition-colors`}
          >
            <Github size={15} /> {project.liveUrl ? '' : 'GitHub'}
            {!project.liveUrl && <ExternalLink size={13} />}
          </a>
          {!project.liveUrl && project.status === 'Soon' && (
            <div className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl glass border border-dashed border-white/10 text-slate-600 text-sm">
              Coming soon...
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <div className="min-h-screen grid-bg pt-24 pb-16">
      {/* Background orbs */}
      <div className="fixed top-1/3 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/3 right-0 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-blue-400 text-sm mb-4">
            <Code2 size={14} /> My Projects
          </div>
          <h1 className="text-5xl lg:text-6xl font-black mb-4">
            Things I&apos;ve <span className="gradient-text">Built</span>
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto">
            A collection of projects across AI, web development, IoT, bots, and more.
            Each one a story of learning and building.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <div className="flex items-center gap-2 text-slate-500 text-sm mr-2">
            <Filter size={14} /> Filter:
          </div>
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                  : 'glass border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="glass rounded-2xl border border-blue-500/15 p-10 max-w-2xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-600/5 pointer-events-none" />
            <div className="relative">
              <div className="text-4xl mb-4">💡</div>
              <h2 className="text-2xl font-black mb-2 text-white">
                More projects always cooking...
              </h2>
              <p className="text-slate-500 mb-6 text-sm">
                Check my GitHub for the latest experiments, WIPs, and open-source contributions.
              </p>
              <a
                href="https://github.com/sahalshihabudheen-hash"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 mx-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/30"
                >
                  <Github size={18} /> Visit GitHub ↗
                </motion.button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
