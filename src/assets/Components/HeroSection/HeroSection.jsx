import React, { useState, useEffect, useRef } from 'react';
import { Instagram, ArrowUpRight, ShoppingBag, Loader2, Search, Sun, Moon, Sparkles, Star } from 'lucide-react';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzXPnhJn-XPG4YVqobPUvlWq3dbyHLPynCq_8AiFU0Ic7QRpACQNFwOLikfqvE8ul4ewA/exec";

const Home = ({ isDarkMode, toggleTheme }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const suggestionRef = useRef(null);

  useEffect(() => {
    fetch(SCRIPT_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = products.filter(p => 
      p.title.toLowerCase().includes(query.toLowerCase()) || 
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.id.toString().includes(query)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen transition-colors duration-700 bg-[#FAFAFA] dark:bg-[#050505] text-black dark:text-white font-sans selection:bg-[#EE4D2D] selection:text-white">
      
      {/* TIKTOK STYLE ANNOUNCEMENT */}
      <div className="bg-[#EE4D2D] text-white text-[9px] font-black py-2 px-4 text-center uppercase tracking-[0.4em] sticky top-0 z-[60] shadow-sm flex items-center justify-center gap-3">
        <Sparkles size={10} /> 
        Viral Shopee Finds — Updated Daily 
        <Sparkles size={10} />
      </div>

      <nav className="sticky top-[29px] z-50 bg-white/70 dark:bg-black/70 backdrop-blur-2xl border-b border-gray-100 dark:border-white/5 px-6 py-4 flex justify-between items-center w-full">
        <div className="flex items-center gap-2 group cursor-pointer">
          <img src="/guapo.png" alt="Logo" className="w-9 h-9 object-contain group-hover:rotate-12 transition-transform duration-500" />
          <h1 className="text-2xl font-black tracking-tighter italic leading-none text-[#EE4D2D]">EL GUAPO</h1>
        </div>
        
        <div className="hidden md:block relative w-1/3">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
          <input 
            type="text"
            placeholder="Search the drops..."
            className="w-full bg-gray-100/50 dark:bg-white/5 border border-transparent focus:border-[#EE4D2D]/20 rounded-2xl py-3 pl-14 pr-4 text-xs outline-none transition-all font-bold placeholder:text-gray-400 dark:placeholder:text-gray-600"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="p-3 rounded-2xl bg-white dark:bg-white/5 shadow-sm border border-gray-100 dark:border-white/5 hover:text-[#EE4D2D] transition-all active:scale-90">
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="#" className="p-3 rounded-2xl bg-white dark:bg-white/5 shadow-sm border border-gray-100 dark:border-white/5 text-gray-400 hover:text-[#EE4D2D] transition-all active:scale-90">
            <Instagram size={18}/>
          </a>
        </div>
      </nav>

      <header className="max-w-5xl mx-auto pt-20 pb-12 px-6 text-center">
        <div className="relative inline-block mb-8">
          <div className="w-28 h-28 bg-white border-[6px] border-[#EE4D2D] rounded-[2.5rem] mx-auto flex items-center justify-center shadow-2xl overflow-hidden ring-12 ring-orange-500/5 rotate-3 hover:rotate-0 transition-transform duration-700">
             <img src="/mask.png" alt="Logo" className="w-full h-full object-cover p-3" />
          </div>
          <div className="absolute -bottom-2 -right-4 bg-[#EE4D2D] text-white text-[9px] font-black px-3 py-1.5 rounded-full shadow-lg border-2 border-white dark:border-black animate-bounce">
            LIVE DEALS
          </div>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-[1000] uppercase tracking-tight italic leading-[0.9] mb-6">
  
  <span className="block text-gray-400 dark:text-gray-500 text-lg md:text-xl tracking-[0.3em] font-black mb-4">
    VIRAL PICKS
  </span>

  <span className="block bg-gradient-to-r from-black to-gray-500 dark:from-white dark:to-gray-400 text-transparent bg-clip-text">
    You’ll Regret Missing
  </span>

  <span className="block text-[#EE4D2D] mt-2 text-4xl md:text-6xl">
    ₱500 & Below
  </span>

</h2>


        {/* 🔥 EXTRA TRUST TAGS */}
        <div className="flex justify-center gap-3 flex-wrap mt-4 mb-6">
          <span className="text-[9px] font-black px-3 py-2 rounded-full bg-gray-100 dark:bg-white/5">🔥 Trending</span>
          <span className="text-[9px] font-black px-3 py-2 rounded-full bg-gray-100 dark:bg-white/5">💸 Budget Picks</span>
          <span className="text-[9px] font-black px-3 py-2 rounded-full bg-gray-100 dark:bg-white/5">⚡ Updated Daily</span>
        </div>

        <div className="md:hidden relative px-2 max-w-sm mx-auto">
          <input 
            type="text"
            placeholder="Search products..."
            className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl py-5 px-6 text-sm outline-none focus:border-[#EE4D2D] transition-all shadow-xl font-bold"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 pb-32">
        {loading ? (
          <div className="flex flex-col items-center py-40">
            <Loader2 className="animate-spin text-[#EE4D2D] mb-6" size={48} strokeWidth={3} />
            <p className="text-[10px] uppercase font-black tracking-[0.4em] text-gray-400 animate-pulse">Initializing Boutique...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-10">
            {filteredProducts.map((p) => (
              <a 
                key={p.id} 
                href={p.shopeeUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group relative bg-white dark:bg-[#0D0D0D] rounded-[3rem] overflow-hidden flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-white/5 transition-all duration-700 hover:-translate-y-4 hover:shadow-[#EE4D2D]/10 active:scale-[0.96]"
              >
                <div className="relative aspect-[1/1.1] overflow-hidden bg-gray-50 dark:bg-white/5 m-3 rounded-[2.2rem]">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                  
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-md text-white text-[9px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-xl">
                       {p.soldCount || "0"} <span className="text-gray-400">SOLD</span>
                    </div>
                    <div className="bg-white/90 backdrop-blur-md text-orange-600 text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-xl">
                      <Star size={10} fill="currentColor" /> {p.rating || "5.0"}
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#EE4D2D] text-white text-[8px] font-black px-4 py-2 rounded-full shadow-2xl flex items-center gap-2 opacity-0 group-hover:opacity-100 group-hover:bottom-6 transition-all duration-500 scale-90 group-hover:scale-100">
                    <ShoppingBag size={10} /> SECURE LINK
                  </div>
                </div>

                <div className="p-6 pt-2 flex flex-col flex-grow">
                  <span className="text-[10px] font-black text-[#EE4D2D] uppercase tracking-[0.2em] mb-2">{p.category}</span>
                  
                  <h3 className="text-[15px] font-[900] leading-tight mb-6 uppercase italic dark:text-gray-100 line-clamp-2 min-h-[2.5rem] group-hover:text-[#EE4D2D] transition-colors">
                    {p.title}
                  </h3>
                  
                  <div className="mt-auto flex flex-col gap-4">
                    <div className="flex justify-between items-end">
                       <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Price Point</span>
                          <span className="text-2xl font-black text-black dark:text-white tabular-nums">₱{p.estPrice}</span>
                       </div>
                       <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-[#EE4D2D] group-hover:text-white transition-all duration-500 rotate-0 group-hover:rotate-45">
                          <ArrowUpRight size={24} />
                       </div>
                    </div>

                    <div className="relative overflow-hidden w-full py-4 bg-[#EE4D2D] text-white text-center text-[11px] font-[1000] uppercase tracking-[0.2em] rounded-2xl transition-all duration-500 shadow-[0_10px_20px_rgba(238,77,45,0.3)] group-hover:shadow-[0_15px_30px_rgba(238,77,45,0.5)]">
                       <span className="relative z-10 flex items-center justify-center gap-2">SHOP THIS FIND <ArrowUpRight size={16} strokeWidth={3}/></span>
                       <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>

      <footer className="w-full bg-white dark:bg-[#080808] py-32 px-6 text-center border-t border-gray-100 dark:border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[#EE4D2D]/5 blur-[120px] pointer-events-none"></div>
        <h1 className="text-4xl font-black italic uppercase text-gray-200 dark:text-white/5 tracking-tighter mb-6 relative z-10">EL GUAPO</h1>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.5em] relative z-10">© 2026 Curated Viral Directory — All rights reserved</p>
      </footer>
    </div>
  );
};

export default Home;
