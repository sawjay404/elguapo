import React, { useState, useEffect } from "react";
import {
  Instagram,
  Youtube,
  Search,
  Sun,
  Moon,
  Star,
  Heart,
  CheckCircle,
  ShieldCheck,
  Link,
  Zap,
  Shirt,
  Headphones,
  Flame,
  ArrowRight,
  ExternalLink,
  Truck,
  ChevronRight,
  ShoppingBag
} from "lucide-react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzXPnhJn-XPG4YVqobPUvlWq3dbyHLPynCq_8AiFU0Ic7QRpACQNFwOLikfqvE8ul4ewA/exec";

const ScrollStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .glass-badge { background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(4px); }
  `}} />
);

const Home = ({ isDarkMode, toggleTheme }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(SCRIPT_URL)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
          setFilteredProducts(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = products.filter((p) => {
      const title = p.title?.toLowerCase() || "";
      const category = p.category?.toLowerCase() || "";
      return title.includes(query.toLowerCase()) || category.includes(query.toLowerCase());
    });
    setFilteredProducts(filtered);
  };

  const renderStars = (rating) => {
    const r = parseFloat(rating) || 5;
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={10} 
        className={`${i < Math.floor(r) ? 'text-orange-400 fill-orange-400' : 'text-zinc-200 dark:text-zinc-700'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#0A0A0A] text-slate-900 dark:text-zinc-100 transition-colors duration-300 font-sans pb-10">
      <ScrollStyles />
      
      <div className="bg-[#EE4D2D] text-white text-[9px] font-black py-2.5 text-center uppercase tracking-[0.2em]">
        OFFICIAL AFFILIATE DIRECTORY — REDIRECTS TO SHOPEE.PH
      </div>

      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-900 px-4">
        <div className="max-w-4xl mx-auto h-16 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="bg-white p-1 rounded-lg shadow-sm border border-zinc-100">
              <img src="/guapo.png" className="w-8 h-8 object-contain" alt="Logo" />
            </div>
            <h1 className="font-black italic text-lg md:text-xl tracking-tighter uppercase">EL GUAPO</h1>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
            <Instagram size={20} className="text-zinc-600 hover:text-[#EE4D2D] transition-colors cursor-pointer" />
            <Youtube size={20} className="text-zinc-600 hover:text-[#EE4D2D] transition-colors cursor-pointer" />
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* HERO SECTION */}
        <section className="text-center pt-10">
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#EE4D2D] to-orange-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img
              src="/mask.png"
              className="relative w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full border-4 border-white dark:border-zinc-900 bg-white shadow-2xl"
              alt="Profile"
            />
          </div>

          <h2 className="text-3xl md:text-4xl font-black mt-8 tracking-tighter italic uppercase leading-[0.9] text-zinc-900 dark:text-white">
            Viral Picks <br/> <span className="text-[#EE4D2D]">On TikTok 🔥</span>
          </h2>
          
          <div className="flex justify-center gap-4 mt-5 text-[10px] md:text-xs font-black text-zinc-400 uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-[#EE4D2D]" /> Budget Finds</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-[#EE4D2D]" /> Daily Drops</span>
          </div>

          {/* SEARCH BAR */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl py-4 pl-12 pr-6 text-sm shadow-xl shadow-zinc-200/50 dark:shadow-none outline-none focus:ring-2 focus:ring-[#EE4D2D]/20 focus:border-[#EE4D2D] transition-all"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* NOTICE BAR */}
          <div className="mt-6 max-w-xl mx-auto bg-[#EE4D2D]/5 border-l-[6px] border-[#EE4D2D] p-4 text-left rounded-r-2xl shadow-sm">
            <p className="text-[12px] md:text-[13px] leading-snug font-medium text-zinc-600 dark:text-zinc-400">
              <span className="text-[#EE4D2D] font-black uppercase tracking-tighter mr-1">OFFICIAL NOTICE:</span> 
              All links redirect to authorized Shopee.ph sellers. Prices are subject to change.
            </p>
          </div>

          {/* TRUST BADGES */}
          <div className="mt-6 max-w-2xl mx-auto bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 flex items-center justify-between shadow-sm backdrop-blur-sm">
            {[
              { icon: <ShieldCheck size={18} className="text-[#EE4D2D]"/>, label: "Verified", sub: "100% Legit" },
              { icon: <Star size={18} className="text-orange-400"/>, label: "Curated", sub: "Daily Picks" },
              { icon: <Link size={18} className="text-orange-600"/>, label: "Official", sub: "Direct Links" }
            ].map((badge, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col md:flex-row items-center gap-2 flex-1">
                  {badge.icon}
                  <div className="text-center md:text-left">
                    <p className="text-[10px] font-black uppercase leading-none">{badge.label}</p>
                    <p className="text-[8px] text-zinc-400 font-bold uppercase hidden sm:block">{badge.sub}</p>
                  </div>
                </div>
                {idx < 2 && <div className="w-[1px] h-8 bg-zinc-100 dark:bg-zinc-800" />}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="mt-12">
          <div className="flex justify-between items-end mb-4 px-1">
            <div>
              <p className="text-[#EE4D2D] text-[10px] font-black uppercase tracking-[0.2em] mb-1">Collections</p>
              <h3 className="font-black text-xl uppercase tracking-tighter">Browse Categories</h3>
            </div>
            <button className="text-zinc-400 text-[10px] font-black uppercase flex items-center gap-1 hover:text-[#EE4D2D] transition-colors">
              Explore All <ChevronRight size={14}/>
            </button>
          </div>
          <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2">
            {[
              { name: 'Trending', icon: <Flame size={14}/> },
              { name: 'Under ₱300', icon: <Zap size={14}/> },
              { name: 'Streetwear', icon: <Shirt size={14}/> },
              { name: 'Tech Finds', icon: <Headphones size={14}/> },
              { name: 'Home Living', icon: <Truck size={14}/> },
            ].map((cat) => (
              <button
                key={cat.name}
                onClick={() => handleSearch(cat.name === 'Trending' ? '' : cat.name)}
                className={`flex items-center gap-2 whitespace-nowrap px-6 py-3 rounded-xl text-[11px] font-black uppercase transition-all border ${
                  searchQuery.toLowerCase() === cat.name.toLowerCase() 
                  ? 'bg-[#EE4D2D] border-[#EE4D2D] text-white shadow-lg shadow-[#EE4D2D]/30' 
                  : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-[#EE4D2D]'
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>
        </section>

        {/* PRODUCT GRID */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {loading ? (
              <div className="col-span-full py-20 text-center">
                <div className="w-10 h-10 border-4 border-[#EE4D2D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="font-black text-zinc-400 text-xs uppercase tracking-[0.3em]">Syncing Feed...</p>
              </div>
          ) : filteredProducts.map((p, i) => (
            <a
              key={p.id || i}
              href={p.shopeeUrl || "#"}
              target="_blank"
              rel="noreferrer"
              className="group bg-white dark:bg-zinc-900 rounded-[24px] overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:shadow-[#EE4D2D]/10 transition-all duration-500 hover:-translate-y-2"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative aspect-square overflow-hidden bg-zinc-50 dark:bg-zinc-800">
                <img 
                  src={p.image} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={p.title} 
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  {p.label && (
                    <span className="text-[8px] font-black px-2.5 py-1 rounded-full bg-[#EE4D2D] text-white uppercase tracking-wider shadow-lg">
                       {p.label}
                    </span>
                  )}
                  {p.soldCount && (
                    <span className="glass-badge text-white text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {p.soldCount} SOLD
                    </span>
                  )}
                </div>
                <button className="absolute top-3 right-3 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full p-2 text-zinc-400 hover:text-[#EE4D2D] shadow-sm transition-colors">
                  <Heart size={16} />
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  {renderStars(p.rating)}
                  <span className="text-[10px] font-bold ml-1 text-zinc-400">{p.rating || "5.0"}</span>
                </div>

                <h3 className="text-[13px] font-bold leading-tight line-clamp-2 h-[34px] group-hover:text-[#EE4D2D] transition-colors">
                  <span className="text-[#EE4D2D] font-black mr-1">{i + 1}.</span>
                  {p.title || "Elite Product Listing"}
                </h3>

                <div className="mt-3 flex items-baseline gap-1">
                   <span className="text-[10px] font-black text-[#28A745] uppercase tracking-tighter">Starts at</span>
                   <span className="text-xl font-black text-[#28A745] tracking-tighter">₱{p.estPrice || "0"}</span>
                </div>

                {/* UPDATED BUY BUTTON: "Shop on Shopee" */}
                <div className="mt-4 flex items-center justify-center gap-2 bg-[#EE4D2D] text-white py-3 rounded-2xl text-[10px] font-black tracking-[0.1em] hover:bg-[#ff5722] transition-all duration-300 uppercase shadow-lg shadow-[#EE4D2D]/20">
                  <ShoppingBag size={14} /> Shop on Shopee
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* FOOTER */}
        <footer className="mt-20 py-12 border-t border-zinc-100 dark:border-zinc-900 text-center">
          <div className="flex flex-col items-center gap-6">
             <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                  <ShieldCheck size={16} className="text-[#EE4D2D]"/> Buyer Protected
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                  <Truck size={16} className="text-[#EE4D2D]"/> Nationwide
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                  <Star size={16} className="text-[#EE4D2D]"/> Top Rated
                </div>
             </div>
             
             <div className="bg-zinc-100 dark:bg-zinc-900 px-6 py-2 rounded-full">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">
                  © 2026 EL GUAPO DIRECTORY
                </p>
             </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;