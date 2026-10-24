import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Destination } from '../types';
import { MapPin, ArrowRight, Search } from 'lucide-react';
import { DestinationModal } from './DestinationModal';
import { t, getLocalizedDestination } from '../utils/translations';

interface DestinationsSectionProps {
  isHomeView?: boolean;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({ isHomeView = false }) => {
  const { data, selectedDestination, setSelectedDestination, setActivePage, language } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const allDestinations = (data.destinations || [])
    .filter((d) => d.published)
    .map((d) => getLocalizedDestination(d, language));

  const displayedDestinations = isHomeView
    ? allDestinations.slice(0, 6)
    : allDestinations.filter((d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#526B50] font-semibold block mb-2">
              {t('destKicker', language)}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#252923] font-bold tracking-tight">
              {t('destTitle', language)}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#252923]/70 font-light">
              {t('destSubtitle', language)}
            </p>
          </div>

          {!isHomeView && (
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('searchDestPlaceholder', language)}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white border border-[#EDE5D8] rounded-full focus:outline-none focus:border-[#526B50] transition-colors"
              />
            </div>
          )}

          {isHomeView && (
            <button
              onClick={() => {
                setActivePage('destinations');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#526B50] hover:text-[#435741] transition-colors group cursor-pointer"
            >
              <span>{t('viewAllDest', language)}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* Grid of Cards */}
        {displayedDestinations.length === 0 ? (
          <div className="text-center py-12 text-[#252923]/60 text-sm">
            {t('noDestMatch', language)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedDestinations.map((dest) => (
              <article
                key={dest.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#EDE5D8] hover:border-[#526B50]/40 transition-all duration-300 hover:shadow-lg flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-[#EDE5D8] overflow-hidden">
                  <img
                    src={dest.imageUrl}
                    alt={dest.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      if (target.parentElement) {
                        target.parentElement.classList.add('bg-[#EDE5D8]');
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#252923]/60 via-transparent to-transparent opacity-80" />

                  {/* Location tag */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-[#FAF9F6] font-medium drop-shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-[#C6A66B]" />
                    <span>{dest.location}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#252923] group-hover:text-[#526B50] transition-colors mb-2">
                      {dest.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#252923]/75 line-clamp-3 leading-relaxed font-light mb-4">
                      {dest.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#EDE5D8]/70 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedDestination(dest)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#526B50] hover:text-[#435741] transition-colors cursor-pointer"
                    >
                      <span>{t('exploreDestBtn', language)}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
      />
    </section>
  );
};
