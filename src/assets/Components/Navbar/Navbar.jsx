import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Waves, Phone } from 'lucide-react';

// 1. Destructure setIsFormOpen from props
const Navbar = ({ setIsFormOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#Services' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1], 
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'py-4 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'py-6 bg-white shadow-sm'
      }`}
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 md:px-16 flex items-center justify-between"
      >
        
        {/* LOGO */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="bg-[#06b6d4] p-2.5 rounded-2xl transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] group-hover:scale-110">
            <Waves className="text-white" size={28} />
          </div>
          <span className={`text-2xl md:text-3xl font-black tracking-tighter transition-colors duration-500 ${
            isScrolled ? 'text-white' : 'text-slate-900'
          }`}>
            WAVY
          </span>
        </motion.div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                variants={itemVariants}
                href={link.href}
                className={`text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:text-[#06b6d4] relative group/link ${
                  isScrolled ? 'text-slate-200' : 'text-slate-600'
                }`}
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[3px] bg-[#06b6d4] transition-all duration-300 group-hover/link:w-full rounded-full" />
              </motion.a>
            ))}
          </div>
          
          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            // 2. Attach trigger to Desktop button
            onClick={() => setIsFormOpen(true)}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm tracking-widest transition-all shadow-xl ${
              isScrolled 
                ? 'bg-[#06b6d4] text-white hover:bg-white hover:text-slate-900' 
                : 'bg-slate-900 text-white hover:bg-[#06b6d4]' 
            }`}
          >
            <Phone size={18} />
            FREE QUOTE
          </motion.button>
        </div>

        {/* MOBILE TOGGLE */}
        <motion.button 
          variants={itemVariants}
          className={`md:hidden p-2 transition-colors duration-500 ${
            isScrolled ? 'text-white' : 'text-slate-900'
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={36} /> : <Menu size={36} />}
        </motion.button>
      </motion.div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed inset-0 top-0 left-0 w-full h-screen z-[-1] flex items-center justify-center ${
              isScrolled ? 'bg-slate-900' : 'bg-white'
            }`}
          >
            <div className="flex flex-col items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-5xl font-black uppercase tracking-tighter transition-colors ${
                    isScrolled ? 'text-white hover:text-[#06b6d4]' : 'text-slate-900 hover:text-[#06b6d4]'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <button 
                // 3. Attach trigger to Mobile button & Close Menu
                onClick={() => {
                  setIsFormOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="mt-6 bg-[#06b6d4] text-white px-14 py-6 rounded-3xl font-black text-xl shadow-2xl active:scale-95 transition-transform"
              >
                GET A QUOTE
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;