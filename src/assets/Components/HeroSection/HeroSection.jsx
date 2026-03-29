import React from 'react';
import { motion } from 'framer-motion';
import { Waves, Filter, Sparkles } from 'lucide-react';

const HeroSection = ({ setIsFormOpen }) => {
  const liquidReveal = { duration: 1.4, ease: [0.16, 1, 0.3, 1] };

  return (
    <div id="home" className="relative w-full font-sans bg-white overflow-hidden">
      
      {/* --- HERO CONTENT --- */}
      <header className="relative min-h-[650px] md:h-[85vh] w-full flex items-center bg-slate-900 overflow-hidden">
        
        {/* BACKGROUND */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2000')` }}
          >
            <div className="absolute inset-0 bg-black/45" />
          </div>
        </motion.div>

        {/* TEXT CONTENT */}
        <div className="relative z-10 container mx-auto px-6 md:px-16 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={liquidReveal}
            className="text-5xl md:text-8xl font-black text-white leading-[0.95] tracking-tighter"
          >
            ENJOY A <br /> 
            <span className="text-[#06b6d4]">WAVY</span> <br /> 
            CLEAN POOL
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...liquidReveal, delay: 0.2 }}
            className="mt-6 md:mt-8 text-sm md:text-xl text-slate-100 font-medium max-w-xl mx-auto md:mx-0"
          >
            Professional, reliable, and thorough maintenance. <br className="hidden md:block" />
            Keep your sanctuary crystal clear without the hassle.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...liquidReveal, delay: 0.4 }}
            className="mt-8 md:mt-10"
          >
            <button 
              onClick={() => setIsFormOpen(true)}
              className="bg-[#b43d1b] hover:bg-[#8e2f14] text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-xs md:text-lg transition-all active:scale-95 shadow-2xl"
            >
              SCHEDULE A FREE QUOTE
            </button>
          </motion.div>
        </div>
      </header>

      {/* --- FEATURE SECTION (Horizontal Grid on Mobile) --- */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        className="relative z-20 -mt-16 md:-mt-28 container mx-auto px-2 md:px-10 max-w-7xl"
      >
        <div className="bg-white rounded-[30px] md:rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden">
          {/* Forced 3-column grid for all screens */}
          <div className="grid grid-cols-3 p-4 py-8 md:p-20 gap-2 md:gap-12 text-center">
            
            {[
              { icon: <Waves />, title: "Weekly", sub: "Tide", desc: "Reliable maintenance." },
              { icon: <Filter />, title: "Deep", sub: "Blue", desc: "Chemical balancing." },
              { icon: <Sparkles />, title: "Pro", sub: "Service", desc: "Certified techs." }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Scaled icons for mobile */}
                <div className="bg-cyan-50 w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-3xl mb-3 md:mb-6 flex items-center justify-center text-[#06b6d4]">
                  {React.cloneElement(feature.icon, { 
                    size: 20, 
                    className: "md:w-8 md:h-8" 
                  })}
                </div>
                <h3 className="font-black text-slate-900 uppercase text-[10px] md:text-2xl tracking-tighter leading-none">
                  {feature.title} <br className="md:hidden" /> {feature.sub}
                </h3>
                {/* Shorter descriptions for mobile grid fit */}
                <p className="hidden md:block text-slate-500 font-bold mt-2 text-sm md:text-base leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}

          </div>
          
          {/* THE LIGHT BLUE MOVING LINE */}
          <div className="relative h-2 bg-slate-100 w-full overflow-hidden">
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 h-full w-[60%] bg-gradient-to-r from-transparent via-[#06b6d4] to-transparent"
            />
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HeroSection;