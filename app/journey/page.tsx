'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Users, Trophy, Sparkles, Lock } from 'lucide-react'

// ─── Journey Data with Real Photos & Zigzag Coordinates ────────────────────────
const milestones = [
  {
    id: 1,
    year: '2020–2022',
    title: '10th Class',
    subtitle: 'School Foundations',
    color: 'from-blue-600 to-blue-500',
    glowColor: 'rgba(59,130,246,0.5)',
    borderColor: 'border-blue-500',
    description:
      'The foundational beginning! School days where I first discovered coding, science, and the power of computers. These early years shaped my technical curiosity.',
    highlights: ['First computer class', 'Basic programming exploration', 'Science & tech enthusiast'],
    avatar: '/images/journey/10th/class-photo.png',
    images: ['/images/journey/10th/class-photo.png'],
    x: 7,
    y: 76,
    locked: false,
  },
  {
    id: 2,
    year: '2024–2026',
    title: '+1 & +2',
    subtitle: 'Higher Secondary & Squad',
    color: 'from-blue-600 to-blue-500',
    glowColor: 'rgba(59,130,246,0.5)',
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
    x: 24,
    y: 24,
    locked: false,
  },
  {
    id: 3,
    year: '2024',
    title: 'Expo 2024',
    subtitle: 'District-Level Innovation',
    color: 'from-blue-600 to-blue-500',
    glowColor: 'rgba(59,130,246,0.5)',
    borderColor: 'border-blue-500',
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
    x: 42,
    y: 78,
    locked: false,
  },
  {
    id: 4,
    year: '2024–Present',
    title: 'Madin Polytechnic',
    subtitle: 'Engineering College (Current)',
    color: 'from-blue-600 to-blue-500',
    glowColor: 'rgba(59,130,246,0.5)',
    borderColor: 'border-blue-500',
    description:
      'Currently studying and diving deep into engineering at Madin Polytechnic College. Hands-on hardware, microcontrollers, networking, and building full-stack software applications daily.',
    highlights: ['Diploma in Engineering', 'IoT & Embedded Systems', 'Collaborative Tech Culture', 'Active Journey Node'],
    avatar: null, // placeholder badge
    images: [],
    x: 59,
    y: 24,
    locked: false,
  },
  {
    id: 5,
    year: 'Next Goal',
    title: 'B-Tech',
    subtitle: 'Engineering Degree',
    color: 'from-blue-600 to-blue-500',
    glowColor: 'rgba(59,130,246,0.5)',
    borderColor: 'border-blue-500',
    description:
      'The upcoming degree milestone: Pursuing B-Tech in Computer Science / Artificial Intelligence to master advanced algorithms, machine learning architectures, and modern software engineering.',
    highlights: ['B-Tech Degree in Engineering', 'Advanced Machine Learning & AI', 'System Architecture & CS', 'Upcoming Academic Frontier'],
    avatar: null,
    images: [],
    x: 76,
    y: 78,
    locked: true,
  },
  {
    id: 6,
    year: 'Future Vision',
    title: 'AI Engineer',
    subtitle: 'The Vision & Beyond',
    color: 'from-blue-600 to-blue-500',
    glowColor: 'rgba(59,130,246,0.5)',
    borderColor: 'border-blue-500',
    description:
      'The overarching destination: Becoming a pioneering AI Engineer architecting transformative AI-driven products, intelligent agents, and automated solutions for the world.',
    highlights: ['Autonomous AI Systems', 'Next-gen LLM Applications', 'Impactful Tech Products', 'Endless Innovation'],
    avatar: '/images/main-pic.jpg',
    images: ['/images/main-pic.jpg'],
    x: 93,
    y: 24,
    locked: true,
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
              {milestone.locked && (
                <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-slate-950/80 border border-blue-400 flex items-center justify-center text-blue-300 shadow-md">
                  <Lock size={10} />
                </div>
              )}
            </div>
          ) : milestone.id === 5 ? (
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border-2 border-blue-400/50 flex flex-col items-center justify-center text-blue-400 flex-shrink-0">
              <Lock size={20} className="text-blue-400" />
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
              {milestone.locked && (
                <span className="inline-flex items-center gap-1 ml-1 px-1.5 py-0.5 rounded bg-blue-500/30 text-[10px] text-blue-200">
                  <Lock size={9} /> Locked Stage
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-black flex items-center gap-2">
              {milestone.title}
              {milestone.locked && <Lock size={20} className="text-blue-400" />}
            </h3>
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
            <Trophy size={14} className="text-blue-400" /> Key Milestones & Memories
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
              <h4 className="text-xs font-bold uppercase tracking-widest text-blue-400 flex items-center gap-2">
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
                  className="relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-blue-400/50 shadow-md group"
                >
                  <Image src={img} alt={`Memory ${i + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Sparkles size={16} className="text-blue-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl border border-dashed border-white/15 text-center text-slate-400 text-sm">
            {milestone.locked ? (
              <div className="flex flex-col items-center gap-2 text-blue-300">
                <Lock size={24} className="text-blue-400" />
                <span><strong className="text-white">{milestone.title}</strong> is an upcoming locked stage — journey in progress!</span>
              </div>
            ) : (
              <span>📸 <strong className="text-white">{milestone.title} Photos</strong> will be added here soon!</span>
            )}
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

      {/* ROADMAP SECTION — FULL WIDTH ZIGZAG FROM ONE END OF SCREEN TO THE OTHER */}
      <div ref={mapRef} className="w-full relative py-6 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Responsive map container */}
        <div className="w-full overflow-x-auto scrollbar-none">
          <div className="relative min-w-[860px] w-full h-[460px] sm:h-[500px]">
            {/* SVG Zigzag Road */}
            <svg
              viewBox="0 0 1000 460"
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="blueGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Road bed shadow / subtle background track */}
              <path
                d="M 0 350 L 45 350 Q 70 350 95 320 L 215 135 Q 240 110 265 135 L 395 335 Q 420 360 445 335 L 565 135 Q 590 110 615 135 L 735 335 Q 760 360 785 335 L 905 135 Q 930 110 955 110 L 1000 110"
                stroke="rgba(59, 130, 246, 0.15)"
                strokeWidth="24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Luminous Road Glow */}
              <path
                d="M 0 350 L 45 350 Q 70 350 95 320 L 215 135 Q 240 110 265 135 L 395 335 Q 420 360 445 335 L 565 135 Q 590 110 615 135 L 735 335 Q 760 360 785 335 L 905 135 Q 930 110 955 110 L 1000 110"
                stroke="#3b82f6"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.5"
                filter="url(#blueGlowFilter)"
              />

              {/* Solid Blue Path */}
              <path
                d="M 0 350 L 45 350 Q 70 350 95 320 L 215 135 Q 240 110 265 135 L 395 335 Q 420 360 445 335 L 565 135 Q 590 110 615 135 L 735 335 Q 760 360 785 335 L 905 135 Q 930 110 955 110 L 1000 110"
                stroke="#3b82f6"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Animated Center Flow Line */}
              <motion.path
                d="M 0 350 L 45 350 Q 70 350 95 320 L 215 135 Q 240 110 265 135 L 395 335 Q 420 360 445 335 L 565 135 Q 590 110 615 135 L 735 335 Q 760 360 785 335 L 905 135 Q 930 110 955 110 L 1000 110"
                stroke="#93c5fd"
                strokeWidth="2"
                strokeDasharray="10 14"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 2.2, ease: 'easeInOut' }}
              />
            </svg>

            {/* REAL PHOTO MARKERS on the Zigzag vertices */}
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
                      className="absolute inset-0 rounded-2xl bg-blue-500"
                      animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    />
                  )}

                  {/* Photo Pin Avatar */}
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 shadow-2xl transition-all duration-300 ${
                      isSelected
                        ? 'border-blue-400 ring-4 ring-blue-500/40'
                        : 'border-white/30 opacity-90 group-hover:opacity-100 group-hover:border-white'
                    }`}
                    style={{
                      boxShadow: isSelected ? '0 0 35px rgba(59,130,246,0.6)' : '0 10px 25px rgba(0,0,0,0.6)',
                    }}
                  >
                    {m.avatar ? (
                      <>
                        <Image src={m.avatar} alt={m.title} fill className="object-cover" />
                        {m.locked && (
                          <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[1px] flex items-center justify-center z-20">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white shadow-[0_0_15px_rgba(59,130,246,0.9)]">
                              <Lock size={16} strokeWidth={2.5} />
                            </div>
                          </div>
                        )}
                      </>
                    ) : m.id === 5 ? (
                      <div className="w-full h-full bg-gradient-to-br from-slate-900 to-blue-950 border border-blue-500/40 flex flex-col items-center justify-center text-blue-400 p-1">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-blue-600/40 border-2 border-blue-400 flex items-center justify-center text-white shadow-[0_0_15px_rgba(59,130,246,0.6)] mb-1">
                          <Lock size={16} strokeWidth={2.5} />
                        </div>
                        <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-blue-200">B-Tech</span>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-slate-900 border border-blue-500/30 flex items-center justify-center text-3xl font-bold text-blue-400">
                        🎓
                      </div>
                    )}
                  </motion.div>

                  {/* Corner Floating Lock Badge */}
                  {m.locked && (
                    <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white shadow-[0_0_12px_rgba(59,130,246,0.9)] z-30">
                      <Lock size={13} strokeWidth={2.5} />
                    </div>
                  )}

                  {/* Label badge beneath marker */}
                  <div
                    className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : 'glass text-slate-300 group-hover:text-white border border-white/10'
                    }`}
                  >
                    {m.locked && <Lock size={12} strokeWidth={2.5} className={isSelected ? 'text-white' : 'text-blue-400'} />}
                    <span>{m.title}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Quick Selector Bar */}
        <div className="max-w-5xl mx-auto px-6 mt-8 flex flex-wrap justify-center gap-3">
          {milestones.map((m) => (
            <button
              key={m.id}
              onClick={() => setActive(m.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                active === m.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                  : 'glass text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {m.avatar ? (
                <div className="relative w-5 h-5 rounded-full overflow-hidden border border-white/40">
                  <Image src={m.avatar} alt={m.title} fill className="object-cover" />
                </div>
              ) : m.locked ? (
                <Lock size={13} className="text-blue-400" />
              ) : (
                <span>🎓</span>
              )}
              <span>{m.title}</span>
              {m.locked ? (
                <span className="text-blue-300/80 text-[11px] font-medium flex items-center gap-0.5">
                  <Lock size={9} /> ({m.year})
                </span>
              ) : (
                <span className="text-white/60 text-[11px] font-normal">({m.year})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ACTIVE MILESTONE DETAIL PANEL */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-12">
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
