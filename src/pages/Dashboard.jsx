import React, { useState, useEffect, useRef } from 'react';
import { Plus, X, Send, LogOut, Trash2, LayoutDashboard, Loader2, ExternalLink, Search, Sun, Moon, Star, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzzL6n3RqRPJ3T4EfFjcvZbp5WAMGw8XWxBwrVficBd0umDDxsUReC9Mo41i8Yl11tsiQ/exec";

const Dashboard = ({ setIsAuthenticated, isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('');
  
  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const suggestionRef = useRef(null);

  // Form State - UPDATED to include rating and soldCount
  const [formData, setFormData] = useState({ 
    title: '', estPrice: '', image: '', shopeeUrl: '', category: 'CLOTHING', rating: '4.9', soldCount: '1.2k+' 
  });

  // 1. FETCH LIVE DATA
  const fetchProducts = () => {
    setLoading(true);
    fetch(SCRIPT_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. SEARCH LOGIC - UPDATED to include ID search
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p => 
        p.title.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.id.toString().includes(query)
      );
      setFilteredProducts(filtered);
    }
  };

  // 3. ADD PRODUCT
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setStatus('Uploading...');
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: "add", ...formData })
      });
      setStatus('Success!');
      setFormData({ title: '', estPrice: '', image: '', shopeeUrl: '', category: 'CLOTHING', rating: '4.9', soldCount: '1.2k+' });
      
      setTimeout(() => {
        setIsModalOpen(false);
        setStatus('');
        fetchProducts();
      }, 1500);
    } catch (err) {
      setStatus('Error uploading.');
    }
  };

  const logout = () => {
    localStorage.removeItem('elguapo_token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-[#0f0f0f] text-black dark:text-white font-sans">
      
      {/* ADMIN NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/60 backdrop-blur-md border-b border-gray-100 dark:border-white/5 px-6 py-4 flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <LayoutDashboard className="text-[#EE4D2D]" size={20} />
          <h1 className="text-xl font-black italic uppercase tracking-tighter leading-none">Admin <span className="text-[#EE4D2D]">Hub</span></h1>
        </div>
        
        <div className="hidden md:block relative w-1/3" ref={suggestionRef}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text"
            placeholder="Search by name, category, or code..."
            className="w-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full py-2 pl-12 pr-4 text-sm outline-none focus:border-[#EE4D2D] transition-all"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:text-[#EE4D2D]">
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#EE4D2D] text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg"
          >
            <Plus size={14}/> Add New
          </button>
          <button onClick={logout} className="text-gray-400 hover:text-red-500 transition-colors">
            <LogOut size={20}/>
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-6 py-12">
        <div className="flex justify-between items-end mb-10 border-b border-gray-100 dark:border-white/5 pb-6">
          <div>
            <h2 className="text-3xl font-black uppercase italic tracking-tight">Inventory Manager</h2>
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              {searchQuery ? `Filtered: ${filteredProducts.length}` : `Live Directory: ${products.length}`} Items
            </p>
          </div>
          <button onClick={() => navigate('/')} className="text-[10px] font-black text-gray-400 hover:text-[#EE4D2D] flex items-center gap-2 uppercase tracking-widest transition-all">
            Visit Public Site <ExternalLink size={14}/>
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 opacity-30">
            <Loader2 className="animate-spin text-[#EE4D2D] mb-4" size={40} />
            <p className="text-[10px] uppercase font-black tracking-[0.3em]">Syncing Data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredProducts.map((p) => (
              <div key={p.id} className="group relative bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-2xl transition-all border border-transparent hover:border-[#EE4D2D]/50">
                <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-red-600 text-white p-2 rounded-xl shadow-xl hover:scale-110 transition-transform">
                    <Trash2 size={16}/>
                  </button>
                </div>
                <div className="relative aspect-square overflow-hidden bg-gray-50 border-b border-gray-100">
                  <img src={p.image} alt="" className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md text-[#EE4D2D] text-[8px] font-black px-2 py-0.5 rounded-full shadow-sm">
                    {p.rating || "4.9"} ⭐
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-grow text-[#1A1A1A]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[8px] font-black text-gray-400 tracking-widest uppercase">{p.category}</span>
                    <span className="text-[8px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">{p.soldCount || "1.2k+"}</span>
                  </div>
                  <h3 className="text-[12px] font-bold leading-tight mb-2 line-clamp-2 h-8 uppercase tracking-tight italic">
                    {p.title}
                  </h3>
                  <div className="mt-auto pt-3 border-t border-gray-50 flex justify-between items-center">
                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-tighter">Code: {p.id.toString().slice(-4)}</p>
                    <p className="text-[13px] font-black italic text-[#EE4D2D]">₱{p.estPrice}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* MODAL - UPDATED with Rating and Sold Count */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-white w-full max-w-md rounded-[40px] p-8 text-black shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-300 hover:text-black"><X size={24}/></button>
            <h2 className="text-2xl font-black uppercase italic mb-6 tracking-tighter">Add New Gear</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Product Title</label>
                <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#EE4D2D] text-sm font-bold" placeholder="e.g., NIRVANA T-SHIRT" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Price (₱)</label>
                  <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#EE4D2D] text-sm font-bold" placeholder="300" value={formData.estPrice} onChange={e => setFormData({...formData, estPrice: e.target.value})} required />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Category</label>
                  <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none font-bold text-xs" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="CLOTHING">CLOTHING</option>
                    <option value="TECH">TECH</option>
                    <option value="GAMING">GAMING</option>
                    <option value="GROOMING">GROOMING</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Rating (⭐)</label>
                  <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#EE4D2D] text-sm font-bold" placeholder="4.9" value={formData.rating} onChange={e => setFormData({...formData, rating: e.target.value})} />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Sold Count</label>
                  <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#EE4D2D] text-sm font-bold" placeholder="1.2k+" value={formData.soldCount} onChange={e => setFormData({...formData, soldCount: e.target.value})} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Image URL</label>
                <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#EE4D2D] text-sm font-bold" placeholder="https://i.imgur.com/..." value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} required />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-gray-400 ml-1">Shopee URL</label>
                <input className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#EE4D2D] text-sm font-bold" placeholder="https://s.shopee.ph/..." value={formData.shopeeUrl} onChange={e => setFormData({...formData, shopeeUrl: e.target.value})} required />
              </div>
              
              <button className="w-full bg-[#EE4D2D] text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-black transition-all flex items-center justify-center gap-2 mt-4 shadow-xl active:scale-95">
                POST PRODUCT <Send size={16}/>
              </button>
              {status && <p className="text-center font-bold text-[#EE4D2D] mt-2 text-[10px] uppercase animate-pulse">{status}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;