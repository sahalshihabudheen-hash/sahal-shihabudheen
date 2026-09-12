export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#030712] py-8">
      <div className="max-w-7xl mx-auto px-6 text-center text-slate-600 text-xs">
        © 2026 Sahal Shihabudheen · AI Engineer & Developer · Kerala, India
      </div>

      {/* Subtle glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
    </footer>
  )
}
