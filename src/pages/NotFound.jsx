import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function NotFound() {
  useEffect(() => { document.title = 'Page Not Found | Yug Tours & Travels' }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 pt-20 px-5">
      <div className="text-center max-w-md">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="text-8xl mb-6">
          🗺️
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="font-display font-black text-slate-900 text-4xl mb-4">
          Page Not Found
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
          className="text-slate-500 text-lg mb-8">
          Looks like this page went on a trip without us! Let's get you back on track.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
          className="flex gap-4 justify-center flex-wrap">
          <Link to="/" className="px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg text-sm">
            ← Back to Home
          </Link>
          <Link to="/packages" className="px-8 py-3 rounded-2xl font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 text-sm">
            Explore Packages
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
