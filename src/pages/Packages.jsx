import { useState, useMemo, useEffect, useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { packages, destinations, waGeneral, waPkg, waPlanner } from '../data/data'

function R({ children, className='', delay=0 }) {
  const ref = useRef(null); const v = useInView(ref,{once:true,margin:'-50px'})
  return <motion.div ref={ref} initial={{opacity:0,y:40}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.6,delay}} className={className}>{children}</motion.div>
}

const cats = [
  {id:'all',l:'All'},
  {id:'domestic',l:'🇮🇳 Domestic'},
  {id:'international',l:'🌍 International'},
  {id:'honeymoon',l:'💑 Honeymoon'},
  {id:'family',l:'👨‍👩‍👧 Family'},
  {id:'adventure',l:'🧗 Adventure'},
  {id:'pilgrimage',l:'🙏 Pilgrimage'},
]

// Map destination slug → keywords found in package slug/title
const destKeywords = {
  himachal: ['manali','himachal'],
  kashmir: ['kashmir'],
  goa: ['goa'],
  kerala: ['kerala'],
  rajasthan: ['rajasthan'],
  uttarakhand: ['char-dham','chardham','uttarakhand','kedarnath'],
  dubai: ['dubai'],
  thailand: ['thailand'],
  singapore: ['singapore'],
  bali: ['bali'],
}

export default function Packages() {
  const [searchParams] = useSearchParams()
  const destParam = searchParams.get('dest') || ''

  const [cat, setCat] = useState('all')
  const [planner, setPlanner] = useState({dest:'',date:'',travelers:'',budget:'',type:''})
  const up = k => e => setPlanner(p=>({...p,[k]:e.target.value}))

  // Pre-fill planner destination from URL param
  useEffect(() => {
    if (destParam) {
      const d = destinations.find(d => d.slug === destParam)
      if (d) setPlanner(p => ({...p, dest: d.name}))
    }
  }, [destParam])

  useEffect(() => {
    const destName = destinations.find(d => d.slug === destParam)?.name
    document.title = destName
      ? `${destName} Tour Packages | Yug Tours & Travels`
      : 'Tour Packages | Yug Tours & Travels'
  }, [destParam])

  const destInfo = destParam ? destinations.find(d => d.slug === destParam) : null

  const filtered = useMemo(() => {
    let list = packages

    // Filter by destination keyword if ?dest= param present
    if (destParam && destKeywords[destParam]) {
      const kws = destKeywords[destParam]
      list = list.filter(p => kws.some(kw => p.slug.includes(kw) || p.title.toLowerCase().includes(kw)))
    }

    // Also filter by category tab
    if (cat !== 'all') {
      list = list.filter(p => p.cat.includes(cat))
    }

    return list
  }, [cat, destParam])

  const inp = 'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all'

  return <>
    {/* Hero */}
    <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
      <img
        onError={(e)=>{e.target.onerror=null;e.target.style.opacity="0";e.target.parentElement.style.background="linear-gradient(135deg,#1e3a5f,#0d9488)"}}
        src={destInfo ? destInfo.img.replace('w=600','w=1400') : "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&q=80"}
        alt={destInfo ? destInfo.name : "Travel landscape"}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 to-slate-950/80"/>
      <div className="relative z-10 h-full flex items-center justify-center text-center px-5">
        <div>
          <motion.span initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
            className="text-amber-400 font-bold text-sm uppercase tracking-wider block mb-3">
            {destInfo ? `Explore ${destInfo.name}` : 'Explore Our Tours'}
          </motion.span>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.15}}
            className="font-display font-black text-white text-4xl md:text-6xl mb-4">
            {destInfo ? `${destInfo.name} Packages` : 'All Tour Packages'}
          </motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}}
            className="text-white/60 text-lg max-w-xl mx-auto">
            {destInfo ? destInfo.desc : 'Handcrafted holidays for every traveler — family, honeymoon, group, pilgrimage, and adventure.'}
          </motion.p>
        </div>
      </div>
    </section>

    {/* Trip Planner */}
    <R className="-mt-8 relative z-20 px-5">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl shadow-black/10 border border-slate-100 p-6 md:p-8">
        <h3 className="font-display font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-white text-sm shadow-md">🗺️</span>
          {destInfo ? `Plan Your ${destInfo.name} Trip` : "Can't find what you need? Get a custom quote"}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
          <div>
            <label className="block text-[0.65rem] font-bold text-slate-400 uppercase mb-1">Destination</label>
            <input type="text" placeholder="e.g. Manali" className={inp} value={planner.dest} onChange={up('dest')}/>
          </div>
          <div>
            <label className="block text-[0.65rem] font-bold text-slate-400 uppercase mb-1">Date</label>
            <input type="date" className={inp} value={planner.date} onChange={up('date')}/>
          </div>
          <div>
            <label className="block text-[0.65rem] font-bold text-slate-400 uppercase mb-1">Travelers</label>
            <input type="number" min="1" placeholder="2" className={inp} value={planner.travelers} onChange={up('travelers')}/>
          </div>
          <div>
            <label className="block text-[0.65rem] font-bold text-slate-400 uppercase mb-1">Budget</label>
            <select className={inp} value={planner.budget} onChange={up('budget')}>
              <option value="">Select</option>
              <option>Under ₹15K</option>
              <option>₹15K–₹30K</option>
              <option>₹30K–₹60K</option>
              <option>₹60K+</option>
            </select>
          </div>
          <div>
            <label className="block text-[0.65rem] font-bold text-slate-400 uppercase mb-1">Type</label>
            <select className={inp} value={planner.type} onChange={up('type')}>
              <option value="">Select</option>
              <option>Family</option>
              <option>Honeymoon</option>
              <option>Group</option>
              <option>Pilgrimage</option>
              <option>Corporate</option>
            </select>
          </div>
          <div>
            <button onClick={()=>window.open(waPlanner(planner),'_blank')}
              className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/25 hover:-translate-y-0.5 transition-all text-sm">
              💬 Get Quote
            </button>
          </div>
        </div>
      </div>
    </R>

    {/* Filter + Grid */}
    <section className="py-16 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {cats.map(c=>(
            <button key={c.id} onClick={()=>setCat(c.id)}
              className={`px-5 py-2.5 rounded-2xl text-sm font-bold border transition-all duration-300 ${
                cat===c.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
              }`}>
              {c.l}
            </button>
          ))}
        </div>

        <p className="text-slate-400 text-sm mb-8">
          {filtered.length} package{filtered.length!==1?'s':''} found
          {destInfo ? ` for ${destInfo.name}` : ''}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {filtered.map((p,i)=>(
              <R key={p.slug} delay={i*0.08}>
                <div className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-black/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      onError={(e)=>{e.target.onerror=null;e.target.style.opacity="0";e.target.parentElement.style.background="linear-gradient(135deg,#1e3a5f,#0d9488)"}}
                      src={p.img} alt={p.title} loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"/>
                    {p.popular && <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[0.6rem] font-black uppercase text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">🔥 Popular</span>}
                    <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white bg-black/40 backdrop-blur">⏱ {p.duration}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-slate-900 text-base mb-2">{p.title}</h3>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {p.highlights.slice(0,3).map(h=>(
                        <span key={h} className="text-[0.65rem] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">✓ {h}</span>
                      ))}
                    </div>
                    <div className="text-xl font-black text-blue-600 mb-4">
                      {p.price}<span className="text-xs text-slate-400 font-medium ml-1">/person</span>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/packages/${p.slug}`} className="flex-1 text-center py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors">Details</Link>
                      <a href={waPkg(p.title)} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-sm shadow-green-500/25 hover:-translate-y-0.5 transition-all">💬 Book</a>
                    </div>
                  </div>
                </div>
              </R>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-display font-bold text-xl text-slate-900 mb-3">No packages found</h3>
            <p className="text-slate-500 mb-6">Try a different filter or tell us what you need.</p>
            <a href={waGeneral} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 text-sm inline-flex items-center gap-2">💬 Ask for Custom Package</a>
          </div>
        )}

        {/* Bottom CTA */}
        <R className="mt-16">
          <div className="text-center p-12 rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200">
            <h3 className="font-display font-bold text-2xl text-slate-900 mb-3">Can't Find Your Dream Package?</h3>
            <p className="text-slate-500 mb-6 max-w-lg mx-auto">We create 100% custom packages based on your exact dates, budget, and preferences.</p>
            <a href={waGeneral} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-xl shadow-green-500/25 text-base">💬 Customize My Trip</a>
          </div>
        </R>
      </div>
    </section>
  </>
}
