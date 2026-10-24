import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import { formatPrice, buildTourInquiryMessage } from '../utils/bookingUtils';
import { TourModal } from './TourModal';
import { TourPackage } from '../types';
import { t, getLocalizedTour } from '../utils/translations';

interface ToursSectionProps {
  isHomeView?: boolean;
}

export const ToursSection: React.FC<ToursSectionProps> = ({ isHomeView = false }) => {
  const { data, selectedTour, setSelectedTour, setActivePage, openWhatsApp, language } = useApp();
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const brandName = data.settings?.siteName || 'VERLASKA TRAVEL';
  const allTours = (data.tours || []).filter((t) => t.published);

  const displayedTours = isHomeView
    ? allTours.slice(0, 4)
    : filter === 'featured'
    ? allTours.filter((t) => t.featured)
    : allTours;

  const handleQuickWhatsApp = (e: React.MouseEvent, rawTour: TourPackage) => {
    e.stopPropagation();
    const tour = getLocalizedTour(rawTour, language);
    const msg = buildTourInquiryMessage(brandName, tour.name, language);
    openWhatsApp(msg);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#EDE5D8]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#526B50] font-semibold block mb-2">
              {t('toursKicker', language)}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#252923] font-bold tracking-tight">
              {t('toursTitle', language)}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#252923]/70 font-light">
              {t('toursSubtitle', language)}
            </p>
          </div>

          {!isHomeView && (
            <div className="flex items-center gap-1.5 p-1 bg-[#FAF9F6] border border-[#EDE5D8] rounded-full text-xs font-medium">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
                  filter === 'all'
                    ? 'bg-[#526B50] text-[#FAF9F6]'
                    : 'text-[#252923]/70 hover:text-[#252923]'
                }`}
              >
                {t('allToursTab', language)}
              </button>
              <button
                onClick={() => setFilter('featured')}
                className={`px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
                  filter === 'featured'
                    ? 'bg-[#526B50] text-[#FAF9F6]'
                    : 'text-[#252923]/70 hover:text-[#252923]'
                }`}
              >
                {t('featuredToursTab', language)}
              </button>
            </div>
          )}

          {isHomeView && (
            <button
              onClick={() => {
                setActivePage('tours');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#526B50] hover:text-[#435741] transition-colors group cursor-pointer"
            >
              <span>{t('viewAllToursBtn', language)}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedTours.map((rawTour) => {
            const tour = getLocalizedTour(rawTour, language);
            return (
              <article
                key={tour.id}
                onClick={() => setSelectedTour(tour)}
                className="group bg-[#FAF9F6] rounded-3xl overflow-hidden border border-[#EDE5D8] hover:border-[#526B50]/50 transition-all duration-300 hover:shadow-xl flex flex-col cursor-pointer"
              >
                {/* Image Banner */}
                <div className="relative aspect-[16/9] sm:aspect-[2/1] bg-[#EDE5D8] overflow-hidden">
                  <img
                    src={tour.mainImage}
                    alt={tour.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#252923]/75 via-transparent to-transparent" />

                  {/* Duration & Status */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 text-xs text-white bg-[#252923]/60 backdrop-blur-sm px-3 py-1 rounded-full font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#C6A66B]" />
                    <span>{tour.duration}</span>
                  </div>

                  {tour.featured && (
                    <div className="absolute top-4 right-4 text-[11px] font-semibold uppercase tracking-wider text-[#FAF9F6] bg-[#526B50] px-3 py-1 rounded-full shadow-sm">
                      {t('featuredBadge', language)}
                    </div>
                  )}

                  {/* Price Display */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-[#EDE5D8] block">
                        {t('startingRate', language)}
                      </span>
                      <span className="font-serif text-xl sm:text-2xl font-bold">
                        {formatPrice(tour.price, tour.currency, tour.priceType, language)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#252923] group-hover:text-[#526B50] transition-colors mb-3 leading-snug">
                      {tour.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#252923]/75 font-light leading-relaxed mb-4 line-clamp-2">
                      {tour.description}
                    </p>

                    {/* Destinations included */}
                    {tour.destinationsIncluded && tour.destinationsIncluded.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mb-5 text-xs text-[#252923]/70">
                        <MapPin className="w-3.5 h-3.5 text-[#526B50] shrink-0" />
                        {tour.destinationsIncluded.map((d, i) => (
                          <span key={i}>
                            {d}
                            {i < (tour.destinationsIncluded?.length || 0) - 1 && (
                              <span className="ml-1.5 mr-0.5 text-stone-300">·</span>
                            )}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-[#EDE5D8] flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedTour(tour)}
                      className="text-xs font-semibold text-[#526B50] group-hover:text-[#435741] flex items-center gap-1 cursor-pointer"
                    >
                      <span>{t('viewDetailsBtn', language)}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={(e) => handleQuickWhatsApp(e, rawTour)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-[#526B50] text-[#FAF9F6] hover:bg-[#435741] transition-colors shadow-sm cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{t('bookWhatsAppBtn', language)}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Tour Detail Modal */}
      <TourModal tour={selectedTour} onClose={() => setSelectedTour(null)} />
    </section>
  );
};

