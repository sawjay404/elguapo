import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2 } from 'lucide-react';

const FormModal = ({ isOpen, setIsOpen }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here is where you'd normally handle the API logic
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset the success message after the modal closes
    setTimeout(() => setIsSubmitted(false), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Blur Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
          />

          {/* Modal Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg bg-white rounded-[3rem] p-10 md:p-14 shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <button 
              onClick={handleClose}
              className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors z-10"
            >
              <X size={28} />
            </button>

            {!isSubmitted ? (
              <>
                <h2 className="text-4xl font-black tracking-tighter text-slate-900 uppercase mb-2">
                  Get Your <span className="text-[#06b6d4]">Quote</span>
                </h2>
                <p className="text-slate-500 font-medium mb-8 text-lg">
                  Expert pool care is one click away.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#06b6d4]/10 transition-all" 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="(555) 000-0000" 
                        className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#06b6d4]/10 transition-all" 
                      />
                    </div>
                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com" 
                        className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#06b6d4]/10 transition-all" 
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Service Address</label>
                    <input 
                      required
                      type="text" 
                      placeholder="123 Pool Lane, City, ST" 
                      className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#06b6d4]/10 transition-all" 
                    />
                  </div>

                  {/* Text Box */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">How can we help?</label>
                    <textarea 
                      required
                      rows="3"
                      placeholder="Tell us about your pool..." 
                      className="w-full px-8 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#06b6d4]/10 transition-all resize-none" 
                    />
                  </div>

                  <button type="submit" className="w-full py-6 bg-[#06b6d4] text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-900 shadow-xl transition-all flex items-center justify-center gap-3 mt-4 active:scale-95">
                    Send Request <Send size={18} />
                  </button>
                </form>
              </>
            ) : (
              /* Success Message */
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-6"
              >
                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500">
                    <CheckCircle2 size={48} />
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">Request Sent!</h2>
                  <p className="text-slate-500 font-medium mt-2">
                    We'll dive into your request and get back to you shortly.
                  </p>
                </div>
                <button 
                  onClick={handleClose}
                  className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#06b6d4] transition-all"
                >
                  Close Window
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FormModal;