import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Compass, Check, ArrowRight } from 'lucide-react';
import { t } from '../utils/translations';

interface AboutSectionProps {
  isHomeView?: boolean;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ isHomeView = false }) => {
  const { data, setActivePage, language } = useApp();
  const about = data.about || {};
  const settings = data.settings || {};

  const brandName = 'KADEK BALI';
  
  // Localized fallbacks if default English strings are present
  const isDefaultHeading = !about.heading || about.heading === 'Your Journey, Our Passion';
  const heading = language === 'id' && isDefaultHeading ? t('aboutHeading', 'id') : (about.heading || t('aboutHeading', 'en'));

  const isDefaultDesc =
    !about.description ||
    about.description.includes('We help travelers discover the beauty of Bali through memorable journeys');
  const description =
    language === 'id' && isDefaultDesc
      ? t('aboutDescription', 'id')
      : about.description || t('aboutDescription', 'en');

  const mission =
    language === 'id' &&
    (!about.mission || about.mission.includes('relaxing, safe') || about.mission.includes('provide thoughtful'))
      ? 'Memberikan layanan perjalanan privat yang santai, aman, dan berkesan yang dipandu oleh tim profesional lokal dengan keramahan seperti keluarga sendiri.'
      : about.mission;

  const vision =
    language === 'id' &&
    (!about.vision || about.vision.includes('preferred boutique') || about.vision.includes('boutique travel companion'))
      ? 'Menjadi penyedia layanan tur privat dan transportasi liburan butik pilihan utama di Bali, yang terkenal dengan keramahan hangat, ketepatan waktu, dan pelayanan personal.'
      : about.vision;

  const photoUrl = about.mainPhotoUrl || '/src/assets/images/dest_ubud_rice_terraces_1792641959867.jpg';

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Photo */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] lg:aspect-[4/5] bg-[#EDE5D8] border border-[#EDE5D8]">
              <img
                src={photoUrl}
                alt="Balinese landscape and warm hospitality"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#252923]/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 text-[#FAF9F6] pointer-events-none">
                <span className="text-xs uppercase tracking-widest text-[#EDE5D8] font-medium block">
                  {brandName}
                </span>
                <p className="font-serif text-lg font-semibold text-white">
                  {language === 'id' ? 'Layanan Tur & Transportasi Privat Bali' : 'Boutique Bali Travel & Transport'}
                </p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center order-1 lg:order-2">
            <span className="text-xs uppercase tracking-widest text-[#526B50] font-semibold block mb-2">
              {t('aboutKicker', language)}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#252923] font-bold tracking-tight mb-6 text-balance">
              {heading}
            </h2>

            <p className="text-base sm:text-lg text-[#252923]/80 leading-relaxed font-light mb-8">
              {description}
            </p>

            {/* Mission & Vision cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="p-5 rounded-2xl bg-[#EDE5D8]/40 border border-[#EDE5D8]">
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[#526B50]">
                  <Compass className="w-4 h-4 text-[#C6A66B]" />
                  <span>{t('missionTitle', language)}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#252923]/75 leading-relaxed font-light">
                  {mission}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#EDE5D8]/40 border border-[#EDE5D8]">
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[#526B50]">
                  <Heart className="w-4 h-4 text-[#C6A66B]" />
                  <span>{t('visionTitle', language)}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#252923]/75 leading-relaxed font-light">
                  {vision}
                </p>
              </div>
            </div>

            {/* If home view, link to full page, else show advantages */}
            {isHomeView ? (
              <button
                onClick={() => {
                  setActivePage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#526B50] hover:text-[#435741] transition-colors group cursor-pointer self-start"
              >
                <span>{t('readMoreAboutBtn', language)}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <div className="space-y-3 pt-4 border-t border-[#EDE5D8]">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#526B50]">
                  {t('commitmentTitle', language)}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#252923]/80">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#526B50]" />
                    <span>{t('commitCleanCars', language)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#526B50]" />
                    <span>{t('commitEnglishGuides', language)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#526B50]" />
                    <span>{t('commitNoHiddenFees', language)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#526B50]" />
                    <span>{t('commitFastWhatsApp', language)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

