'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Users, Trophy, Sparkles } from 'lucide-react'

// ─── Journey Data with Real Photos & Exact Coordinates ──────────────────────────
const milestones = [
  {
    id: 1,
    year: '2020–2022',
    title: '10th Class',
    subtitle: 'School Foundations',
    color: 'from-violet-600 to-purple-500',
    glowColor: 'rgba(139,92,246,0.6)',
    borderColor: 'border-violet-500',
    description:
      'The foundational beginning! School days where I first discovered coding, science, and the power of computers. These early years shaped my technical curiosity.',
    highlights: ['First computer class', 'Basic programming exploration', 'Science & tech enthusiast'],
    avatar: '/images/journey/10th/class-photo.png',
    images: ['/images/journey/10th/class-photo.png'],
    // Coordinates placed accurately along the road line
    x: 14,
    y: 72,
  },
  {
    id: 2,
    year: '2024–2026',
    title: '+1 & +2',
    subtitle: 'Higher Secondary & Squad',
    color: 'from-blue-600 to-cyan-500',
    glowColor: 'rgba(59,130,246,0.6)',
    borderColor: 'border-blue-500',
    description:
      'Higher secondary journey (2024–2026) packed with memorable experiences, brotherhood, NSS community work, grand Onam celebrations, and leveling up my programming skills!',
    highlights: ['NSS Volunteer Initiatives', 'Onam Festivals & Memories', 'Lifelong Friends & Brotherhood', 'Stepped into serious development'],
    avatar: '/images/journey/plus2/onam-1.jpg',
    images: [
      '/images/journey/plus2/onam-1.jpg',
      '/images/journey/plus2/onam-2.jpg',
      '/images/journey/plus2/nss-1.jpg',
      '/images/journey/plus2/nss-2.jpg',
      '/images/journey/plus2/nss-3.jpg',
      '/images/journey/plus2/nss-4.jpg',
    ],
    x: 32,
    y: 36,
  },
  {
    id: 3,
    year: '2024',
    title: 'Expo 2024',
    subtitle: 'District-Level Innovation',
    color: 'from-amber-500 to-orange-500',
    glowColor: 'rgba(245,158,11,0.6)',
    borderColor: 'border-amber-500',
    description:
      'Represented at the District Level Expo 2024! Showcased innovative tech projects, interacted with bright minds across the district, and gained huge recognition.',
    highlights: ['District Level Representation', 'Tech Project Showcase', 'Innovation Networking', 'Honored & Recognized'],
    avatar: '/images/journey/expo/expo-1.jpg',
    images: [
      '/images/journey/expo/expo-1.jpg',
      '/images/journey/expo/expo-2.jpg',
      '/images/journey/expo/expo-3.jpg',
      '/images/journey/expo/expo-4.jpg',
      '/images/journey/expo/expo-5.jpg',
    ],
    x: 55,
    y: 58,
  },
  {
    id: 4,
    year: '2024–Present',
    title: 'Madin Polytechnic',
    subtitle: 'Engineering College',
    color: 'from-emerald-500 to-teal-500',
    glowColor: 'rgba(16,185,129,0.6)',
    borderColor: 'border-emerald-500',
    description:
      'Diving deep into engineering at Madin Polytechnic College. Hands-on hardware, microcontrollers, networking, and building full-stack software applications daily.',
    highlights: ['Diploma in Engineering', 'IoT & Embedded Systems', 'Collaborative Tech Culture', 'Photos arriving soon!'],
    avatar: null, // placeholder badge until user drops pics
    images: [],
    x: 75,
    y: 32,
  },
  {
    id: 5,
    year: 'Future',
    title: 'AI Engineer',
    subtitle: 'The Vision & Beyond',
    color: 'from-pink-600 to-rose-500',
    glowColor: 'rgba(244,63,94,0.6)',
    borderColor: 'border-pink-500',
    description:
      'The overarching goal: Becoming a pioneer AI Engineer and architecting transformative AI-driven products, intelligent agents, and automated solutions for the world.',
    highlights: ['Autonomous AI Systems', 'Next-gen LLM Applications', 'Impactful Tech Products', 'Endless Innovation'],
    avatar: '/images/main-pic.jpg',
    images: ['/images/main-pic.jpg'],
    x: 91,
    y: 65,
  },
]

// ─── Image Gallery Modal ──────────────────────────────────────────────────────
function GalleryModal({ images, initialIdx, onClose }: { images: string[]; initialIdx: number; onClose: () => void }) {
  const [idx, setIdx] = useState(initialIdx)
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length)
  const next = () => setIdx((i) => (i + 1) % images.length)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-4xl h-[75vh] max-h-[600px] rounded-2xl overflow-hidden glass border border-white/20 flex flex-col justify-center items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full">
          <Image src={images[idx]} alt={`Photo ${idx + 1}`} fill className="object-contain" priority />
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-blue-600/50 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-blue-600/50 transition-colors"
            >
              <ChevronRight size={24} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 glass px-3 py-1.5 rounded-full border border-white/10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === idx ? 'bg-blue-400 w-6' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full glass border border-white/20 flex items-center justify-center text-white hover:bg-red-500/80 transition-colors"
        >
          <X size={18} />
        </button>
        <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-xs text-white/90 border border-white/10">
          {idx + 1} / {images.length}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────
function DetailPanel({
  milestone,
  onClose,
  onOpenPhoto,
}: {
  milestone: typeof milestones[0]
  onClose: () => void
  onOpenPhoto: (index: number) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="glass rounded-3xl border border-white/15 overflow-hidden shadow-2xl backdrop-blur-xl"
    >
      {/* Top Banner */}
      <div className={`relative bg-gradient-to-r ${milestone.color} p-6 sm:p-8 text-white overflow-hidden`}>
        <div className="absolute top-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 hover:bg-black/60 flex items-center justify-center transition-colors text-white"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-4">
          {milestone.avatar ? (
            <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/40 shadow-lg flex-shrink-0">
              <Image src={milestone.avatar} alt={milestone.title} fill className="object-cover" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/30 flex items-center justify-center text-2xl font-bold flex-shrink-0">
              🎓
            </div>
          )}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/20 text-xs font-semibold tracking-wider mb-1">
              <Calendar size={12} />
              {milestone.year}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">{milestone.title}</h3>
            <p className="text-white/80 text-sm">{milestone.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8 space-y-6">
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">{milestone.description}</p>

        {/* Highlights */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3 flex items-center gap-2">
            <Trophy size={14} className="text-amber-400" /> Key Milestones & Memories
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {milestone.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 glass px-3 py-2 rounded-xl border border-white/5">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${milestone.color} flex-shrink-0`} />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Clickable Image Showcase */}
        {milestone.images.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                <Users size={14} /> Memories & Photos ({milestone.images.length})
              </h4>
              <span className="text-xs text-slate-400">Click to view full photo</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
              {milestone.images.map((img, i) => (
                <motion.div
                  key={img}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onOpenPhoto(i)}
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-cyan-400/50 shadow-md group"
                >
                  <Image src={img} alt={`Memory ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Sparkles size={16} className="text-cyan-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl border border-dashed border-white/15 text-center text-slate-400 text-sm">
            📸 <span className="font-semibold text-white">Madin Polytechnic Photos</span> will be added here soon!
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ─── Main Roadmap Map Component ──────────────────────────────────────────────
export default function JourneyPage() {
  const [active, setActive] = useState<number>(2) // default to +1 & +2
  const [galleryIdx, setGalleryIdx] = useState<number | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const inView = useInView(mapRef, { once: true })

  const activeMilestone = milestones.find((m) => m.id === active) || milestones[0]

  return (
    <div className="min-h-screen grid-bg pt-24 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-blue-500/30 text-blue-400 text-sm mb-4">
            <MapPin size={15} /> Real Journey Roadmap
          </div>
          <h1 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight">
            My <span className="gradient-text">Milestone Map</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Click directly on any photo marker along the road to open up the memories, moments, and projects of that stage!
          </p>
        </motion.div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* ROADMAP CANVAS */}
        <div ref={mapRef} className="glass rounded-3xl border border-blue-500/20 p-4 sm:p-8 relative overflow-hidden shadow-2xl">
          {/* Subtle glow nodes */}
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Map canvas container */}
          <div className="relative w-full h-[380px] sm:h-[460px] bg-slate-950/60 rounded-2xl border border-white/5 overflow-hidden">
            {/* SVG Highway Path */}
            <svg
              viewBox="0 0 1000 460"
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="30%" stopColor="#3b82f6" />
                  <stop offset="55%" stopColor="#f59e0b" />
                  <stop offset="78%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
                <filter id="roadGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Road bed shadow */}
              <path
                d="M 140 330 C 220 330 260 165 320 165 C 400 165 480 267 550 267 C 640 267 690 147 750 147 C 820 147 860 300 910 300"
                stroke="rgba(15, 23, 42, 0.9)"
                strokeWidth="32"
                fill="none"
                strokeLinecap="round"
              />

              {/* Glowing Road Border */}
              <path
                d="M 140 330 C 220 330 260 165 320 165 C 400 165 480 267 550 267 C 640 267 690 147 750 147 C 820 147 860 300 910 300"
                stroke="url(#roadGradient)"
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
                opacity="0.8"
                filter="url(#roadGlowFilter)"
              />

              {/* Center dashed line */}
              <motion.path
                d="M 140 330 C 220 330 260 165 320 165 C 400 165 480 267 550 267 C 640 267 690 147 750 147 C 820 147 860 300 910 300"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeDasharray="10 14"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 2.5, ease: 'easeInOut' }}
              />
            </svg>

            {/* REAL PHOTO MARKERS on the Map */}
            {milestones.map((m) => {
              const isSelected = active === m.id
              return (
                <div
                  key={m.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                  style={{ left: `${m.x}%`, top: `${m.y}%` }}
                  onClick={() => setActive(m.id)}
                >
                  {/* Outer pulse wave */}
                  {isSelected && (
                    <motion.div
                      className={`absolute inset-0 rounded-full bg-gradient-to-r ${m.color}`}
                      animate={{ scale: [1, 2.2], opacity: [0.7, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    />
                  )}

                  {/* Photo Pin Avatar */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-3 shadow-2xl transition-all duration-300 ${
                      isSelected
                        ? `border-white ring-4 ring-offset-2 ring-offset-slate-950 ${m.borderColor}`
                        : 'border-white/50 opacity-90 group-hover:opacity-100 group-hover:border-white'
                    }`}
                    style={{
                      boxShadow: isSelected ? `0 0 30px ${m.glowColor}` : '0 10px 20px rgba(0,0,0,0.5)',
                    }}
                  >
                    {m.avatar ? (
                      <Image src={m.avatar} alt={m.title} fill className="object-cover" />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${m.color} flex items-center justify-center text-2xl font-bold text-white`}>
                        🎓
                      </div>
                    )}
                  </motion.div>

                  {/* Label badge beneath marker */}
                  <div
                    className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded-full text-xs font-bold transition-all ${
                      isSelected
                        ? `bg-gradient-to-r ${m.color} text-white shadow-lg`
                        : 'glass text-slate-300 group-hover:text-white border border-white/10'
                    }`}
                  >
                    {m.title}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quick Selector Bar */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {milestones.map((m) => (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  active === m.id
                    ? `bg-gradient-to-r ${m.color} text-white shadow-lg shadow-blue-500/20 scale-105`
                    : 'glass text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                {m.avatar ? (
                  <div className="relative w-5 h-5 rounded-full overflow-hidden border border-white/40">
                    <Image src={m.avatar} alt={m.title} fill className="object-cover" />
                  </div>
                ) : (
                  <span>🎓</span>
                )}
                <span>{m.title}</span>
                <span className="text-white/60 text-[11px] font-normal">({m.year})</span>
              </button>
            ))}
          </div>
        </div>

        {/* ACTIVE MILESTONE DETAIL PANEL */}
        <AnimatePresence mode="wait">
          <DetailPanel
            key={activeMilestone.id}
            milestone={activeMilestone}
            onClose={() => {}}
            onOpenPhoto={(idx) => setGalleryIdx(idx)}
          />
        </AnimatePresence>
      </div>

      {/* FULLSCREEN PHOTO GALLERY MODAL */}
      <AnimatePresence>
        {galleryIdx !== null && activeMilestone.images.length > 0 && (
          <GalleryModal
            images={activeMilestone.images}
            initialIdx={galleryIdx}
            onClose={() => setGalleryIdx(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
