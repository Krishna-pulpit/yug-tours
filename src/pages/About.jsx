import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { reviews, waGeneral } from '../data/data'

function R({children,className='',delay=0}){const ref=useRef(null);const v=useInView(ref,{once:true,margin:'-50px'});return <motion.div ref={ref} initial={{opacity:0,y:40}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.6,delay}} className={className}>{children}</motion.div>}

export default function About() {
  useEffect(()=>{document.title='About Us | Yug Tours & Travels'},[])
  return <>
    <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
      <img onError={(e)=>{e.target.onerror=null;e.target.style.opacity="0";e.target.parentElement.style.background="linear-gradient(135deg,#1e3a5f,#0d9488)"}} src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1400&q=80" alt="Travel" className="absolute inset-0 w-full h-full object-cover"/>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 to-slate-950/80"/>
      <div className="relative z-10 h-full flex items-center justify-center text-center px-5">
        <div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="font-display font-black text-white text-4xl md:text-6xl mb-4">About Yug Tours</motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} className="text-white/60 text-lg max-w-xl mx-auto">Making travel simple, affordable, safe, and memorable — one trip at a time.</motion.p>
        </div>
      </div>
    </section>

    {/* Stats */}
    <div className="-mt-10 relative z-20 px-5">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {[['5,000+','Happy Travelers'],['50+','Tour Packages'],['10+','Destinations'],['24/7','WhatsApp Support']].map(([n,l])=>(
          <div key={l} className="bg-white rounded-2xl p-6 text-center shadow-xl border border-slate-100">
            <div className="font-display font-black text-3xl text-blue-600">{n}</div>
            <div className="text-xs text-slate-400 font-semibold mt-1">{l}</div>
          </div>
        ))}
      </div>
    </div>

    <section className="py-24 px-5">
      <div className="max-w-4xl mx-auto">
        <R><h2 className="font-display font-bold text-3xl text-slate-900 mb-6">Who We Are</h2></R>
        <R delay={0.1}><p className="text-slate-600 leading-relaxed mb-5">Yug Tours & Travels was founded with a simple vision — to make travel planning effortless, transparent, and genuinely enjoyable. We understand that planning a trip can be overwhelming with hundreds of options, hidden costs, and unreliable vendors. We exist to solve exactly that.</p></R>
        <R delay={0.2}><p className="text-slate-600 leading-relaxed mb-5">Our team of passionate travel experts have personally visited and vetted every destination we recommend. From the snow-clad peaks of Manali to the serene backwaters of Kerala, from the spiritual Char Dham Yatra to the glamour of Dubai — we plan every trip with the same care we'd give our own family.</p></R>
        <R delay={0.3}><p className="text-slate-600 leading-relaxed mb-8">What makes us different? We're just a WhatsApp message away — always. No complicated booking systems, no call centers. Just a personal travel expert who crafts the perfect trip for you.</p></R>

        <R delay={0.3}>
          <div className="bg-teal-50 border-l-4 border-teal-500 rounded-r-2xl p-6 mb-10">
            <div className="text-xs font-bold text-teal-700 uppercase mb-2">🎯 Our Mission</div>
            <p className="text-slate-700 italic text-lg">"To make travel simple, affordable, safe, and memorable — one trip at a time."</p>
          </div>
        </R>

        <R><h3 className="font-display font-bold text-2xl text-slate-900 mb-6">Our Values</h3></R>
        <div className="grid sm:grid-cols-2 gap-5 mb-16">
          {[['🤝','Transparency','Clear pricing, zero hidden charges — always.'],['❤️','Personalization','Every trip uniquely crafted for your interests and budget.'],['🛡️','Reliability','Verified hotels, experienced drivers, backup plans.'],['📞','Support','24/7 WhatsApp before, during, and after your trip.']].map(([icon,title,desc],i)=>(
            <R key={title} delay={i*0.1}>
              <div className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-shadow">
                <span className="text-3xl">{icon}</span>
                <div><div className="font-bold text-slate-900 text-sm mb-1">{title}</div><div className="text-slate-500 text-sm">{desc}</div></div>
              </div>
            </R>
          ))}
        </div>

        <R className="text-center">
          <a href={waGeneral} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-xl shadow-green-500/25 text-base">💬 Connect With Us</a>
        </R>
      </div>
    </section>

    {/* Reviews */}
    <section className="py-24 px-5 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <R className="text-center mb-14"><h2 className="font-display font-bold text-3xl text-slate-900">What Travelers Say</h2></R>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {reviews.map((r,i)=>(
            <R key={r.name} delay={i*0.1}>
              <div className="bg-white rounded-3xl p-7 shadow-lg border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="text-amber-400 text-sm mb-3">⭐⭐⭐⭐⭐</div>
                <p className="text-slate-600 text-sm leading-relaxed italic mb-5">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{background:r.color}}>{r.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                  <div><div className="font-bold text-slate-900 text-sm">{r.name}</div><div className="text-slate-400 text-xs">🗺️ {r.trip}</div></div>
                </div>
              </div>
            </R>
          ))}
        </div>

      </div>
    </section>
  </>
}
