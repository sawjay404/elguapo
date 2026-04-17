import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbweHJ3EQa2pXTH43Cp7qlDOYSb-Y0glfLxhGWU1dmitdpXifGKDscEK6JOgU-Kq0GW2Ww/exec";

const Login = ({ setIsAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus('Verifying...');

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
          action: "login",
          password: password
        })
      });

      const result = await response.text();

      if (result === "Authorized") {
        localStorage.setItem('elguapo_token', 'true');
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        setStatus('Invalid Password, bro.');
      }
    } catch (err) {
      setStatus('Server Error. Check Apps Script Deployment.');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
      <form onSubmit={handleLogin} className="bg-[#1a1a1a] p-10 rounded-3xl border border-white/5 shadow-2xl w-full max-w-sm text-center">
        <h1 className="text-2xl font-black italic uppercase mb-8 tracking-tighter">Admin Access</h1>
        <input 
          type="password" 
          placeholder="Enter Secret Key"
          className="w-full p-4 bg-black border border-white/10 rounded-2xl mb-4 outline-none focus:border-orange-600 transition-all text-center"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {status && <p className="text-xs font-bold text-orange-600 mb-4 uppercase tracking-widest animate-pulse">{status}</p>}
        <button className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          Unlock Dashboard
        </button>
      </form>
    </div>
  );
};

export default Login;