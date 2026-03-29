import React from "react";
import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  Waves, 
  Instagram, 
  Facebook, 
  ArrowUpRight,
  Droplets,
  Clock,
  ShieldCheck
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Replace with your actual Google Maps Embed link for your service area
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100000!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus";

  return (
    <footer className="relative bg-slate-950 pt-24 pb-12 px-6 overflow-hidden">
      {/* Subtle Tile/Water Texture Layer */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/tiny-checkers.png')` }} />
      
      {/* Cyan Accent Glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#06b6d4]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- TOP SECTION: BRAND & MAP --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Brand & Info Column */}
          <div className="lg:col-span-4 space-y-8 text-center lg:text-left">
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-14 h-14 bg-[#06b6d4] rounded-2xl flex items-center justify-center shadow-2xl shadow-[#06b6d4]/40">
                <Waves size={28} className="text-white" />
              </div>
              <div className="leading-none">
                <h1 className="text-3xl font-black text-white tracking-tighter uppercase">WAVY</h1>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#06b6d4]">Pool Cleaning Services</p>
              </div>
            </div>

            <p className="text-slate-400 font-bold leading-relaxed text-lg">
              Providing crystal clear water and stress-free pool ownership. Professional maintenance you can count on.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 text-white justify-center lg:justify-start">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <Phone size={20} className="text-[#06b6d4]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Call or Text</span>
                  <span className="font-black uppercase tracking-widest text-sm">(555) 123-4567</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white justify-center lg:justify-start">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                  <Mail size={20} className="text-[#06b6d4]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Us</span>
                  <span className="font-black uppercase tracking-widest text-sm">hello@wavy.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Full Color Google Maps Embed */}
          <div className="lg:col-span-8 w-full h-[450px] rounded-[3.5rem] overflow-hidden border-4 border-slate-900 shadow-2xl relative">
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wavy Service Area"
              className="relative z-0"
            ></iframe>
            
            {/* Status Label */}
            <div className="absolute bottom-6 right-6 z-10 bg-slate-950/95 backdrop-blur-md border border-slate-800 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-2xl">
                <div className="relative flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#06b6d4] rounded-full" />
                  <div className="absolute w-2 h-2 bg-[#06b6d4] rounded-full animate-ping" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.1em] leading-none mb-1">Service Status</span>
                  <span className="text-[11px] font-black text-white uppercase tracking-wider leading-none">Accepting New Clients</span>
                </div>
            </div>
          </div>
        </div>

        {/* --- MIDDLE SECTION: QUICK LINKS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16 border-y border-slate-900">
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-[#06b6d4] uppercase tracking-[0.3em]">Explore</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'About', 'Reviews', 'Contact'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-slate-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-2 group">
                    {item} <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:text-[#06b6d4] transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-[#06b6d4] uppercase tracking-[0.3em]">Services</h4>
            <ul className="space-y-3">
              {['Maintenance', 'Repair', 'Algae Removal', 'Inspections'].map(item => (
                <li key={item} className="text-slate-400 text-xs font-bold uppercase tracking-widest">{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-[#06b6d4] uppercase tracking-[0.3em]">Socials</h4>
            <div className="flex gap-4">
              {[Instagram, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-400 hover:text-[#06b6d4] hover:border-[#06b6d4] transition-all shadow-xl">
                  <Icon size={22} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-[#06b6d4] uppercase tracking-[0.3em]">Credentials</h4>
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-slate-300">
                    <ShieldCheck size={18} className="text-[#06b6d4]" />
                    <span className="text-[10px] font-black uppercase tracking-tighter">Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                    <Clock size={18} className="text-[#06b6d4]" />
                    <span className="text-[10px] font-black uppercase tracking-tighter">Weekly Reliability</span>
                </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
            © {currentYear} WAVY POOL SERVICES. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-10">
            <a href="#" className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}