import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const allReviews = [
  {
    name: "Sarah Jenkins",
    role: "Local Guide • 12 reviews", 
    date: "2 weeks ago",
    text: "Wavy transformed our green swamp into paradise in 48 hours. The team was punctual and the communication was top-notch. Highly recommend for any pool needs!",
    stars: 5,
    img: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "Mark Thompson",
    role: "4 reviews",
    date: "1 month ago",
    text: "Reliable and professional. They handle our entire HOA complex and we haven't had a single complaint from residents since they took over.",
    stars: 5,
    img: "https://i.pravatar.cc/150?u=mark"
  },
  {
    name: "Jessica Alana",
    role: "Local Guide • 42 reviews",
    date: "3 days ago",
    text: "The weekly plan is worth every penny. Haven't touched a chemical in months! My kids can jump in anytime knowing the water is perfectly balanced.",
    stars: 5,
    img: "https://i.pravatar.cc/150?u=jess"
  },
  {
    name: "David Chen",
    role: "Local Guide • 18 reviews",
    date: "5 days ago",
    text: "Best pool service in the area. They fixed a pump issue that three other companies couldn't figure out. Truly experts in their craft.",
    stars: 5,
    img: "https://i.pravatar.cc/150?u=david"
  },
  {
    name: "Emily Rodriguez",
    role: "8 reviews",
    date: "2 months ago",
    text: "I was skeptical about the 48-hour claim, but they actually did it. My pool went from dark green to crystal clear. Amazing work.",
    stars: 5,
    img: "https://i.pravatar.cc/150?u=emily"
  },
  {
    name: "Robert Wilson",
    role: "2 reviews",
    date: "1 week ago",
    text: "Finally a company that shows up when they say they will. The digital reports after every visit are a great touch for tracking chemical levels.",
    stars: 5,
    img: "https://i.pravatar.cc/150?u=robert"
  },
  {
    name: "Amanda Lee",
    role: "Local Guide • 15 reviews",
    date: "6 days ago",
    text: "Their weekly maintenance is top tier. Our pool has never looked better. Professional staff and very easy to work with.",
    stars: 5,
    img: "https://i.pravatar.cc/150?u=amanda"
  },
  {
    name: "Chris P.",
    role: "9 reviews",
    date: "3 weeks ago",
    text: "Great communication via text. I love that they send a photo of the clean pool and the gate being locked. Peace of mind!",
    stars: 5,
    img: "https://i.pravatar.cc/150?u=chris"
  },
  {
    name: "Lisa M.",
    role: "Local Guide • 67 reviews",
    date: "4 days ago",
    text: "Solid service. They are very thorough and don't rush the job. Worth every penny to have a safe, clean pool all year round.",
    stars: 5,
    img: "https://i.pravatar.cc/150?u=lisa"
  }
];

const GoogleReviewCard = ({ review, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: (index % 3) * 0.1 }}
    className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full hover:shadow-md transition-shadow"
  >
    <div className="flex items-center gap-3 mb-4">
      <img 
        src={review.img} 
        alt={review.name} 
        className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
      />
      <div>
        <h4 className="font-semibold text-slate-900 text-sm md:text-base leading-tight">
          {review.name}
        </h4>
        <p className="text-slate-500 text-[11px] md:text-xs">
          {review.role}
        </p>
      </div>
      <div className="ml-auto self-start">
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      </div>
    </div>

    <div className="flex items-center gap-2 mb-3">
      <div className="flex text-[#fabb05]">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} fill="currentColor" stroke="none" />
        ))}
      </div>
      <span className="text-slate-400 text-[11px] md:text-xs">{review.date}</span>
    </div>

    <p className="text-slate-700 text-sm md:text-[15px] leading-relaxed">
      "{review.text}"
    </p>
  </motion.div>
);

const Testimonials = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  
  const showMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  return (
    <section id="reviews" className="py-24 bg-[#f8fafc] scroll-mt-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">Excellent</h2>
          <div className="flex items-center gap-3">
            <div className="flex text-[#fabb05]">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" stroke="none" />)}
            </div>
            <p className="text-sm text-slate-600 font-medium">
              Based on <span className="underline cursor-pointer">128 reviews</span>
            </p>
            <div className="flex items-center gap-1 ml-2 border-l pl-3">
              <span className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Review us on</span>
              <span className="font-bold text-slate-700 text-sm">Google</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {allReviews.slice(0, visibleCount).map((review, index) => (
              <GoogleReviewCard key={review.name} review={review} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {visibleCount < allReviews.length && (
          <div className="mt-12 text-center">
            <button 
              onClick={showMore}
              className="px-8 py-3 bg-white border border-slate-200 rounded-full font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95"
            >
              See More Reviews
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;