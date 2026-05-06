import { Link } from 'react-router-dom'
import { waGeneral } from '../data/data'

const quickLinks = [
  ['Home', '/'],
  ['Packages', '/packages'],
  ['Destinations', '/destinations'],
  ['About', '/about'],
  ['Gallery', '/gallery'],
  ['Contact', '/contact'],
]

const popularPkgs = [
  ['Manali Tour', '/packages/manali-tour-package'],
  ['Kashmir Paradise', '/packages/kashmir-paradise-package'],
  ['Goa Holiday', '/packages/goa-holiday-package'],
  ['Kerala Backwaters', '/packages/kerala-backwater-package'],
  ['Char Dham Yatra', '/packages/char-dham-yatra-package'],
  ['Dubai International', '/packages/dubai-international-tour'],
]

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white/60 pb-20 md:pb-0">
      <div className="max-w-7xl mx-auto px-5 pt-20 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center">
                <span className="text-white font-display font-bold">Y</span>
              </div>
              <div>
                <div className="font-display font-bold text-white text-sm">Yug Tours & Travels</div>
                <div className="text-[0.5rem] uppercase tracking-[0.2em] text-white/30">Your Journey, Our Passion</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6">Helping travelers create memorable journeys with customized packages, reliable hotels, comfortable transport, and personal WhatsApp support.</p>
            <a href={waGeneral} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:-translate-y-0.5 transition-transform shadow-lg shadow-green-500/20">
              💬 Book on WhatsApp
            </a>
          </div>
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(([label, to]) => (
                <li key={to}><Link to={to} className="text-sm hover:text-white hover:pl-1 transition-all">→ {label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-5">Popular Packages</h4>
            <ul className="space-y-3">
              {popularPkgs.map(([label, to]) => (
                <li key={to}><Link to={to} className="text-sm hover:text-white hover:pl-1 transition-all">→ {label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-5">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div>💬 <a href="https://wa.me/919023749921" className="hover:text-white">+91 90237 49921</a></div>
              <div>📞 +91 90237 49921</div>
              <div>📧 info@yugtours.in</div>
              <div>📍 Your City, State, India</div>
              <div>🕐 Mon–Sun: 9 AM – 8 PM</div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">© {new Date().getFullYear()} Yug Tours & Travels. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-white/30">
            <a href="#" className="hover:text-white/60">Privacy Policy</a>
            <a href="#" className="hover:text-white/60">Terms</a>
            <a href="#" className="hover:text-white/60">Cancellation</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
