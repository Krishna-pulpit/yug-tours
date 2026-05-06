import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { packages, destinations, reviews, faqs, waGeneral, waPkg, waDest, waPlanner } from '../data/data'

/* ─── Animated Section ─── */
function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >{children}</motion.div>
  )
}

/* ─── HERO ─── */
function Hero() {
  const { scrollY } = useScroll()
  const imgY = useTransform(scrollY, [0, 600], [0, 150])
  const textY = useTransform(scrollY, [0, 400], [0, -60])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <img onError={(e)=>{e.target.onerror=null;e.target.style.opacity="0";e.target.parentElement.style.background="linear-gradient(135deg,#1e3a5f,#0d9488)"}} src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80" alt="Mountain landscape" className="w-full h-[120%] object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/80" />
      </motion.div>
      <motion.div style={{ y: textY, opacity }} className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-5 w-full">
          <div className="max-w-2xl">
            <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.3 }}
              className="flex items-center gap-4 mb-7 flex-wrap">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                </div>
                <div>
                  <div className="text-white font-black text-base leading-none">5,000+</div>
                  <div className="text-white/50 text-[0.65rem] font-medium mt-0.5">Happy Travelers</div>
                </div>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-400/20 border border-blue-400/40 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div>
                  <div className="text-white font-black text-base leading-none">50+</div>
                  <div className="text-white/50 text-[0.65rem] font-medium mt-0.5">Destinations</div>
                </div>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-green-400/20 border border-green-400/40 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div>
                  <div className="text-white font-black text-base leading-none">100%</div>
                  <div className="text-white/50 text-[0.65rem] font-medium mt-0.5">Verified Hotels</div>
                </div>
              </div>
              <div className="w-px h-8 bg-white/15" />
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-teal-400/20 border border-teal-400/40 flex items-center justify-center">
                  <svg className="w-4 h-4 text-teal-300" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.592-.832-6.32-2.222l-.44-.364-3.25 1.089 1.089-3.25-.364-.44A9.956 9.956 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                </div>
                <div>
                  <div className="text-white font-black text-base leading-none">24/7</div>
                  <div className="text-white/50 text-[0.65rem] font-medium mt-0.5">WhatsApp Support</div>
                </div>
              </div>
            </motion.div>
            <motion.h1 initial={{ opacity:0,y:40 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.5, duration:0.8 }}
              className="font-display font-black text-white leading-[1.08] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              Explore The World With{' '}
              <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">Yug Tours</span>
            </motion.h1>
            <motion.p initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.7 }}
              className="text-white/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Custom tour packages, family holidays, honeymoon trips, group tours, hotel & cab booking — all planned through WhatsApp.
            </motion.p>
            <motion.div initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.9 }}
              className="flex flex-wrap gap-4">
              <a href={waGeneral} target="_blank" rel="noopener noreferrer"
                className="group px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3">
                <span className="text-xl">💬</span> Book on WhatsApp
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <Link to="/packages" className="px-8 py-4 rounded-2xl font-bold text-white border-2 border-white/30 hover:bg-white hover:text-slate-900 transition-all duration-300">
                Explore Packages
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

/* ─── TRUST BAR (between Hero and Planner) ─── */
function TrustBar() {
  const items = [
    {
      icon: (
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
      ),
      title: 'Customized Packages',
      sub: 'Tailored to your dates & budget',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      ),
      title: 'Best Price Guarantee',
      sub: 'No hidden charges, ever',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
      ),
      title: 'Hotel + Cab + Sightseeing',
      sub: 'Complete end-to-end service',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.592-.832-6.32-2.222l-.44-.364-3.25 1.089 1.089-3.25-.364-.44A9.956 9.956 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
      ),
      title: '24/7 WhatsApp Support',
      sub: 'Always available during your trip',
    },
  ]
  return (
    <div className="bg-slate-950 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-5 py-5 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/8">
        {items.map(item => (
          <div key={item.title} className="flex items-center gap-3 px-5 first:pl-0 last:pr-0">
            <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <div>
              <div className="text-white text-xs font-bold leading-tight">{item.title}</div>
              <div className="text-white/40 text-[0.6rem] mt-0.5 leading-tight">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── TRIP PLANNER ─── */
function Planner() {
  const [f, setF] = useState({ dest:'', date:'', travelers:'', budget:'', type:'' })
  const up = k => e => setF(p => ({ ...p, [k]: e.target.value }))
  const inp = 'w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all placeholder:text-slate-400'
  return (
    <Reveal className="px-5 pt-12 pb-4">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl shadow-black/10 border border-slate-100 p-8 md:p-10">
        <div className="flex items-center gap-3 mb-7">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-xl text-white shadow-lg shadow-blue-500/30">🗺️</div>
          <div>
            <h2 className="font-display font-bold text-xl text-slate-900">Plan Your Dream Trip</h2>
            <p className="text-slate-500 text-sm">Get a free quote on WhatsApp in minutes</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
          <div><label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Destination</label><input type="text" placeholder="e.g. Manali" className={inp} value={f.dest} onChange={up('dest')}/></div>
          <div><label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Travel Date</label><input type="date" className={inp} value={f.date} onChange={up('date')}/></div>
          <div><label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Travelers</label><input type="number" min="1" placeholder="2" className={inp} value={f.travelers} onChange={up('travelers')}/></div>
          <div><label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Budget</label>
            <select className={inp} value={f.budget} onChange={up('budget')}><option value="">Select</option><option>Under ₹15K</option><option>₹15K–₹30K</option><option>₹30K–₹60K</option><option>₹60K+</option></select></div>
          <div><label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Trip Type</label>
            <select className={inp} value={f.type} onChange={up('type')}><option value="">Select</option><option>Family</option><option>Honeymoon</option><option>Group</option><option>Pilgrimage</option><option>Corporate</option><option>Solo</option></select></div>
          <div>
            <button onClick={()=>window.open(waPlanner(f),'_blank')}
              className="w-full py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:-translate-y-0.5 transition-all text-sm flex items-center justify-center gap-2">
              💬 Get Quote
            </button>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

/* ─── PACKAGE CARD ─── */
function PkgCard({ p, i }) {
  return (
    <Reveal delay={i * 0.1} className="group">
      <div className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-2 transition-all duration-500 border border-slate-100">
        <div className="relative h-56 overflow-hidden">
          <img onError={(e)=>{e.target.onerror=null;e.target.style.opacity="0";e.target.parentElement.style.background="linear-gradient(135deg,#1e3a5f,#0d9488)"}} src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          {p.popular && <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[0.65rem] font-black uppercase tracking-wider text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">🔥 Popular</span>}
          <span className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-black/40 backdrop-blur-md">⏱ {p.duration}</span>
        </div>
        <div className="p-6">
          <h3 className="font-display font-bold text-slate-900 text-lg mb-2">{p.title}</h3>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {p.highlights.slice(0,3).map(h=><span key={h} className="text-[0.7rem] font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg">✓ {h}</span>)}
          </div>
          <div className="flex items-end justify-between mb-5">
            <div>
              <div className="text-[0.65rem] uppercase tracking-wider text-slate-400 font-bold">Starting From</div>
              <div className="text-2xl font-black text-blue-600">{p.price}<span className="text-xs text-slate-400 font-medium ml-1">/person</span></div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to={`/packages/${p.slug}`} className="flex-1 text-center py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors">View Details</Link>
            <a href={waPkg(p.title)} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-sm shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:-translate-y-0.5 transition-all">💬 Book Now</a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

/* ─── HOME PAGE ─── */
export default function Home() {
  useEffect(() => { document.title = 'Yug Tours & Travels | Best Tour Packages, Holiday Trips & Travel Booking' }, [])
  const featured = packages.filter(p => p.popular)
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <>
      <Hero />
      <TrustBar />
      <Planner />

      {/* ── Popular Packages ── */}
      <section className="py-24 px-5">
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Top Picks</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mt-1">Most Popular Packages</h2>
              <p className="text-slate-500 mt-2 max-w-lg">Handcrafted holiday experiences loved by thousands of travelers.</p>
            </div>
            <Link to="/packages" className="px-6 py-3 rounded-2xl font-bold text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors shrink-0">View All Packages →</Link>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {featured.map((p,i) => <PkgCard key={p.slug} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* ── Offer Banner ── */}
      <section className="py-20 px-5 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30"><img onError={(e)=>{e.target.onerror=null;e.target.style.opacity="0";e.target.parentElement.style.background="linear-gradient(135deg,#1e3a5f,#0d9488)"}} src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=60" alt="" className="w-full h-full object-cover"/></div>
        <div className="absolute inset-0 bg-slate-950/70" />
        <Reveal className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-amber-400 font-bold text-sm uppercase tracking-wider">🎁 Limited Time Offer</span>
          <h2 className="font-display font-black text-white text-3xl md:text-5xl mt-3 mb-4">Summer Special — Himachal & Kashmir</h2>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">Book now for May–July travel and get priority planning + best hotel rates. Limited slots available.</p>
          <a href={waPkg('Summer Special Himachal/Kashmir')} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-2xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1 transition-all text-lg">
            🎁 Claim This Offer
          </a>
        </Reveal>
      </section>

      {/* ── Destinations ── */}
      <section className="py-24 px-5 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="text-sm font-bold text-teal-600 uppercase tracking-wider">Explore</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mt-1">Top Destinations</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {destinations.slice(0,5).map((d,i) => (
              <Reveal key={d.slug} delay={i*0.08}>
                <div className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img onError={(e)=>{e.target.onerror=null;e.target.style.opacity="0";e.target.parentElement.style.background="linear-gradient(135deg,#1e3a5f,#0d9488)"}} src={d.img} alt={d.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-0 p-5 w-full">
                    <h3 className="font-display font-bold text-white text-lg mb-1">{d.name}</h3>
                    <p className="text-white/60 text-xs mb-3 line-clamp-2">{d.desc}</p>
                    <Link to={`/packages?dest=${d.slug}`}
                      className="inline-flex items-center gap-1 text-amber-400 text-xs font-bold group-hover:gap-2 transition-all">
                      Explore →
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/destinations" className="px-6 py-3 rounded-2xl font-bold text-sm text-teal-600 bg-teal-50 hover:bg-teal-100 transition-colors">All Destinations →</Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose ── */}
      <section className="py-24 px-5 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="text-sm font-bold text-amber-400 uppercase tracking-wider">Why Us</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mt-1">Why Choose Yug Tours?</h2>
            <p className="text-white/50 mt-3 max-w-lg mx-auto">We make travel simple, safe, and unforgettable.</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[['🎯','Personalized Plans','Every trip uniquely crafted for you.'],['💰','Budget-Friendly','Best prices, no hidden costs — ever.'],['🏨','Verified Hotels','Only trusted, reviewed properties.'],['💑','Honeymoon Experts','Special romantic touches included.'],['👥','Group Management','College, corporate, family groups — handled smoothly.'],['📊','Transparent Pricing','You know exactly what you pay for.'],['🛡️','Safe & Reliable','Experienced drivers and backup plans.'],['📞','24/7 WhatsApp Support','Always just one message away.']].map(([icon,title,desc],i)=>(
              <Reveal key={title} delay={i*0.06}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 text-center backdrop-blur-sm">
                  <span className="text-4xl block mb-3">{icon}</span>
                  <h3 className="font-bold text-white text-sm mb-2">{title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 px-5">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-16">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Simple Process</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mt-1">How Booking Works</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-300 to-teal-300" />
            {[['🗺️','Choose Destination','Browse packages or tell us your dream spot.'],['💬','Chat on WhatsApp','Click "Book on WhatsApp" — connect with our expert.'],['📋','Share Details','Travel date, people, budget, preferences.'],['✅','Confirm & Travel','Get your personalized itinerary — we handle everything!']].map(([icon,title,desc],i)=>(
              <Reveal key={title} delay={i*0.15} className="text-center relative z-10">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-blue-500/20 border-4 border-white">
                  <span className="text-4xl">{icon}</span>
                </div>
                <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">Step {i+1}</div>
                <h3 className="font-display font-bold text-slate-900 text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm">{desc}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-14">
            <a href={waGeneral} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-xl shadow-green-500/25 hover:shadow-green-500/40 hover:-translate-y-1 transition-all text-base">
              💬 Start Planning My Trip
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── Experiences ── */}
      <section className="py-20 px-5 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="text-sm font-bold text-teal-600 uppercase tracking-wider">For Every Traveler</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mt-1">Featured Experiences</h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[['💑','Honeymoon','from-rose-50 to-pink-100'],['👨‍👩‍👧','Family','from-blue-50 to-sky-100'],['🧗','Adventure','from-green-50 to-emerald-100'],['🙏','Pilgrimage','from-amber-50 to-yellow-100'],['🏢','Corporate','from-slate-50 to-gray-100'],['🌅','Weekend','from-orange-50 to-amber-100'],['✈️','International','from-indigo-50 to-violet-100'],['👑','Luxury','from-purple-50 to-fuchsia-100']].map(([icon,title,bg],i)=>(
              <Reveal key={title} delay={i*0.05}>
                <button onClick={()=>window.open(waPkg(title+' Package'),'_blank')}
                  className={`w-full bg-gradient-to-br ${bg} rounded-2xl p-6 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer border border-white`}>
                  <span className="text-4xl block mb-2">{icon}</span>
                  <div className="font-bold text-slate-700 text-sm">{title}</div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-24 px-5">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">Traveler Stories</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mt-1">What Our Travelers Say</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {reviews.map((r,i)=>(
              <Reveal key={r.name} delay={i*0.1}>
                <div className="bg-white rounded-3xl p-8 shadow-lg shadow-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100">
                  <div className="text-amber-400 text-sm mb-4">⭐⭐⭐⭐⭐</div>
                  <p className="text-slate-600 text-sm leading-relaxed italic mb-6">"{r.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{background:r.color}}>
                      {r.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{r.name}</div>
                      <div className="text-slate-400 text-xs">🗺️ {r.trip}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ── About Teaser ── */}
      <section className="py-24 px-5 bg-slate-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative">
              <img onError={(e)=>{e.target.onerror=null;e.target.style.opacity="0";e.target.parentElement.style.background="linear-gradient(135deg,#1e3a5f,#0d9488)"}} src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80" alt="Travel planning" className="w-full h-[480px] object-cover rounded-3xl shadow-2xl" loading="lazy" />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-2xl border border-slate-100">
                <div className="font-display font-black text-3xl text-blue-600">5K+</div>
                <div className="text-xs text-slate-400 font-semibold">Happy Travelers</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <span className="text-sm font-bold text-teal-600 uppercase tracking-wider">Our Story</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mt-1 mb-5">Making Travel Simple</h2>
            <p className="text-slate-600 leading-relaxed mb-4">Yug Tours & Travels creates memorable journeys with customized packages, reliable hotels, comfortable transport, and personal support from planning to return.</p>
            <div className="bg-teal-50 border-l-4 border-teal-500 rounded-r-xl p-5 mb-8">
              <div className="text-xs font-bold text-teal-700 uppercase mb-1">🎯 Mission</div>
              <p className="text-slate-600 text-sm italic">"To make travel simple, affordable, safe, and memorable."</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {['Domestic & International','Honeymoon Specialists','Group Experts','24/7 WhatsApp Support','Hotel & Cab Booking','Transparent Pricing'].map(f=>(
                <div key={f} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                  <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center text-[0.65rem]">✓</span>{f}
                </div>
              ))}
            </div>
            <div className="flex gap-4 flex-wrap">
              <a href={waGeneral} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/25 hover:-translate-y-0.5 transition-all text-sm">💬 Talk to Us</a>
              <Link to="/about" className="px-6 py-3 rounded-2xl font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors text-sm">Learn More →</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-5">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">FAQ</span>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mt-1">Frequently Asked Questions</h2>
          </Reveal>
          <div className="space-y-3">
            {faqs.slice(0,6).map((faq,i)=>(
              <Reveal key={i} delay={i*0.05}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <button onClick={()=>setOpenFaq(openFaq===i?null:i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left gap-4">
                    <span className="font-semibold text-slate-800 text-sm">{faq.q}</span>
                    <motion.span animate={{rotate:openFaq===i?45:0}} className="text-blue-500 text-xl shrink-0 font-light">+</motion.span>
                  </button>
                  {openFaq===i && (
                    <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} className="overflow-hidden">
                      <div className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>
                    </motion.div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-10">
            <a href={waGeneral} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/25 text-sm">💬 Ask on WhatsApp</a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
