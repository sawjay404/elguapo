import React, { useState, useEffect, useRef } from 'react';
import { Instagram, ArrowUpRight, Youtube, ShoppingBag, Loader2, Search, Sun, Moon, X } from 'lucide-react';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzzL6n3RqRPJ3T4EfFjcvZbp5WAMGw8XWxBwrVficBd0umDDxsUReC9Mo41i8Yl11tsiQ/exec";

const Home = ({ isDarkMode, toggleTheme }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);

  // 1. Fetch Data
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

  // 2. Search & Predictive Logic
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProducts(products);
      setShowSuggestions(false);
    } else {
      const filtered = products.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
      setShowSuggestions(true);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-gradient-to-b dark:from-[#0f0f0f] dark:via-[#1a1a1a] dark:to-[#0f0f0f] text-black dark:text-white font-sans selection:bg-[#EE4D2D]">
      
      {/* SHOPEE ANNOUNCEMENT BAR */}
      <div className="bg-[#EE4D2D] text-white text-[10px] font-bold py-2 px-4 text-center uppercase tracking-[0.2em] shadow-lg">
        Official Affiliate Directory — Redirects to Shopee.ph
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/60 backdrop-blur-md border-b border-gray-100 dark:border-white/5 px-6 py-4 flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <img src="/guapo.png" alt="Logo" className="w-8 h-8 object-contain" />
          <h1 className="text-xl font-black tracking-tighter italic leading-none">EL GUAPO</h1>
        </div>
        
        {/* DESKTOP SEARCH & PREDICTIVE BOX */}
        <div className="hidden md:block relative w-1/3" ref={suggestionRef}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Search gear..."
              className="w-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full py-2 pl-12 pr-4 text-sm outline-none focus:border-[#EE4D2D] transition-all"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setShowSuggestions(true)}
            />
          </div>
          
          {showSuggestions && filteredProducts.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl z-[60] border border-gray-100 dark:border-white/10">
              {filteredProducts.slice(0, 5).map((p) => (
                <button 
                  key={p.id}
                  onClick={() => {
                    setSearchQuery(p.title);
                    setFilteredProducts([p]);
                    setShowSuggestions(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left"
                >
                  <img src={p.image} className="w-8 h-8 rounded-md object-cover" alt="" />
                  <div>
                    <p className="text-xs font-bold text-black dark:text-white uppercase truncate">{p.title}</p>
                    <p className="text-[9px] text-[#EE4D2D] font-black tracking-widest uppercase">{p.category}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* THEME TOGGLE */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400 hover:text-[#EE4D2D] transition-all"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="h-4 w-[1px] bg-gray-200 dark:bg-white/10 mx-1"></div>
          <a href="#" className="text-gray-400 hover:text-[#EE4D2D] transition-colors"><Instagram size={18}/></a>
          <a href="#" className="text-gray-400 hover:text-red-600 transition-colors"><Youtube size={18}/></a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-4xl mx-auto pt-12 pb-8 px-6 text-center">
        <div className="w-24 h-24 bg-white border-2 border-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-2xl overflow-hidden">
           <img src="/mask.png" alt="Logo" className="w-full h-full object-cover p-2" />
        </div>
        <h2 className="text-3xl font-black uppercase mb-1 tracking-tight italic">Recommended Gear</h2>
        <p className="text-gray-500 dark:text-gray-400 text-[11px] font-bold uppercase tracking-[0.2em]">
          Curated by El Guapo <br />
          <span className="text-[#EE4D2D]">Direct Links to Shopee Sellers</span>
        </p>

        {/* MOBILE SEARCH BAR */}
        <div className="mt-8 md:hidden px-4 relative" ref={suggestionRef}>
          <input 
            type="text"
            placeholder="Search products..."
            className="w-full bg-gray-100 dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-xl py-4 px-6 text-sm outline-none focus:border-[#EE4D2D]"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </header>

      {/* REDIRECT NOTICE */}
      <div className="max-w-[1400px] mx-auto px-6 mb-10">
        <div className="bg-gray-50 dark:bg-white/5 border-l-4 border-[#EE4D2D] p-4 rounded-r-xl">
           <p className="text-[11px] leading-relaxed text-gray-600 dark:text-gray-300 font-medium">
             <span className="font-bold text-[#EE4D2D] uppercase mr-1">Notice:</span> Tapping a product redirects you to the official product page on <span className="font-bold text-[#EE4D2D]">Shopee.ph</span>.
           </p>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 md:px-6 pb-24">
        {loading ? (
          <div className="flex flex-col items-center py-20 opacity-50">
            <Loader2 className="animate-spin text-[#EE4D2D] mb-2" />
            <p className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Loading Deals...</p>
          </div>
        ) : (
          <>
            {/* SEARCH STATS */}
            {searchQuery && (
              <div className="mb-6 flex items-center justify-between px-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  Showing {filteredProducts.length} results for "{searchQuery}"
                </p>
                <button onClick={() => handleSearch("")} className="text-[#EE4D2D] text-[10px] font-bold uppercase underline">Clear</button>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
              {filteredProducts.map((p) => (
                <div key={p.id} className="group bg-white rounded-3xl overflow-hidden flex flex-col shadow-2xl transition-all duration-300 hover:ring-2 hover:ring-[#EE4D2D]">
                  <div className="relative aspect-square overflow-hidden bg-gray-50 border-b">
                    <img src={p.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute bottom-2 left-2 bg-[#EE4D2D] text-white text-[7px] font-black px-2 py-1 rounded shadow-lg flex items-center gap-1">
                      <ShoppingBag size={8} /> SHOPEE.PH
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow text-[#1A1A1A]">
                    <span className="text-[8px] font-black text-gray-400 mb-1 tracking-widest uppercase">{p.category}</span>
                    <h3 className="text-[12px] font-bold leading-tight mb-4 h-8 uppercase line-clamp-2 italic">{p.title}</h3>
                    <div className="mt-auto pt-3 border-t border-gray-100">
                      <p className="text-[10px] text-gray-500 mb-2 flex justify-between uppercase">Est. Price: <span className="text-black font-black">₱{p.estPrice}</span></p>
                      <a href={p.shopeeUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-[#1A1A1A] text-white text-center text-[9px] font-black uppercase rounded-2xl flex items-center justify-center gap-2 hover:bg-[#EE4D2D] transition-all active:scale-95 shadow-md">
                        View on Shopee <ArrowUpRight size={12}/>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 uppercase font-black text-[10px] tracking-[0.3em]">No items found matching your search</p>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="w-full bg-gray-50 dark:bg-black/40 border-t border-gray-100 dark:border-white/5 py-16 px-6 text-center">
        <div className="max-w-xs mx-auto space-y-4">
          <h1 className="text-xl font-black italic uppercase text-gray-300 dark:text-white/20 tracking-tighter">EL GUAPO</h1>
          <p className="text-[9px] text-gray-500 dark:text-gray-600 font-bold uppercase tracking-[0.2em] leading-relaxed">
            Curated Gear & Essentials <br />
            © 2026 El Guapo Directory
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;