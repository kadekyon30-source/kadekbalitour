import React, { useState } from 'react';
import { useApp, NavPage } from '../context/AppContext';
import { Menu, X, Shield, MessageCircle } from 'lucide-react';
import { buildGeneralInquiryMessage } from '../utils/bookingUtils';
import { t } from '../utils/translations';
import { BrandLogo } from './BrandLogo';

export const Navbar: React.FC = () => {
  const { data, activePage, setActivePage, language, setLanguage, openWhatsApp, auth } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const brandName = 'KADEK BALI';

  const navLinks: Array<{ id: NavPage; labelKey: 'home' | 'destinations' | 'tours' | 'gallery' | 'about' | 'contact' }> = [
    { id: 'home', labelKey: 'home' },
    { id: 'destinations', labelKey: 'destinations' },
    { id: 'tours', labelKey: 'tours' },
    { id: 'gallery', labelKey: 'gallery' },
    { id: 'about', labelKey: 'about' },
    { id: 'contact', labelKey: 'contact' },
  ];

  const handleNavClick = (pageId: NavPage) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppClick = () => {
    const msg = buildGeneralInquiryMessage(brandName, language);
    openWhatsApp(msg);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#EDE5D8] transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark: KADEK in Blue, BALI in Green, TOUR BALI below */}
        <BrandLogo
          size="md"
          subtitle="TOUR BALI"
          onClick={() => handleNavClick('home')}
          className="shrink-0"
        />

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#252923]/80">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`hover:text-[#526B50] transition-colors py-1 cursor-pointer whitespace-nowrap shrink-0 ${
                activePage === link.id
                  ? 'text-[#15803D] font-bold border-b-2 border-[#15803D]'
                  : 'text-[#252923]/75'
              }`}
            >
              {t(link.labelKey, language)}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Utilities */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Language Switcher */}
          <div className="flex items-center bg-[#EDE5D8]/70 rounded-full p-0.5 text-xs font-medium">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                language === 'en' ? 'bg-[#526B50] text-[#FAF9F6] font-semibold shadow-xs' : 'text-[#252923]/70 hover:text-[#252923]'
              }`}
              title="English"
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('id')}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                language === 'id' ? 'bg-[#526B50] text-[#FAF9F6] font-semibold shadow-xs' : 'text-[#252923]/70 hover:text-[#252923]'
              }`}
              title="Bahasa Indonesia"
              aria-label="Ganti ke Bahasa Indonesia"
            >
              ID
            </button>
          </div>

          {/* Easy Admin Access Button */}
          <button
            onClick={() => handleNavClick('admin')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
              activePage === 'admin'
                ? 'bg-[#1E6FD9] text-white border-[#1E6FD9] shadow-xs'
                : 'text-[#252923] border-[#EDE5D8] bg-white/90 hover:border-[#1E6FD9] hover:text-[#1E6FD9]'
            }`}
            title={language === 'id' ? 'Dashboard Admin (Kelola Website)' : 'Admin Dashboard (Manage Website)'}
            aria-label="Admin Dashboard"
          >
            <Shield className={`w-3.5 h-3.5 ${activePage === 'admin' ? 'text-white' : 'text-[#1E6FD9]'}`} />
            <span className="hidden sm:inline">
              {auth.isAuthenticated
                ? (language === 'id' ? 'Dashboard' : 'Dashboard')
                : (language === 'id' ? 'Admin' : 'Admin')}
            </span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={handleWhatsAppClick}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#15803D] text-[#FAF9F6] hover:bg-[#166534] transition-colors shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t('chatWhatsApp', language)}</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#252923] hover:bg-[#EDE5D8]/60 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F6] border-b border-[#EDE5D8] px-4 pt-3 pb-6 shadow-md animate-fade-in">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                  activePage === link.id
                    ? 'bg-[#EDE5D8] text-[#526B50] font-semibold'
                    : 'text-[#252923] hover:bg-[#EDE5D8]/40'
                }`}
              >
                {t(link.labelKey, language)}
              </button>
            ))}

            <div className="pt-3 border-t border-[#EDE5D8] flex items-center justify-between">
              <span className="text-xs font-medium text-[#252923]/60">{t('languageLabel', language)}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    language === 'en' ? 'bg-[#526B50] text-[#FAF9F6]' : 'bg-[#EDE5D8] text-[#252923]'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('id')}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    language === 'id' ? 'bg-[#526B50] text-[#FAF9F6]' : 'bg-[#EDE5D8] text-[#252923]'
                  }`}
                >
                  Indonesia
                </button>
              </div>
            </div>

            {/* Mobile Admin Link */}
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold border border-[#1E6FD9]/30 text-[#1E6FD9] bg-[#1E6FD9]/5 hover:bg-[#1E6FD9]/10 transition-colors"
            >
              <Shield className="w-4 h-4 text-[#1E6FD9]" />
              <span>{language === 'id' ? 'Kelola Website (Portal Admin)' : 'Manage Website (Admin Portal)'}</span>
            </button>

            <button
              onClick={() => {
                handleWhatsAppClick();
                setMobileMenuOpen(false);
              }}
              className="mt-1 w-full flex items-center justify-center gap-2 py-3 rounded-full text-xs sm:text-sm font-semibold bg-[#15803D] text-[#FAF9F6] hover:bg-[#166534] transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span>{t('chatWhatsApp', language)} ({data.contact?.whatsappNumber || '+6285739256845'})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
