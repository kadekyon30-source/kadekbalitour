import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Lock, User, ArrowLeft, KeyRound, Sparkles, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';

export const AdminLogin: React.FC = () => {
  const { login, setActivePage, language, setLanguage } = useApp();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = async (u: string, p: string) => {
    setErrorMsg('');
    setLoading(true);

    const res = await login(u, p);
    setLoading(false);
    if (!res.success) {
      setErrorMsg(
        language === 'id'
          ? res.error || 'Username atau password salah. Silakan coba lagi.'
          : res.error || 'Invalid credentials. Please verify your username and password.'
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLoginSubmit(username, password);
  };

  const handleQuickLogin = () => {
    setUsername('admin');
    setPassword('verlaska2026!');
    handleLoginSubmit('admin', 'verlaska2026!');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 bg-[#FAF9F6]">
      <div className="max-w-md w-full bg-white rounded-3xl p-7 sm:p-10 border border-[#EDE5D8] shadow-xl relative overflow-hidden">
        {/* Subtle decorative gradient header */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#1E6FD9] via-[#15803D] to-[#C6A66B]"></div>

        {/* Top actions: Back to Site & Language toggle */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setActivePage('home')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15803D] hover:text-[#166534] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'id' ? 'Kembali ke Website' : 'Back to Public Site'}</span>
          </button>

          <div className="flex items-center bg-[#EDE5D8]/60 rounded-full p-0.5 text-[11px] font-semibold">
            <button
              onClick={() => setLanguage('id')}
              className={`px-2 py-0.5 rounded-full transition-colors ${
                language === 'id' ? 'bg-[#15803D] text-white shadow-xs' : 'text-stone-600'
              }`}
            >
              ID
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-full transition-colors ${
                language === 'en' ? 'bg-[#15803D] text-white shadow-xs' : 'text-stone-600'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-block mb-3">
            <BrandLogo size="md" subtitle="TOUR BALI · PORTAL PENGELOLA" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#252923]">
            {language === 'id' ? 'Login Pengelola Website' : 'Owner Portal Login'}
          </h1>
          <p className="text-xs text-[#252923]/70 font-light mt-1">
            {language === 'id'
              ? 'Kelola paket tur, destinasi, ulasan, galeri foto, dan pengaturan kontak WhatsApp.'
              : 'Sign in to manage tour packages, destinations, reviews, gallery photos, and contact settings.'}
          </p>
        </div>

        {/* 1-Click Quick Login button for owner convenience */}
        <div className="mb-6">
          <button
            type="button"
            onClick={handleQuickLogin}
            disabled={loading}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#1E6FD9]/10 via-[#15803D]/10 to-[#1E6FD9]/10 border-2 border-[#1E6FD9]/40 hover:border-[#1E6FD9] text-xs sm:text-sm font-bold text-[#1E6FD9] flex items-center justify-center gap-2 transition-all hover:shadow-md cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 text-[#1E6FD9] animate-pulse" />
            <span>
              {language === 'id'
                ? '⚡ Masuk Otomatis 1-Klik (Pemilik Website)'
                : '⚡ 1-Click Instant Login (Owner Access)'}
            </span>
          </button>
          <span className="text-[11px] text-stone-500 block text-center mt-1.5 font-light">
            {language === 'id'
              ? 'Klik tombol di atas untuk langsung masuk tanpa perlu mengetik.'
              : 'Click above to log in instantly without typing credentials.'}
          </span>
        </div>

        <div className="relative flex py-2 items-center mb-4">
          <div className="flex-grow border-t border-[#EDE5D8]"></div>
          <span className="flex-shrink mx-3 text-[11px] text-stone-400 uppercase font-medium">
            {language === 'id' ? 'atau login manual' : 'or manual login'}
          </span>
          <div className="flex-grow border-t border-[#EDE5D8]"></div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#252923] mb-1">
              Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8] focus:outline-none focus:border-[#15803D]"
                placeholder="Username (admin)"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#252923] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8] focus:outline-none focus:border-[#15803D]"
                placeholder="Password (verlaska2026!)"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full text-xs sm:text-sm font-semibold bg-[#15803D] text-[#FAF9F6] hover:bg-[#166534] transition-all shadow-sm cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading
              ? (language === 'id' ? 'Memverifikasi...' : 'Authenticating...')
              : (language === 'id' ? 'Masuk ke Dashboard' : 'Sign In to Dashboard')}
          </button>
        </form>

        {/* Credentials guide box */}
        <div className="mt-6 pt-5 border-t border-[#EDE5D8] text-xs text-[#252923]/70 space-y-1.5 bg-[#EDE5D8]/20 p-3.5 rounded-2xl">
          <div className="flex items-center gap-1.5 font-semibold text-[#15803D]">
            <KeyRound className="w-3.5 h-3.5" />
            <span>{language === 'id' ? 'Informasi Akun Default:' : 'Default Credentials:'}</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span>Username: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-stone-800">admin</code></span>
            <span>Password: <code className="bg-white px-1.5 py-0.5 rounded font-mono font-bold text-stone-800">verlaska2026!</code></span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-700 pt-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>{language === 'id' ? 'Akses penuh tanpa batas untuk pengelola KADEK BALI' : 'Full unrestricted access for KADEK BALI owner'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
