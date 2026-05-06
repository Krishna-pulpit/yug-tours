import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { destinations, waDest, waGeneral } from '../data/data'

function R({children,className='',delay=0}){const ref=useRef(null);const v=useInView(ref,{once:true,margin:'-50px'});return <motion.div ref={ref} initial={{opacity:0,y:40}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.6,delay}} className={className}>{children}</motion.div>}

export default function Destinations() {
  const [filter,setFilter]=useState('all')
  useEffect(()=>{document.title='Destinations | Yug Tours & Travels'},[])
  const filtered = filter==='all'?destinations:destinations.filter(d=>d.type===filter)

  return <>
    <section className="relative h-[45vh] min-h-[380px] overflow-hidden">
      <img onError={(e)=>{e.target.onerror=null;e.target.style.opacity="0";e.target.parentElement.style.background="linear-gradient(135deg,#1e3a5f,#0d9488)"}} src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&q=80" alt="Beach destination" className="absolute inset-0 w-full h-full object-cover"/>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 to-slate-950/80"/>
      <div className="relative z-10 h-full flex items-center justify-center text-center px-5">
        <div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="font-display font-black text-white text-4xl md:text-6xl mb-4">Top Destinations</motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} className="text-white/60 text-lg">From Himalayan peaks to tropical beaches — discover the world.</motion.p>
        </div>
      </div>
    </section>

    <section className="py-20 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-3 justify-center mb-12">
          {[['all','🌐 All'],['domestic','🇮🇳 Domestic'],['international','🌍 International']].map(([v,l])=>(
            <button key={v} onClick={()=>setFilter(v)} className={`px-6 py-3 rounded-2xl text-sm font-bold border transition-all ${filter===v?'bg-blue-600 text-white border-blue-600':'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}>{l}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filtered.map((d,i)=>(
            <R key={d.slug} delay={i*0.08}>
              <div className="group relative h-80 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                <img onError={(e)=>{e.target.onerror=null;e.target.style.opacity="0";e.target.parentElement.style.background="linear-gradient(135deg,#1e3a5f,#0d9488)"}} src={d.img} alt={d.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"/>
                <div className="absolute bottom-0 p-6 w-full">
                  <h3 className="font-display font-bold text-white text-xl mb-1">{d.name}</h3>
                  <p className="text-white/60 text-sm mb-3">{d.desc}</p>
                  <div className="flex gap-2">
                    {/* WhatsApp → direct booking inquiry */}
                    <a href={waDest(d.name)} target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center py-2 rounded-xl bg-white/15 backdrop-blur text-white text-xs font-bold border border-white/25 hover:bg-white/25 transition-colors">
                      💬 WhatsApp
                    </a>
                    {/* Explore → filtered packages page */}
                    <Link to={`/packages?dest=${d.slug}`}
                      className="flex-1 text-center py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-colors">
                      Explore →
                    </Link>
                  </div>
                  <div className="text-xs text-white/40 mt-2">{d.type==='international'?'🌍 International':'🇮🇳 Domestic'}</div>
                </div>
              </div>
            </R>
          ))}
        </div>
        <div className="text-center mt-16 p-12 rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200">
          <h3 className="font-display font-bold text-2xl text-slate-900 mb-3">Have a Destination in Mind?</h3>
          <p className="text-slate-500 mb-6">We plan custom itineraries to any destination — India or abroad.</p>
          <a href={waGeneral} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-xl shadow-green-500/25 text-base">💬 Discuss My Destination</a>
        </div>
      </div>
    </section>
  </>
}
