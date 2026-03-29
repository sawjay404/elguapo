import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Droplets, Sparkles, ShieldCheck, Zap } from 'lucide-react';

const services = [
  {
    id: "01",
    title: "Residential",
    description: "Weekly chemistry and skimming for home.",
    icon: <Droplets className="text-[#06b6d4]" size={20} />,
    glow: "hover:shadow-[0_20px_50px_-12px_rgba(6,182,212,0.3)]"
  },
  {
    id: "02",
    title: "Commercial",
    description: "Elite management for HOAs and Resorts.",
    icon: <ShieldCheck className="text-blue-600" size={20} />,
    glow: "hover:shadow-[0_20px_50px_-12px_rgba(37,99,235,0.3)]"
  },
  {
    id: "03",
    title: "Green-Clean",
    description: "Swamp to Sanctuary in 48 hours.",
    icon: <Sparkles className="text-cyan-400" size={20} />,
    glow: "hover:shadow-[0_20px_50px_-12px_rgba(34,211,238,0.3)]"
  },
  {
    id: "04",
    title: "Equipment",
    description: "Diagnostics for pumps and salt cells.",
    icon: <Zap className="text-amber-400" size={20} />,
    glow: "hover:shadow-[0_20px_50px_-12px_rgba(251,191,36,0.3)]"
  }
];

const Services = ({ setIsFormOpen }) => {
  return (
    <section id="Services" className="py-16 md:py-32 bg-white scroll-mt-20">
      <div className="container mx-auto px-4 md:px-16 max-w-7xl">
        
        {/* --- Header --- */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 text-center md:text-left">
          <div className="max-w-xl">
            <span className="text-[#06b6d4] font-black uppercase tracking-[0.4em] text-[10px] mb-3 block">
              Our Expertise
            </span>
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9]">
              Elite Pool <br />
              <span className="text-[#06b6d4]">Services.</span>
            </h2>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="group flex items-center gap-3 bg-slate-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#06b6d4] transition-all shadow-lg active:scale-95"
          >
            Book Now <ArrowUpRight size={16} />
          </button>
        </div>

        {/* --- 2x2 Grid on Mobile, 4-Column on Desktop --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group bg-slate-50 border border-slate-100 p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] transition-all duration-300 hover:bg-white hover:border-[#06b6d4]/40 ${service.glow} flex flex-col h-full`}
            >
              <div className="flex justify-between items-start mb-4 md:mb-8">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-lg md:rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <span className="text-xl md:text-4xl font-black text-slate-200 group-hover:text-[#06b6d4]/20 transition-colors">
                  {service.id}
                </span>
              </div>

              <h3 className="text-sm md:text-2xl font-black text-slate-900 uppercase tracking-tighter mb-2 md:mb-3">
                {service.title}
              </h3>
              
              <p className="text-slate-600 font-bold text-[10px] md:text-sm leading-tight md:leading-relaxed mb-4 md:mb-8 flex-grow">
                {service.description}
              </p>

              <button 
                onClick={() => setIsFormOpen(true)}
                className="w-full py-3 md:py-4 bg-white border border-slate-200 text-slate-900 rounded-lg md:rounded-xl font-black uppercase tracking-widest text-[8px] md:text-[9px] group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all"
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;