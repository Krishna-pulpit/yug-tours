import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { waGeneral } from '../data/data'

const links = [
  { to: '/', label: 'Home' },
  { to: '/packages', label: 'Packages' },
  { to: '/destinations', label: 'Destinations' },
  { to: '/about', label: 'About' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

/* Premium SVG plane-compass logo mark */
function LogoMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
        <linearGradient id="logoGrad2" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2dd4bf" />
        </linearGradient>
      </defs>
      {/* Rounded square bg */}
      <rect width="44" height="44" rx="12" fill="url(#logoGrad)" />
      {/* Globe circle */}
      <circle cx="22" cy="22" r="11" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
      {/* Horizontal line through globe */}
      <path d="M11 22 Q17 18 22 22 Q27 26 33 22" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" fill="none" strokeLinecap="round" />
      {/* Vertical line */}
      <path d="M22 11 Q18 17 22 22 Q26 27 22 33" stroke="white" strokeWidth="1.5" strokeOpacity="0.6" fill="none" strokeLinecap="round" />
      {/* Airplane */}
      <g transform="translate(22,22) rotate(-35) translate(-7,-7)">
        <path d="M7 2L12 7L7 8.5L2 7L7 2Z" fill="white" />
        <path d="M7 8.5L9 12L7 11L5 12L7 8.5Z" fill="white" fillOpacity="0.7" />
        <path d="M3.5 6.5L0 8.5L2 7L0 5.5L3.5 6.5Z" fill="white" fillOpacity="0.5" />
      </g>
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => { setOpen(false) }, [loc])
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const t = !scrolled

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          t ? 'py-5' : 'py-3 bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-gray-100/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">

          {/* ── LOGO ── */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="Yug Tours & Travels Home">
            <motion.div whileHover={{ scale: 1.06, rotate: 2 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
              <LogoMark size={44} />
            </motion.div>
            <div className="leading-none">
              <div className={`font-display font-black text-[1.25rem] tracking-tight transition-colors duration-300 ${t ? 'text-white' : 'text-slate-900'}`}>
                Yug Tours
              </div>
              <div className={`text-[0.6rem] font-bold uppercase tracking-[0.22em] mt-0.5 transition-colors duration-300 ${t ? 'text-white/45' : 'text-slate-400'}`}>
                & Travels
              </div>
            </div>
          </Link>

          {/* ── DESKTOP NAV ── */}
          <ul className="hidden lg:flex items-center gap-0.5 list-none">
            {links.map(l => (
              <li key={l.to}>
                <NavLink
                  to={l.to} end={l.to === '/'}
                  className={({ isActive }) =>
                    `relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? (t ? 'text-white bg-white/15 shadow-inner' : 'text-blue-600 bg-blue-50')
                        : (t ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/80')
                    }`
                  }
                >{l.label}</NavLink>
              </li>
            ))}
          </ul>

          {/* ── CTA + HAMBURGER ── */}
          <div className="flex items-center gap-3">
            <motion.a
              href={waGeneral} target="_blank" rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="hidden sm:flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-sm font-bold text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/45 transition-shadow duration-300"
              style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}
            >
              {/* WhatsApp SVG */}
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.592-.832-6.32-2.222l-.44-.364-3.25 1.089 1.089-3.25-.364-.44A9.956 9.956 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
              </svg>
              Book on WhatsApp
            </motion.a>

            <button
              onClick={() => setOpen(v => !v)}
              className="lg:hidden p-2 rounded-lg"
              aria-label="Toggle menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                {[0,1,2].map(i => (
                  <motion.span key={i}
                    animate={open
                      ? (i===0 ? {rotate:45,y:8} : i===1 ? {opacity:0,scaleX:0} : {rotate:-45,y:-8})
                      : {rotate:0,y:0,opacity:1,scaleX:1}
                    }
                    className={`block h-0.5 rounded-full transition-colors ${t ? 'bg-white' : 'bg-slate-800'}`}
                  />
                ))}
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/97 backdrop-blur-xl lg:hidden flex flex-col"
          >
            {/* Mobile logo */}
            <div className="flex items-center gap-3 px-6 pt-6 pb-4 border-b border-white/10">
              <LogoMark size={40} />
              <div>
                <div className="font-display font-black text-white text-lg">Yug Tours</div>
                <div className="text-[0.55rem] font-bold uppercase tracking-[0.22em] text-white/40">& Travels</div>
              </div>
            </div>

            <div className="flex-1 flex flex-col px-6 py-6 gap-1 overflow-y-auto">
              {links.map((l, i) => (
                <motion.div key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <NavLink to={l.to} end={l.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center px-5 py-4 rounded-2xl text-lg font-bold transition-all ${
                        isActive
                          ? 'text-blue-400 bg-blue-500/10'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >{l.label}</NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-6 pt-6 border-t border-white/10"
              >
                <a href={waGeneral} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl text-base font-bold text-white shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.592-.832-6.32-2.222l-.44-.364-3.25 1.089 1.089-3.25-.364-.44A9.956 9.956 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                  </svg>
                  Book Your Trip on WhatsApp
                </a>
                <p className="text-center text-white/25 text-xs mt-3">Typically replies in minutes</p>
              </motion.div>
            </div>

            <button onClick={() => setOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-white text-lg transition-colors"
              aria-label="Close menu"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
