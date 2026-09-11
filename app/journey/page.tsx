'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Users, Trophy } from 'lucide-react'

// ─── Journey Data ─────────────────────────────────────────────────────────────
const milestones = [
  {
    id: 1,
    year: '2020–2022',
    title: '10th Class',
    subtitle: 'School Days',
    emoji: '🏫',
    color: 'from-violet-600 to-purple-500',
    glowColor: 'rgba(139,92,246,0.4)',
    borderColor: 'border-violet-500/40',
    description:
      'The beginning of it all. School days where I first fell in love with computers and technology. These were the foundational years that sparked my curiosity and set me on the path to becoming a developer.',
    highlights: ['First computer class 💻', 'Discovered programming', 'Top in science & tech'],
    images: ['/images/journey/10th/class-photo.png'],
    x: 10,
    y: 75,
  },
  {
    id: 2,
    year: '2022–2024',
    title: '+1 & +2',
    subtitle: 'Higher Secondary',
    emoji: '📚',
    color: 'from-blue-600 to-cyan-500',
    glowColor: 'rgba(59,130,246,0.4)',
    borderColor: 'border-blue-500/40',
    description:
      'Higher secondary was a blast! Made amazing friends, participated in NSS, celebrated Onam with the squad, and started coding seriously. This is where the developer in me truly woke up.',
    highlights: ['NSS volunteer 🌿', 'Onam celebrations 🌸', 'Made lifelong friends', 'Started serious coding'],
    images: [
      '/images/journey/plus2/nss-1.jpg',
      '/images/journey/plus2/nss-2.jpg',
      '/images/journey/plus2/nss-3.jpg',
      '/images/journey/plus2/nss-4.jpg',
      '/images/journey/plus2/onam-1.jpg',
      '/images/journey/plus2/onam-2.jpg',
    ],
    x: 30,
    y: 40,
  },
  {
    id: 3,
    year: '2024',
    title: 'Expo 2024',
    subtitle: 'District Level',
    emoji: '🏆',
    color: 'from-amber-500 to-orange-500',
    glowColor: 'rgba(245,158,11,0.4)',
    borderColor: 'border-amber-500/40',
    description:
      'Went to the district-level expo and represented my school/college. A huge milestone where I got to showcase my technical skills and meet incredible innovators from across the district.',
    highlights: ['District level 🎖️', 'Project showcase', 'Met innovators', 'Gained recognition'],
    images: [
      '/images/journey/expo/expo-1.jpg',
      '/images/journey/expo/expo-2.jpg',
      '/images/journey/expo/expo-3.jpg',
      '/images/journey/expo/expo-4.jpg',
      '/images/journey/expo/expo-5.jpg',
    ],
    x: 58,
    y: 68,
  },
  {
    id: 4,
    year: '2024–Present',
    title: 'Madin Polytechnic',
    subtitle: 'Engineering College',
    emoji: '🎓',
    color: 'from-green-600 to-teal-500',
    glowColor: 'rgba(16,185,129,0.4)',
    borderColor: 'border-green-500/40',
    description:
      'Currently pursuing my diploma at Madin Polytechnic College, diving deep into engineering and computer science. Building bigger projects, learning every single day, and leveling up as an AI engineer.',
    highlights: ['Diploma student 📐', 'Building AI projects', 'Learning daily', 'Growing as engineer'],
    images: [],
    x: 82,
    y: 30,
  },
  {
    id: 5,
    year: 'Future',
    title: 'AI Engineer',
    subtitle: 'The Dream',
    emoji: '🚀',
    color: 'from-pink-600 to-rose-500',
    glowColor: 'rgba(236,72,153,0.4)',
    borderColor: 'border-pink-500/40',
    description:
      'The destination — becoming a world-class AI engineer and building innovative products that are useful, creative, and impactful. The journey has only just begun!',
    highlights: ['AI Engineer 🤖', 'Startup founder?', 'Global impact', 'Endless possibilities'],
    images: [],
    x: 88,
    y: 72,
  },
]

// SVG road path connecting all milestones
const ROAD_PATH = 'M 60 380 C 100 350 150 220 230 195 C 290 175 310 250 375 260 C 430 268 450 165 530 148 C 590 135 620 220 680 215 C 730 210 760 190 820 195'

// ─── Image Gallery Modal ──────────────────────────────────────────────────────
function Gallery({ images, onClose }: { images: string[]; onClose: () => void }) {
  const [idx, setIdx] = useState(0)
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length)
  const next = () => setIdx((i) => (i + 1) % images.length)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={images[idx]} alt={`Gallery ${idx + 1}`} fill className="object-cover" />
        {images.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 glass rounded-full p-2 hover:bg-white/10 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 glass rounded-full p-2 hover:bg-white/10 transition-colors">
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} className={`w-2 h-2 rounded-full transition-colors ${i === idx ? 'bg-white' : 'bg-white/30'}`} />
              ))}
            </div>
          </>
        )}
        <button onClick={onClose} className="absolute top-3 right-3 glass rounded-full p-2 hover:bg-white/10 transition-colors">
          <X size={16} />
        </button>
        <div className="absolute bottom-3 right-3 glass px-2 py-1 rounded text-xs">
          {idx + 1} / {images.length}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Milestone Card ───────────────────────────────────────────────────────────
function MilestoneCard({ milestone, isActive, onClick }: {
  milestone: typeof milestones[0]
  isActive: boolean
  onClick: () => void
}) {
  return (
    <motion.div
      className="absolute z-20 cursor-pointer"
      style={{ left: `${milestone.x}%`, top: `${milestone.y}%` }}
      animate={{ scale: isActive ? 1.2 : 1 }}
      onClick={onClick}
    >
      {/* Pulse ring */}
      <motion.div
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${milestone.color}`}
        animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* Marker */}
      <motion.div
        whileHover={{ scale: 1.2 }}
        className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${milestone.color} flex items-center justify-center text-2xl shadow-lg border-2 border-white/20`}
        style={{ boxShadow: `0 0 20px ${milestone.glowColor}` }}
      >
        {milestone.emoji}
      </motion.div>
      {/* Label */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap glass px-2 py-1 rounded-lg text-xs font-semibold text-white border border-white/10">
        {milestone.title}
      </div>
    </motion.div>
  )
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────
function DetailPanel({
  milestone,
  onClose,
  onGallery,
}: {
  milestone: typeof milestones[0]
  onClose: () => void
  onGallery: () => void
}) {
  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 40, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="glass rounded-2xl border border-white/10 overflow-hidden"
    >
      {/* Header */}
      <div className={`bg-gradient-to-r ${milestone.color} p-6 relative`}>
        <button onClick={onClose} className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/20 flex items-center justify-center hover:bg-black/40 transition-colors">
          <X size={14} />
        </button>
        <div className="text-4xl mb-2">{milestone.emoji}</div>
        <h3 className="text-2xl font-black text-white">{milestone.title}</h3>
        <p className="text-white/80 text-sm">{milestone.subtitle}</p>
        <div className="flex items-center gap-1 mt-2 text-white/70 text-xs">
          <Calendar size={12} />
          {milestone.year}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-5">
        <p className="text-slate-400 text-sm leading-relaxed">{milestone.description}</p>

        {/* Highlights */}
        <div>
          <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
            <Trophy size={12} className="text-yellow-400" /> Highlights
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {milestone.highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 text-slate-400 text-xs">
                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${milestone.color}`} />
                {h}
              </div>
            ))}
          </div>
        </div>

        {/* Gallery preview */}
        {milestone.images.length > 0 && (
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
              <Users size={12} className="text-blue-400" /> Photos
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {milestone.images.slice(0, 3).map((img, i) => (
                <motion.div
                  key={img}
                  whileHover={{ scale: 1.05 }}
                  onClick={onGallery}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
                >
                  <Image src={img} alt={`${milestone.title} ${i + 1}`} fill className="object-cover" />
                  {i === 2 && milestone.images.length > 3 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-sm">
                      +{milestone.images.length - 3}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {milestone.images.length === 0 && (
          <div className="text-center py-4 text-slate-600 text-sm border border-dashed border-white/5 rounded-xl">
            📸 Photos coming soon...
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ─── Animated SVG Road ────────────────────────────────────────────────────────
function RoadMap({ active, onSelect }: { active: number | null; onSelect: (id: number) => void }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <div className="relative w-full" style={{ height: '480px' }}>
      {/* SVG Road */}
      <svg
        ref={ref}
        viewBox="0 60 900 360"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Road shadow */}
        <path d={ROAD_PATH} stroke="rgba(0,0,0,0.5)" strokeWidth="22" fill="none" strokeLinecap="round" />
        {/* Road base */}
        <path d={ROAD_PATH} stroke="#1e293b" strokeWidth="18" fill="none" strokeLinecap="round" />
        {/* Road dashes */}
        <path
          d={ROAD_PATH}
          stroke="rgba(148,163,184,0.2)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="12 20"
        />
        {/* Animated glow */}
        {inView && (
          <motion.path
            d={ROAD_PATH}
            stroke="url(#roadGlow)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />
        )}
        <defs>
          <linearGradient id="roadGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Milestone markers — positioned absolutely over SVG */}
      <div className="absolute inset-0">
        {milestones.map((m, i) => (
          <motion.div
            key={m.id}
            className="absolute"
            style={{ left: `${m.x}%`, top: `${m.y}%`, transform: 'translate(-50%, -50%)' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 + i * 0.4, type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* Pulse */}
            {active !== m.id && (
              <motion.div
                className={`absolute inset-0 rounded-full bg-gradient-to-br ${m.color} opacity-40`}
                animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            )}

            {/* Marker button */}
            <motion.button
              onClick={() => onSelect(m.id)}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.9 }}
              className={`relative w-14 h-14 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-2xl border-2 border-white/20 shadow-lg transition-transform`}
              style={{
                boxShadow: `0 0 ${active === m.id ? '30px' : '15px'} ${m.glowColor}`,
              }}
            >
              {m.emoji}
            </motion.button>

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + i * 0.4 }}
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
              <div className="glass px-2.5 py-1 rounded-lg text-[11px] font-semibold text-white/90 border border-white/10 shadow-lg text-center">
                <div>{m.title}</div>
                <div className={`text-[10px] bg-gradient-to-r ${m.color} bg-clip-text text-transparent`}>{m.year}</div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function JourneyPage() {
  const [active, setActive] = useState<number | null>(1)
  const [gallery, setGallery] = useState(false)

  const activeMilestone = milestones.find((m) => m.id === active) ?? null

  const handleSelect = (id: number) => {
    setActive((prev) => (prev === id ? null : id))
  }

  return (
    <div className="min-h-screen grid-bg pt-24 pb-16">
      {/* Hero text */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-blue-400 text-sm mb-4">
            <MapPin size={14} /> Life Journey
          </div>
          <h1 className="text-5xl lg:text-6xl font-black mb-4">
            My <span className="gradient-text">Roadmap</span>
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto">
            Click on each milestone to explore the stories, memories, and moments that shaped who I am.
          </p>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Map — takes 2 cols */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="glass rounded-3xl border border-blue-500/10 p-6 relative overflow-hidden"
            >
              {/* Background texture */}
              <div className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 50%, rgba(139,92,246,0.08) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(59,130,246,0.08) 0%, transparent 50%),
                    radial-gradient(circle at 60% 80%, rgba(245,158,11,0.06) 0%, transparent 40%)`
                }}
              />
              <div className="relative">
                <RoadMap active={active} onSelect={handleSelect} />
              </div>

              {/* Legend */}
              <div className="mt-16 flex flex-wrap justify-center gap-4">
                {milestones.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleSelect(m.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      active === m.id
                        ? `bg-gradient-to-r ${m.color} text-white shadow-lg`
                        : 'glass text-slate-400 hover:text-white border border-white/10'
                    }`}
                  >
                    <span>{m.emoji}</span> {m.title}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-1 sticky top-28">
            <AnimatePresence mode="wait">
              {activeMilestone ? (
                <DetailPanel
                  key={activeMilestone.id}
                  milestone={activeMilestone}
                  onClose={() => setActive(null)}
                  onGallery={() => setGallery(true)}
                />
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass rounded-2xl border border-white/5 p-8 text-center"
                >
                  <div className="text-5xl mb-4">👆</div>
                  <p className="text-slate-500 text-sm">
                    Click a milestone on the map to explore that chapter of my journey
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Timeline strip below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-slate-300">
            Timeline at a Glance
          </h2>
          <div className="relative">
            {/* Line */}
            <div className="absolute left-0 right-0 top-5 h-0.5 bg-gradient-to-r from-violet-500 via-blue-500 via-amber-500 to-green-500 opacity-30" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  onClick={() => handleSelect(m.id)}
                  className={`relative cursor-pointer pt-10 text-center ${active === m.id ? 'opacity-100' : 'opacity-60 hover:opacity-100'} transition-opacity`}
                >
                  {/* Dot on line */}
                  <div className={`absolute top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br ${m.color} border-2 border-[#030712] shadow-lg`}
                    style={{ boxShadow: `0 0 10px ${m.glowColor}` }}
                  />
                  <div className="text-2xl">{m.emoji}</div>
                  <div className="text-xs font-bold text-white mt-1">{m.title}</div>
                  <div className="text-[10px] text-slate-500">{m.year}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {gallery && activeMilestone && activeMilestone.images.length > 0 && (
          <Gallery images={activeMilestone.images} onClose={() => setGallery(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}
