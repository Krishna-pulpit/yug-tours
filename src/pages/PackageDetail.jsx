import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { packages, waPkg, waCustomize, waGeneral } from '../data/data'

function Acc({ title, icon, children, open: defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
      <button onClick={()=>setOpen(v=>!v)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors">
        <span className="font-bold text-slate-900 flex items-center gap-2 text-sm">{icon} {title}</span>
        <motion.span animate={{rotate:open?45:0}} className="text-blue-500 text-xl">+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open&&(<motion.div initial={{height:0}} animate={{height:'auto'}} exit={{height:0}} transition={{duration:0.25}} className="overflow-hidden">
          <div className="px-6 pb-5 border-t border-slate-100 pt-4">{children}</div>
        </motion.div>)}
      </AnimatePresence>
    </div>
  )
}

export default function PackageDetail() {
  const { slug } = useParams()
  const pkg = packages.find(p=>p.slug===slug)
  useEffect(()=>{if(pkg) document.title=`${pkg.title} | Yug Tours & Travels`},[pkg])

  if (!pkg) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-24 px-5">
      <div className="text-7xl">🔍</div>
      <h1 className="font-display font-bold text-2xl">Package not found</h1>
      <Link to="/packages" className="px-6 py-3 rounded-2xl font-bold text-white bg-blue-600 text-sm">All Packages</Link>
    </div>
  )

  const bookMsg = `Hi Yug Tours & Travels, I am interested in the ${pkg.title}. My travel date is [DATE], travelers [NUMBER], budget [BUDGET]. Please share final itinerary and price.`

  return <>
    {/* Hero */}
    <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
      <img onError={(e)=>{e.target.onerror=null;e.target.style.opacity="0";e.target.parentElement.style.background="linear-gradient(135deg,#1e3a5f,#0d9488)"}} src={pkg.img} alt={pkg.title} className="absolute inset-0 w-full h-full object-cover" loading="eager"/>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"/>
      <div className="absolute bottom-0 inset-x-0 p-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-3">
          {pkg.cat.map(c=><span key={c} className="text-xs font-bold uppercase text-white/90 bg-white/15 backdrop-blur px-3 py-1 rounded-full">{c}</span>)}
          {pkg.popular&&<span className="text-xs font-bold bg-amber-500 text-white px-3 py-1 rounded-full">🔥 Popular</span>}
        </div>
        <h1 className="font-display font-black text-white text-3xl md:text-5xl mb-3">{pkg.title}</h1>
        <div className="flex flex-wrap gap-4 text-white/70 text-sm font-medium">
          <span>⏱ {pkg.duration}</span>
          <span>💰 From {pkg.price}/person</span>
          <span>📞 WhatsApp Booking</span>
        </div>
      </div>
    </section>

    <div className="max-w-7xl mx-auto px-5 py-12">
      <div className="grid lg:grid-cols-3 gap-10">
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex flex-wrap gap-1.5">{pkg.highlights.map(h=><span key={h} className="text-xs font-semibold text-teal-700 bg-teal-50 px-3 py-1 rounded-lg">✓ {h}</span>)}</div>
          <div className="bg-white rounded-2xl p-7 shadow-lg border border-slate-100">
            <h2 className="font-display font-bold text-xl text-slate-900 mb-3">📋 Overview</h2>
            <p className="text-slate-600 leading-relaxed">{pkg.overview}</p>
          </div>
          <Acc title="Day-wise Itinerary" icon="📅" open>
            <div className="space-y-4">
              {pkg.itinerary.map((d,i)=>(
                <div key={i} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-sm">{i+1}</div>
                  <div className="flex-1 border-l-2 border-blue-100 pl-4 pb-1">
                    <div className="font-bold text-slate-900 text-sm mb-1">{d.day}: {d.title}</div>
                    <div className="text-slate-500 text-sm leading-relaxed">{d.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Acc>
          <Acc title="Inclusions" icon="✅" open>
            <ul className="space-y-2">{pkg.inclusions.map(i=><li key={i} className="flex items-start gap-2 text-sm text-slate-600"><span className="text-teal-500 font-bold mt-0.5">✓</span>{i}</li>)}</ul>
          </Acc>
          <Acc title="Exclusions" icon="❌">
            <ul className="space-y-2">{pkg.exclusions.map(e=><li key={e} className="flex items-start gap-2 text-sm text-slate-600"><span className="text-red-400 font-bold mt-0.5">✗</span>{e}</li>)}</ul>
          </Acc>
          <Acc title="Hotel Options" icon="🏨">
            <ul className="space-y-2">
              {['Budget: 2-star / guesthouse','Standard: 3-star with views','Premium: 4-star boutique resort','Luxury: 5-star spa resort'].map(h=><li key={h} className="flex items-start gap-2 text-sm text-slate-600"><span className="text-amber-500">🏨</span>{h}</li>)}
            </ul>
          </Acc>
          <Acc title="Things to Carry" icon="🎒">
            <ul className="grid sm:grid-cols-2 gap-2">
              {['Valid ID proof','Warm clothes / layers','Comfortable shoes','Sunscreen & sunglasses','Medicines / first aid','Camera & power bank','Cash (limited ATMs)'].map(t=><li key={t} className="flex items-start gap-2 text-sm text-slate-600"><span className="text-blue-400">•</span>{t}</li>)}
            </ul>
          </Acc>
          <Acc title="Cancellation Policy" icon="⚠️">
            <p className="text-slate-600 text-sm leading-relaxed">Before 15 days — full refund. 7–15 days — 50% refund. Less than 7 days — no refund. Force majeure — full refund or free reschedule. Contact us on WhatsApp for details.</p>
          </Acc>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-5">
            <div className="bg-white rounded-3xl shadow-2xl shadow-black/10 border border-slate-100 p-7">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Starting From</div>
              <div className="text-4xl font-display font-black text-blue-600 mb-1">{pkg.price}</div>
              <div className="text-xs text-slate-400 mb-6">/person (twin sharing)</div>
              <div className="space-y-3 mb-6">
                {[['⏱','Duration',pkg.duration],['📍','Category',pkg.cat.join(', ')],['🏨','Hotels','Budget to Luxury']].map(([i,l,v])=>(
                  <div key={l} className="flex items-center justify-between text-sm border-b border-slate-100 pb-2.5 last:border-0">
                    <span className="text-slate-400 flex items-center gap-1.5">{i} {l}</span>
                    <span className="font-semibold text-slate-800 capitalize">{v}</span>
                  </div>
                ))}
              </div>
              <a href={`https://wa.me/919023749921?text=${encodeURIComponent(bookMsg)}`} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-xl shadow-green-500/25 hover:shadow-green-500/40 hover:-translate-y-0.5 transition-all mb-3">
                💬 Book This Package
              </a>
              <a href={waCustomize(pkg.title)} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center py-3 rounded-2xl font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors text-sm">
                ✏️ Customize Package
              </a>
            </div>
            <Link to="/packages" className="flex items-center gap-2 text-sm text-slate-400 hover:text-blue-600 transition-colors">← Back to All Packages</Link>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile sticky CTA */}
    <div className="fixed bottom-16 inset-x-0 md:hidden z-30 px-4 pb-1">
      <a href={`https://wa.me/919023749921?text=${encodeURIComponent(bookMsg)}`} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-2xl shadow-green-500/30">
        💬 Book This Package on WhatsApp
      </a>
    </div>
  </>
}
