import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, MessageCircle, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { buildGeneralInquiryMessage } from '../utils/bookingUtils';
import { t } from '../utils/translations';
import { BrandLogo } from './BrandLogo';

export const Hero: React.FC = () => {
  const { data, setActivePage, openWhatsApp, language } = useApp();
  const settings = data.settings || {};
  const brandName = 'KADEK BALI';

  const heading =
    language === 'id'
      ? t('heroHeading', language)
      : settings.heroHeading || t('heroHeading', language);

  const subheading =
    language === 'id'
      ? t('heroSubheading', language)
      : settings.heroSubheading || t('heroSubheading', language);

  const heroImage = settings.heroImageUrl || '/src/assets/images/hero_bali_landscape_1792641960133.jpg';

  const handleWhatsApp = () => {
    const msg = buildGeneralInquiryMessage(brandName, language);
    openWhatsApp(msg);
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] pt-6 pb-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Attractive Brand Badge: KADEK (Blue) BALI (Green) TOUR BALI */}
            <div className="mb-5 inline-block">
              <BrandLogo size="md" subtitle="TOUR BALI · PRIVATE TRAVEL & CHARTER" />
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#526B50] mb-3">
              <MapPin className="w-4 h-4 text-[#C6A66B]" />
              <span>{t('heroKicker', language)}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#252923] font-bold leading-[1.15] tracking-tight mb-5 text-balance">
              {language === 'id' ? (
                <>
                  Jelajahi Surga Bali Bersama{' '}
                  <span className="text-[#1E6FD9] font-black">KADEK</span>{' '}
                  <span className="text-[#15803D] font-black">BALI</span>
                </>
              ) : (
                <>
                  Discover the Beauty of Bali with{' '}
                  <span className="text-[#1E6FD9] font-black">KADEK</span>{' '}
                  <span className="text-[#15803D] font-black">BALI</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-[#252923]/80 leading-relaxed mb-8 max-w-2xl font-light">
              {language === 'id'
                ? 'Jelajahi tempat-tempat memukau di Bali, nikmati kehangatan budaya lokal, dan ciptakan kenangan liburan tak terlupakan dengan layanan tur privat dan sewa mobil terpercaya.'
                : 'Explore breathtaking destinations, immerse yourself in authentic culture, and create unforgettable memories with our boutique private tours and reliable holiday transport.'}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={() => setActivePage('tours')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold bg-[#15803D] text-[#FAF9F6] hover:bg-[#166534] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer text-center"
              >
                <span>{t('exploreToursBtn', language)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold bg-white text-[#252923] hover:bg-[#EDE5D8]/60 transition-all border border-[#1E6FD9]/30 hover:border-[#1E6FD9] shadow-xs cursor-pointer text-center"
              >
                <MessageCircle className="w-4 h-4 text-[#15803D] shrink-0" />
                <span className="truncate">{t('chatWhatsAppBtn', language)} ({data.contact?.whatsappNumber || '+6285739256845'})</span>
              </button>
            </div>

            {/* Trust markers bar */}
            <div className="pt-6 border-t border-[#EDE5D8] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#252923]/75 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#526B50] shrink-0" />
                <span>{t('trustPrivate', language)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C6A66B] shrink-0" />
                <span>{t('trustCustom', language)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#526B50] shrink-0" />
                <span>{t('trustSupport', language)}</span>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-[4/5] bg-[#EDE5D8] border border-[#EDE5D8]">
              <img
                src={heroImage}
                alt={t('heroPhotoTitle', language)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  if (target.parentElement) {
                    target.parentElement.classList.add('bg-gradient-to-br', 'from-[#EDE5D8]', 'to-[#526B50]/20');
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#252923]/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 text-[#FAF9F6] pointer-events-none">
                <span className="text-xs uppercase tracking-widest text-[#EDE5D8] font-medium block">
                  {t('heroPhotoSubtitle', language)}
                </span>
                <p className="font-serif text-lg font-semibold text-white drop-shadow-sm">
                  {t('heroPhotoTitle', language)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
