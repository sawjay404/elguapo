import React, { useState, useEffect, useRef } from 'react';
import { Instagram, ArrowUpRight, Youtube, ShoppingBag, Loader2, Search, Sun, Moon, Sparkles } from 'lucide-react';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzzL6n3RqRPJ3T4EfFjcvZbp5WAMGw8XWxBwrVficBd0umDDxsUReC9Mo41i8Yl11tsiQ/exec";

const Home = ({ isDarkMode, toggleTheme }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
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
    if (query.trim() === "") {
      setFilteredProducts(products);
      setShowSuggestions(false);
    } else {
      const filtered = products.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.id.toString().includes(query)
      );
      setFilteredProducts(filtered);
      setShowSuggestions(true);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-[#0A0A0A] text-black dark:text-white font-sans selection:bg-[#EE4D2D]">
      
      {/* TIKTOK STYLE ANNOUNCEMENT */}
      <div className="bg-[#EE4D2D] text-white text-[10px] font-black py-2.5 px-4 text-center uppercase tracking-[0.3em] shadow-lg flex items-center justify-center gap-2">
        <Sparkles size={12} className="animate-pulse" /> 
        Viral Shopee Finds — Verified Links 
        <Sparkles size={12} className="animate-pulse" />
      </div>

      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 px-6 py-4 flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <img src="/guapo.png" alt="Logo" className="w-8 h-8 object-contain" />
          <h1 className="text-xl font-black tracking-tighter italic leading-none text-[#EE4D2D]">EL GUAPO</h1>
        </div>
        
        <div className="hidden md:block relative w-1/3" ref={suggestionRef}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Search product name or code..."
              className="w-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full py-2.5 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#EE4D2D]/20 transition-all"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 hover:text-[#EE4D2D] transition-all">
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="h-6 w-[1px] bg-gray-200 dark:bg-white/10"></div>
          <a href="#" className="text-gray-400 hover:text-[#EE4D2D] transition-all"><Instagram size={20}/></a>
        </div>
      </nav>

      <header className="max-w-4xl mx-auto pt-12 pb-8 px-6 text-center">
        <div className="relative inline-block mb-6">
          <div className="w-24 h-24 bg-white border-4 border-[#EE4D2D] rounded-full mx-auto flex items-center justify-center shadow-2xl overflow-hidden ring-8 ring-orange-500/10">
             <img src="/mask.png" alt="Logo" className="w-full h-full object-cover p-2" />
          </div>
          <div className="absolute -bottom-2 -right-4 bg-[#EE4D2D] text-white text-[9px] font-black px-3 py-1.5 rounded-full shadow-lg border-2 border-white dark:border-black animate-bounce">
            LIVE DEALS
          </div>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black uppercase mb-3 tracking-tighter italic leading-[0.9]">🔥 Recommended <br className="md:hidden" /> Gear</h2>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {["⭐ Top Rated", "💸 Budget Finds", "📦 Fast Delivery"].map(tag => (
            <span key={tag} className="bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400">{tag}</span>
          ))}
        </div>

        <div className="md:hidden relative px-2" ref={suggestionRef}>
          <input 
            type="text"
            placeholder="Search products or use code..."
            className="w-full bg-gray-50 dark:bg-white/5 border-2 border-gray-100 dark:border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-[#EE4D2D] transition-all shadow-inner"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 mb-12">
        <div className="bg-orange-50 dark:bg-[#EE4D2D]/5 border-l-4 border-[#EE4D2D] p-4 rounded-r-2xl">
           <p className="text-[11px] text-gray-700 dark:text-gray-300 font-bold uppercase tracking-tight">
             <span className="bg-[#EE4D2D] text-white px-2 py-0.5 rounded mr-2">NOTICE</span> 
             All items link directly to <span className="text-[#EE4D2D]">Shopee.ph</span> official sellers.
           </p>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 md:px-6 pb-24">
        {loading ? (
          <div className="flex flex-col items-center py-32">
            <Loader2 className="animate-spin text-[#EE4D2D] mb-4" size={32} />
            <p className="text-xs uppercase font-black tracking-[0.3em] text-gray-400">Fetching Best Prices...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
            {filteredProducts.map((p) => (
              <a 
                key={p.id} 
                href={p.shopeeUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group bg-white rounded-[2.5rem] overflow-hidden flex flex-col shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-50 cursor-pointer active:scale-[0.97]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-[#EE4D2D] text-[10px] font-black px-3 py-1 rounded-full shadow-sm">
                    {p.rating || "4.9"} ⭐
                  </div>
                  <div className="absolute bottom-4 left-4 bg-[#EE4D2D] text-white text-[8px] font-black px-2 py-1 rounded shadow-lg flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ShoppingBag size={8} /> SHOPEE.PH
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow text-[#1A1A1A]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-black text-gray-400 tracking-[0.15em] uppercase">{p.category}</span>
                    <span className="text-[9px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">{p.soldCount || "1.2k+"} sold</span>
                  </div>
                  
                  <h3 className="text-[13px] font-black leading-tight mb-4 h-10 uppercase line-clamp-2 italic group-hover:text-[#EE4D2D] transition-colors">
                    {p.title}
                  </h3>

                  <div className="mt-auto pt-4 border-t border-dashed border-gray-100">
                    <div className="flex justify-between items-baseline mb-4">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Flash Price</span>
                      <span className="text-xl font-black text-[#EE4D2D]">₱{p.estPrice}</span>
                    </div>
                    
                    {/* VISUAL BUTTON - Now part of the global anchor link */}
                    <div className="w-full py-3.5 bg-[#EE4D2D] text-white text-center text-[11px] font-black uppercase rounded-[1.2rem] flex items-center justify-center gap-2 group-hover:brightness-110 shadow-[0_4px_0_0_#b8351d] transition-all">
                      GET IT NOW <ArrowUpRight size={14}/>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>

      <footer className="w-full bg-gray-50 dark:bg-white/5 py-20 px-6 text-center border-t border-gray-100 dark:border-white/5">
        <h1 className="text-2xl font-black italic uppercase text-gray-200 dark:text-white/10 tracking-tighter mb-4">EL GUAPO</h1>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em]">© 2026 Curated Gear Directory</p>
      </footer>
    </div>
  );
};

export default Home;