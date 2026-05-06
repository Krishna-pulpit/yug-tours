import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { waGeneral } from '../data/data'

function R({children,className='',delay=0}){const ref=useRef(null);const v=useInView(ref,{once:true,margin:'-50px'});return <motion.div ref={ref} initial={{opacity:0,scale:0.95}} animate={v?{opacity:1,scale:1}:{}} transition={{duration:0.5,delay}} className={className}>{children}</motion.div>}

const gallery = [
  { id:1, cat:'mountains', label:'Manali Valley', img:'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80', span:'col-span-2' },
  { id:2, cat:'honeymoon', label:'Kashmir Houseboat', img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', span:'row-span-2' },
  { id:3, cat:'beaches',   label:'Goa Sunset', img:'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80' },
  { id:4, cat:'hotels',    label:'Luxury Resort', img:'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80' },
  { id:5, cat:'mountains', label:'Rajasthan Fort', img:'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80' },
  { id:6, cat:'international', label:'Dubai Skyline', img:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80', span:'col-span-2' },
  { id:7, cat:'family',    label:'Kerala Backwaters', img:'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80' },
  { id:8, cat:'international', label:'Thailand Temple', img:'https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80' },
  { id:9, cat:'mountains', label:'Himalayan Views', img:'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=600&q=80' },
  { id:10,cat:'beaches',   label:'Tropical Beach', img:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', span:'col-span-2' },
  { id:11,cat:'honeymoon', label:'Romantic Sunset', img:'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80' },
  { id:12,cat:'hotels',    label:'Pool Villa', img:'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80' },
]

const cats = ['all','mountains','beaches','hotels','honeymoon','family','international']

export default function Gallery() {
  const [active,setActive]=useState('all')
  const [lightbox,setLightbox]=useState(null)
  useEffect(()=>{document.title='Gallery | Yug Tours & Travels'},[])
  const filtered = active==='all'?gallery:gallery.filter(g=>g.cat===active)

  return <>
    <section className="relative h-[40vh] min-h-[340px] overflow-hidden">
      <img onError={(e)=>{e.target.onerror=null;e.target.style.opacity="0";e.target.parentElement.style.background="linear-gradient(135deg,#1e3a5f,#0d9488)"}} src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=80" alt="Mountains" className="absolute inset-0 w-full h-full object-cover"/>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 to-slate-950/80"/>
      <div className="relative z-10 h-full flex items-center justify-center text-center px-5">
        <div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="font-display font-black text-white text-4xl md:text-6xl mb-4">Travel Gallery</motion.h1>
          <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} className="text-white/60 text-lg">A glimpse of magical places our travelers have experienced.</motion.p>
        </div>
      </div>
    </section>

    <section className="py-16 px-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {cats.map(c=>(
            <button key={c} onClick={()=>setActive(c)}
              className={`px-4 py-2 rounded-xl text-sm font-bold capitalize border transition-all ${active===c?'bg-blue-600 text-white border-blue-600':'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {filtered.map((item,i)=>(
            <R key={item.id} delay={i*0.05} className={`${item.span||''}`}>
              <div onClick={()=>setLightbox(item)} className="group relative w-full h-full rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300">
                <img onError={(e)=>{e.target.onerror=null;e.target.style.opacity="0";e.target.parentElement.style.background="linear-gradient(135deg,#1e3a5f,#0d9488)"}} src={item.img} alt={item.label} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity">🔍</span>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs font-bold bg-black/50 backdrop-blur px-2.5 py-1 rounded-lg">{item.label}</span>
                </div>
              </div>
            </R>
          ))}
        </div>
        <div className="text-center mt-10">
          <a href={waGeneral} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg text-sm">💬 Plan Your Trip</a>
        </div>
      </div>
    </section>

    <AnimatePresence>
      {lightbox&&(
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-5">
          <motion.div initial={{scale:0.8}} animate={{scale:1}} exit={{scale:0.8}} onClick={e=>e.stopPropagation()}
            className="relative max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl">
            <img onError={(e)=>{e.target.onerror=null;e.target.style.opacity="0";e.target.parentElement.style.background="linear-gradient(135deg,#1e3a5f,#0d9488)"}} src={lightbox.img.replace('w=600','w=1200')} alt={lightbox.label} className="w-full h-auto max-h-[80vh] object-cover"/>
            <div className="absolute bottom-4 left-4 text-white font-display font-bold text-xl">{lightbox.label}</div>
            <button onClick={()=>setLightbox(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white text-lg hover:bg-white/30">✕</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </>
}
