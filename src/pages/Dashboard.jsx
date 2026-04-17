import React, { useState, useEffect } from 'react';
import { Plus, X, Send, LogOut, Trash2, LayoutDashboard, Loader2, ExternalLink, Search, Sun, Moon, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// REPLACE THIS WITH YOUR NEW DEPLOYMENT URL
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzXPnhJn-XPG4YVqobPUvlWq3dbyHLPynCq_8AiFU0Ic7QRpACQNFwOLikfqvE8ul4ewA/exec";

const Dashboard = ({ setIsAuthenticated, isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({ 
    title: '', 
    estPrice: '', 
    image: '', 
    shopeeUrl: '', 
    category: 'CLOTHING', 
    rating: '', 
    soldCount: '' 
  });

  const fetchProducts = () => {
    setLoading(true);
    fetch(SCRIPT_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = products.filter(p => 
      p.title.toLowerCase().includes(query.toLowerCase()) || 
      p.id.toString().includes(query) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setStatus('Uploading to Sheets...');
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ action: "add", ...formData })
      });
      setStatus('Success! Inventory Updated.');
      setFormData({ title: '', estPrice: '', image: '', shopeeUrl: '', category: 'CLOTHING', rating: '', soldCount: '' });
      setTimeout(() => { 
        setIsModalOpen(false); 
        setStatus(''); 
        fetchProducts(); 
      }, 1500);
    } catch (err) { 
      setStatus('Error uploading.'); 
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Permanent Delete?")) return;
    setStatus('Deleting...');
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ action: "delete", id: id })
      });
      setStatus('Deleted!');
      setTimeout(() => { fetchProducts(); setStatus(''); }, 1000);
    } catch (err) { 
      setStatus('Error deleting.'); 
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-black dark:text-white transition-colors duration-500 font-sans">
      
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/90 dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/5 px-6 py-4 flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          <div className="bg-[#EE4D2D] p-2 rounded-lg text-white">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h1 className="text-lg font-black italic text-[#EE4D2D]">GUAPO ADMIN</h1>
            <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Inventory Management</p>
          </div>
        </div>

        <div className="hidden md:block relative w-1/3">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text"
            placeholder="Search inventory..."
            className="w-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full py-2 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#EE4D2D]/20 transition-all font-bold"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 hover:text-[#EE4D2D] transition-all">
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={handleLogout} className="p-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 hover:bg-red-600 hover:text-white transition-all">
            <LogOut size={18} />
          </button>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 py-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{products.length} Items Live</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">Inventory</h2>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-[#EE4D2D] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Plus size={20} strokeWidth={3}/> Add New Drop
          </button>
        </header>

        {loading ? (
          <div className="flex flex-col items-center py-32">
            <Loader2 className="animate-spin text-[#EE4D2D] mb-4" size={40} />
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Syncing with Google Sheets...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredProducts.map((p) => (
              <div key={p.id} className="group bg-white dark:bg-white/[0.02] rounded-[2.5rem] overflow-hidden flex flex-col shadow-xl border border-gray-100 dark:border-white/5 hover:border-[#EE4D2D]/30 transition-all duration-500 min-h-full">
                <div className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-white/5">
                  <img src={p.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={() => handleDelete(p.id)} className="bg-white/90 dark:bg-black/90 backdrop-blur-md text-red-600 p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:text-white shadow-xl">
                      <Trash2 size={16}/>
                    </button>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{p.category}</span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-[9px] font-bold text-orange-600 bg-orange-50 dark:bg-orange-500/10 px-2 py-1 rounded-full">
                        <Star size={8} fill="currentColor"/> {p.rating || "0"}
                      </div>
                      <span className="text-[8px] font-black text-gray-400 whitespace-nowrap">{p.soldCount || "0"} sold</span>
                    </div>
                  </div>
                  
                  {/* Updated Title: Removed line-clamp and added leading-normal for better spacing with emojis */}
                  <h3 className="text-[13px] font-black leading-normal mb-6 uppercase italic dark:text-gray-200 whitespace-pre-wrap">
                    {p.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 border-t border-dashed border-gray-100 dark:border-white/5 flex justify-between items-center">
                    <div className="flex flex-col">
                       <span className="text-[8px] font-bold text-gray-400 uppercase">Flash Price</span>
                       <span className="text-lg font-black text-[#EE4D2D]">₱{p.estPrice}</span>
                    </div>
                    <a href={p.shopeeUrl} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-gray-50 dark:bg-white/5 text-gray-400 hover:text-[#EE4D2D] transition-all">
                      <ExternalLink size={16}/>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-white dark:bg-[#121212] w-full max-w-lg rounded-[2.5rem] p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-[#EE4D2D]"><X size={24}/></button>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-8">New Drop</h2>

            <form onSubmit={handleAddProduct} className="space-y-5">
              <input className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl outline-none border border-transparent focus:border-[#EE4D2D] font-bold" placeholder="Product Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
              
              <div className="grid grid-cols-2 gap-4">
                <input className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl outline-none font-bold" placeholder="Price (₱)" value={formData.estPrice} onChange={e => setFormData({...formData, estPrice: e.target.value})} required />
                <select className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl font-bold" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="CLOTHING">CLOTHING</option>
                  <option value="TECH">TECH</option>
                  <option value="GAMING">GAMING</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl outline-none font-bold" placeholder="Rating (e.g. 5)" value={formData.rating} onChange={e => setFormData({...formData, rating: e.target.value})} />
                <input className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl outline-none font-bold" placeholder="Sold (e.g. 14)" value={formData.soldCount} onChange={e => setFormData({...formData, soldCount: e.target.value})} />
              </div>

              <input className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl outline-none font-bold" placeholder="Image Link" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} required />
              <input className="w-full p-4 bg-gray-50 dark:bg-white/5 rounded-2xl outline-none font-bold" placeholder="Shopee Link" value={formData.shopeeUrl} onChange={e => setFormData({...formData, shopeeUrl: e.target.value})} required />

              <button type="submit" className="w-full bg-[#EE4D2D] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2">
                UPLOAD <Send size={16}/>
              </button>
              {status && <p className="text-center text-[#EE4D2D] font-black text-[10px] uppercase mt-4">{status}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;