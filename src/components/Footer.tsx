import React from 'react';
import { useApp, NavPage } from '../context/AppContext';
import { MapPin, Mail, MessageCircle, Shield, Instagram, Facebook, Youtube, Share2 } from 'lucide-react';
import { formatWhatsAppLink, buildSocialUrl } from '../utils/bookingUtils';
import { t } from '../utils/translations';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const { data, setActivePage, language, auth } = useApp();
  const settings = data.settings || {};
  const contact = data.contact || {};
  const brandName = 'KADEK BALI';

  const handleNav = (p: NavPage) => {
    setActivePage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const defaultDescEn =
    'Boutique Bali travel experiences, private sightseeing tours, and comfortable holiday transportation tailored to your pace with KADEK BALI.';
  const defaultDescId =
    'Pengalaman wisata butik di Bali, paket tur privat, dan transportasi liburan nyaman yang disesuaikan dengan ritme santai Anda bersama KADEK BALI.';

  const isDefaultDesc = !settings.description || settings.description.includes('VERLASKA');
  const description = language === 'id' && isDefaultDesc ? defaultDescId : (isDefaultDesc ? defaultDescEn : settings.description);

  const instagramUrl = buildSocialUrl('instagram', contact.instagram);
  const facebookUrl = buildSocialUrl('facebook', contact.facebook);
  const tiktokUrl = buildSocialUrl('tiktok', contact.tiktok);
  const youtubeUrl = buildSocialUrl('youtube', contact.youtube);

  return (
    <footer className="bg-[#252923] text-[#FAF9F6] border-t border-[#363a33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-3 -ml-3 rounded-2xl bg-white/5 inline-block">
              <BrandLogo size="md" subtitle="TOUR BALI" onClick={() => handleNav('home')} />
            </div>
            <p className="text-xs sm:text-sm text-[#EDE5D8]/75 font-light leading-relaxed max-w-sm">
              {description}
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#C6A66B]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{language === 'id' ? 'Layanan Seluruh Bali · Antar-Jemput Hotel & Bandara' : 'Island-wide Bali Service · Hotel & Airport Pickup'}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C6A66B] font-semibold">
              {t('quickLinks', language)}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#EDE5D8]/80 font-light">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors cursor-pointer">
                  {t('home', language)}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('destinations')} className="hover:text-white transition-colors cursor-pointer">
                  {t('destinations', language)}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('tours')} className="hover:text-white transition-colors cursor-pointer">
                  {t('tours', language)}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gallery')} className="hover:text-white transition-colors cursor-pointer">
                  {t('gallery', language)}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors cursor-pointer">
                  {t('about', language)}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors cursor-pointer">
                  {t('contact', language)}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#C6A66B] font-semibold">
              {t('footerAssistance', language)}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#EDE5D8]/80 font-light">
              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <a
                  href={formatWhatsAppLink(
                    contact.whatsappNumber || '+6285739256845',
                    language === 'id' ? `Halo ${brandName} TOUR BALI!` : `Hello ${brandName} TOUR BALI!`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-medium transition-colors"
                >
                  {contact.whatsappNumber || '+6285739256845'}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500" />
                <a href={`mailto:${contact.email || 'info@kadekbali.com'}`} className="hover:text-white transition-colors">
                  {contact.email || 'info@kadekbali.com'}
                </a>
              </p>
              <p className="text-xs text-[#EDE5D8]/60 pt-1">
                {language === 'id'
                  ? 'Layanan Online 7 Hari Seminggu (07:00 – 22:00 WITA). Penjemputan langsung di tempat Anda menginap.'
                  : 'Online Service 7 Days a Week (07:00 AM – 10:00 PM WITA). Doorstep pickup wherever you stay in Bali.'}
              </p>

              {/* Social Media Links */}
              <div className="pt-2">
                <span className="text-[11px] uppercase tracking-wider text-[#C6A66B] font-semibold block mb-2">
                  {language === 'id' ? 'Ikuti Media Sosial Kami' : 'Connect With Us'}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {instagramUrl && (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#E1306C] text-[#FAF9F6] text-xs transition-colors"
                      title="Instagram KADEK BALI"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span className="font-light">{contact.instagram || 'Instagram'}</span>
                    </a>
                  )}

                  {facebookUrl && (
                    <a
                      href={facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#1877F2] text-[#FAF9F6] text-xs transition-colors"
                      title="Facebook KADEK BALI"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                      <span className="font-light">{contact.facebook || 'Facebook'}</span>
                    </a>
                  )}

                  {tiktokUrl && (
                    <a
                      href={tiktokUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-black text-[#FAF9F6] text-xs transition-colors"
                      title="TikTok KADEK BALI"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span className="font-light">TikTok: {contact.tiktok || '@kadekbalitour'}</span>
                    </a>
                  )}

                  {youtubeUrl && (
                    <a
                      href={youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#FF0000] text-[#FAF9F6] text-xs transition-colors"
                      title="YouTube KADEK BALI"
                    >
                      <Youtube className="w-3.5 h-3.5" />
                      <span className="font-light">YouTube</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={() => handleNav('admin')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-xs text-[#FAF9F6] hover:bg-[#1E6FD9] hover:text-white transition-all cursor-pointer font-medium"
              >
                <Shield className="w-3.5 h-3.5 text-[#1E6FD9] group-hover:text-white" />
                <span>
                  {auth.isAuthenticated
                    ? language === 'id'
                      ? 'Dashboard Admin (Kelola Website)'
                      : 'Admin Dashboard (Manage Website)'
                    : language === 'id'
                    ? 'Login Pengelola Website (Admin)'
                    : 'Owner Portal Login'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#363a33] flex flex-col sm:flex-row items-center justify-between text-xs text-[#EDE5D8]/50 gap-4">
          <p>
            © 2026 KADEK BALI · TOUR BALI. {language === 'id' ? 'Hak cipta dilindungi undang-undang.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-medium">KADEK BALI TOUR</span>
            <span>·</span>
            <span>Bali, Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
