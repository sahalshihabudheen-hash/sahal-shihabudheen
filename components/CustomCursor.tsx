'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  // Direct mouse coordinates
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Smooth trailing spring for the outer ring
  const springConfig = { damping: 28, stiffness: 300, mass: 0.4 }
  const trailX = useSpring(mouseX, springConfig)
  const trailY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Only enable on desktop/fine pointer devices
    if (typeof window === 'undefined') return
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Detect clickable elements for magnetic expansion
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer')
      setIsHovered(!!isInteractive)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)
    document.documentElement.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY, isVisible])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer trailing ring */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicked ? 0.8 : isHovered ? 1.7 : 1,
          borderColor: isHovered ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.35)',
          backgroundColor: isHovered ? 'rgba(59, 130, 246, 0.12)' : 'rgba(59, 130, 246, 0.02)',
        }}
        transition={{ duration: 0.15 }}
        className="fixed w-9 h-9 rounded-full border border-blue-500/35 pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.15)]"
      />

      {/* Center sharp dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicked ? 0.7 : isHovered ? 0.5 : 1,
        }}
        transition={{ duration: 0.1 }}
        className="fixed w-2 h-2 rounded-full bg-blue-400 pointer-events-none shadow-[0_0_8px_rgba(59,130,246,0.9)]"
      />
    </div>
  )
}
