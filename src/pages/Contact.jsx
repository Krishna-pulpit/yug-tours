import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { waGeneral, waPkg, faqs } from '../data/data'

function R({children,className='',delay=0}){const ref=useRef(null);const v=useInView(ref,{once:true,margin:'-50px'});return <motion.div ref={ref} initial={{opacity:0,y:40}} animate={v?{opacity:1,y:0}:{}} transition={{duration:0.6,delay}} className={className}>{children}</motion.div>}

export default function Contact() {
  useEffect(()=>{document.title='Contact Us | Yug Tours & Travels'},[])
  const [openFaq,setOpenFaq]=useState(null)

  return <>
    <section className="relative h-[40vh] min-h-[340px] overflow-hidden">
      <img onError={(e)=>{e.target.onerror=null;e.target.style.opacity="0";e.target.parentElement.style.background="linear-gradient(135deg,#1e3a5f,#0d9488)"}} src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&q=80" alt="Resort" className="absolute inset-0 w-full h-full object-cover"/>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 to-slate-950/80"/>
      <div className="relative z-10 h-full flex items-center justify-center text-center px-5">
        <div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="font-display font-black text-white text-4xl md:text-6xl mb-4">Contact Us</motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} className="text-white/60 text-lg">We're available 7 days a week to help plan the perfect trip.</motion.p>
        </div>
      </div>
    </section>

    <section className="py-20 px-5">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <R><h2 className="font-display font-bold text-2xl text-slate-900 mb-6">Get in Touch</h2></R>
          {[['💬','WhatsApp (Preferred)','+91 90237 49921','https://wa.me/919023749921'],['📞','Phone','+91 90237 49921','tel:+919023749921'],['📧','Email','info@yugtours.in','mailto:info@yugtours.in'],['📍','Office','Your Office Address, City, State',null],['🕐','Hours','Monday–Sunday: 9 AM – 8 PM',null]].map(([icon,label,value,href],i)=>(
            <R key={label} delay={i*0.08}>
              <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl hover:bg-blue-50/50 transition-colors">
                <span className="text-2xl mt-0.5">{icon}</span>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</div>
                  {href?<a href={href} target={href.startsWith('http')?'_blank':undefined} className="font-semibold text-blue-600 hover:text-blue-700 text-sm">{value}</a>
                  :<span className="font-semibold text-slate-800 text-sm">{value}</span>}
                </div>
              </div>
            </R>
          ))}
          <R delay={0.4}>
            <div className="w-full h-52 rounded-2xl bg-gradient-to-br from-blue-50 to-teal-50 border-2 border-dashed border-slate-200 flex items-center justify-center mt-4">
              <div className="text-center text-slate-400"><div className="text-3xl mb-2">🗺️</div><div className="text-sm font-medium">Embed Google Maps here</div></div>
            </div>
          </R>
        </div>

        <div className="space-y-6">
          <R>
            <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-10 text-center text-white">
              <div className="text-6xl mb-5">💬</div>
              <h3 className="font-display font-bold text-2xl mb-3">Chat on WhatsApp</h3>
              <p className="text-white/60 mb-8 leading-relaxed">Get instant replies, free quotes, and personalized itineraries — all on WhatsApp.</p>
              <a href={waGeneral} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-xl shadow-green-500/25 mb-3">
                💬 Open WhatsApp Chat
              </a>
              <p className="text-white/30 text-xs">Typically replies within minutes</p>
            </div>
          </R>
          <R delay={0.2}>
            <div className="grid grid-cols-2 gap-3">
              {[['💬 Free Quote',waGeneral],['✈️ Plan Trip',waGeneral],['💑 Honeymoon',waPkg('Honeymoon')],['👨‍👩‍👧 Family Tour',waPkg('Family Tour')]].map(([l,h])=>(
                <a key={l} href={h} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center py-3 px-4 bg-white rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition-all text-center">
                  {l}
                </a>
              ))}
            </div>
          </R>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-20 px-5 bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <R className="text-center mb-12"><h2 className="font-display font-bold text-3xl text-slate-900">FAQ</h2></R>
        <div className="space-y-3">
          {faqs.slice(0,6).map((faq,i)=>(
            <R key={i} delay={i*0.05}>
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} className="w-full flex items-center justify-between px-6 py-5 text-left gap-4">
                  <span className="font-semibold text-slate-800 text-sm">{faq.q}</span>
                  <motion.span animate={{rotate:openFaq===i?45:0}} className="text-blue-500 text-xl shrink-0">+</motion.span>
                </button>
                {openFaq===i&&(
                  <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} className="overflow-hidden">
                    <div className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-4">{faq.a}</div>
                  </motion.div>
                )}
              </div>
            </R>
          ))}
        </div>
        <R className="text-center mt-10">
          <a href={waGeneral} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg text-sm">💬 Ask on WhatsApp</a>
        </R>
      </div>
    </section>
  </>
}
