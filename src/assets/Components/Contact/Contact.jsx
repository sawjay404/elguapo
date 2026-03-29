import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, Send, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 md:px-16 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 md:gap-24">
          
          {/* Left Side: Contact Info - Now centered on mobile */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[#06b6d4] font-black uppercase tracking-[0.3em] text-xs md:text-sm">
                Get In Touch
              </span>
              <h2 className="text-4xl md:text-7xl font-black text-slate-900 mt-4 uppercase tracking-tighter leading-none">
                Ready for <br /> <span className="text-[#06b6d4]">Perfect Water?</span>
              </h2>
              <p className="mt-8 text-slate-600 font-bold text-lg md:text-xl leading-relaxed max-w-md mx-auto lg:mx-0">
                Have questions or ready to schedule your free quote? Reach out directly and we'll get back to you within 24 hours.
              </p>

              {/* Contact Cards - Column on mobile, centered */}
              <div className="mt-12 space-y-6 md:space-y-8 flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-6 group w-full max-w-sm lg:max-w-none">
                  <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center text-[#06b6d4] group-hover:bg-[#06b6d4] group-hover:text-white transition-all shrink-0">
                    <Phone size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-1">Call Us Directly</p>
                    <p className="font-black text-slate-900 text-xl md:text-2xl">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group w-full max-w-sm lg:max-w-none">
                  <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center text-[#06b6d4] group-hover:bg-[#06b6d4] group-hover:text-white transition-all shrink-0">
                    <Mail size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-1">Email Support</p>
                    <p className="font-black text-slate-900 text-xl md:text-2xl">hello@wavy.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group w-full max-w-sm lg:max-w-none">
                  <div className="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center text-[#06b6d4] group-hover:bg-[#06b6d4] group-hover:text-white transition-all shrink-0">
                    <Clock size={24} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-1">Service Hours</p>
                    <p className="font-black text-slate-900 text-xl md:text-2xl">Mon - Sat: 8am - 6pm</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Contact Form - HIDDEN ON MOBILE/TABLET, VISIBLE ON DESKTOP */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="hidden lg:block w-full lg:w-1/2 bg-[#f8fafc] p-8 md:p-12 rounded-[3rem] shadow-xl border-2 border-cyan-50"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-black text-slate-900 uppercase text-xs tracking-widest ml-2">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-transparent focus:border-[#06b6d4] focus:outline-none font-bold text-slate-800 transition-all shadow-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-black text-slate-900 uppercase text-xs tracking-widest ml-2">Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="(555) 000-0000"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-transparent focus:border-[#06b6d4] focus:outline-none font-bold text-slate-800 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-black text-slate-900 uppercase text-xs tracking-widest ml-2">Service Needed</label>
                <select className="w-full px-6 py-4 rounded-2xl border-2 border-transparent focus:border-[#06b6d4] focus:outline-none font-bold text-slate-800 transition-all shadow-sm appearance-none bg-white">
                  <option>Weekly Maintenance</option>
                  <option>Green-to-Clean Recovery</option>
                  <option>Equipment Repair</option>
                  <option>Other / Question</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-black text-slate-900 uppercase text-xs tracking-widest ml-2">Your Message</label>
                <textarea 
                  rows="4"
                  placeholder="Tell us about your pool..."
                  className="w-full px-6 py-4 rounded-2xl border-2 border-transparent focus:border-[#06b6d4] focus:outline-none font-bold text-slate-800 transition-all shadow-sm"
                ></textarea>
              </div>

              <button className="w-full bg-[#b43d1b] hover:bg-[#8e2f14] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95">
                SEND MESSAGE <Send size={18} />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;