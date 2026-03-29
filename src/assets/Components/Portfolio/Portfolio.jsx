import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { ExternalLink, Droplets, MapPin, CheckCircle2 } from 'lucide-react';

const StatCounter = ({ value, decimals = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(decimals);
      }
    });
  }, [springValue, decimals]);

  return <span ref={ref}>0</span>;
};

const Portfolio = ({ setIsFormOpen }) => {
  const projects = [
    {
      title: "The Glass House",
      location: "Beverly Hills",
      type: "Weekly",
      image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1200",
      size: "large" 
    },
    {
      title: "Azure Estate",
      location: "Coastal",
      type: "Recovery",
      image: "https://images.unsplash.com/photo-1562133567-b6a0a9c7e6eb?auto=format&fit=crop&q=80&w=800",
      size: "small"
    },
    {
      title: "Serenity",
      location: "Oasis",
      type: "Comm.",
      image: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&q=80&w=800",
      size: "small"
    },
    {
      title: "Modern Mini",
      location: "Silang",
      type: "Equip.",
      image: "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&q=80&w=1200",
      size: "medium"
    }
  ];

  return (
    <section id="portfolio" className="py-16 md:py-32 bg-white scroll-mt-24">
      <div className="container mx-auto px-4 md:px-16 max-w-7xl">
        
        {/* --- Header --- */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-20 gap-6 text-center md:text-left">
          <div className="max-w-2xl">
            <span className="text-[#06b6d4] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs block mb-2 md:mb-4">
              Our Track Record
            </span>
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9]">
              Pristine <br /> 
              <span className="text-[#06b6d4]">Portfolios</span>
            </h2>
          </div>
          <p className="text-slate-500 font-bold text-xs md:text-lg max-w-xs leading-tight">
            Showcasing the clearest waters in the valley. Every pool tells a story of precision.
          </p>
        </div>

        {/* --- Bento Grid --- */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-6 md:auto-rows-[320px]">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`relative group rounded-[2rem] md:rounded-[3.5rem] overflow-hidden bg-slate-200 shadow-lg transition-all duration-500
                ${project.size === 'large' ? 'col-span-2 md:col-span-8 md:row-span-2 h-[280px] md:h-full' : ''}
                ${project.size === 'small' ? 'col-span-1 md:col-span-4 md:row-span-1 h-[200px] md:h-full' : ''}
                ${project.size === 'medium' ? 'col-span-2 md:col-span-12 md:row-span-1 h-[180px] md:h-full' : ''}
              `}
            >
              <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent" />

              <div className="absolute inset-0 p-5 md:p-12 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                  <div className="max-w-[80%]">
                    <p className="text-[#06b6d4] text-[8px] md:text-xs font-black uppercase tracking-widest mb-1">{project.location}</p>
                    <h3 className="text-sm md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                      {project.title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setIsFormOpen(true)} 
                    className="w-8 h-8 md:w-16 md:h-16 bg-white rounded-xl flex items-center justify-center text-slate-900 hover:bg-[#06b6d4] hover:text-white transition-colors duration-300"
                  >
                    <ExternalLink size={16} className="md:w-6 md:h-6" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Stats Banner: Adjusted for reasonable Desktop sizing --- */}
        <motion.div 
          className="mt-8 md:mt-24 bg-slate-900 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-14 flex flex-col lg:flex-row justify-between items-center gap-10"
        >
          {/* Stats Grid - Scaled from 8xl down to 6xl */}
          <div className="grid grid-cols-3 w-full lg:w-3/4 gap-4 text-center md:text-left">
            <div className="flex flex-col">
              <p className="text-[#06b6d4] font-black text-3xl md:text-6xl tracking-tighter leading-none mb-1 md:mb-2">
                <StatCounter value={250} />+
              </p>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[7px] md:text-[10px]">Pools Maintained</p>
            </div>

            <div className="flex flex-col border-x border-slate-800 lg:border-0 px-2">
              <p className="text-[#06b6d4] font-black text-3xl md:text-6xl tracking-tighter leading-none mb-1 md:mb-2">
                <StatCounter value={4.5} decimals={1} />M
              </p>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[7px] md:text-[10px]">Gallons Cleaned</p>
            </div>

            <div className="flex flex-col">
              <p className="text-[#06b6d4] font-black text-3xl md:text-6xl tracking-tighter leading-none mb-1 md:mb-2">
                <StatCounter value={100} />%
              </p>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[7px] md:text-[10px]">Happy Clients</p>
            </div>
          </div>

          {/* Large Desktop Button */}
          <button 
            onClick={() => setIsFormOpen(true)}
            className="w-full lg:w-auto flex items-center justify-center gap-3 bg-white text-slate-900 px-8 py-5 md:px-10 md:py-6 rounded-2xl md:rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] md:text-sm hover:bg-[#06b6d4] hover:text-white transition-all shadow-2xl active:scale-95 whitespace-nowrap"
          >
            Join the List <Droplets className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default Portfolio;