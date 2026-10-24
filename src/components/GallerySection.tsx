import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GalleryImage } from '../types';
import { X, ArrowRight, Eye } from 'lucide-react';
import { t, translateCategory, getLocalizedGallery } from '../utils/translations';

interface GallerySectionProps {
  isHomeView?: boolean;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ isHomeView = false }) => {
  const { data, setActivePage, language } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhoto, setActivePhoto] = useState<GalleryImage | null>(null);

  const galleryItems = (data.gallery || []).sort((a, b) => (a.order || 0) - (b.order || 0));

  // Extract raw categories (e.g. Temples, Nature, Beaches, Waterfalls, Culture)
  const rawCategories = ['All', ...Array.from(new Set(galleryItems.map((g) => g.category || 'General')))];

  const displayedItems = isHomeView
    ? galleryItems.filter((g) => g.showOnHome).slice(0, 6)
    : selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter((g) => g.category === selectedCategory);

  const currentModalPhoto = activePhoto ? getLocalizedGallery(activePhoto, language) : null;

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-[#526B50] font-semibold block mb-2">
              {t('galleryKicker', language)}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#252923] font-bold tracking-tight">
              {t('galleryTitle', language)}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#252923]/70 font-light">
              {t('gallerySubtitle', language)}
            </p>
          </div>

          {!isHomeView && (
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FAF9F6] border border-[#EDE5D8] rounded-full text-xs font-medium">
              {rawCategories.map((rawCat) => {
                const label = translateCategory(rawCat, language);
                return (
                  <button
                    key={rawCat}
                    onClick={() => setSelectedCategory(rawCat)}
                    className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                      selectedCategory === rawCat
                        ? 'bg-[#526B50] text-[#FAF9F6]'
                        : 'text-[#252923]/70 hover:text-[#252923]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}

          {isHomeView && (
            <button
              onClick={() => {
                setActivePage('gallery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#526B50] hover:text-[#435741] transition-colors group cursor-pointer"
            >
              <span>{t('viewFullGalleryBtn', language)}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((rawItem) => {
            const item = getLocalizedGallery(rawItem, language);
            return (
              <div
                key={item.id}
                onClick={() => setActivePhoto(rawItem)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#EDE5D8] border border-[#EDE5D8] cursor-pointer shadow-sm hover:shadow-lg transition-all"
              >
                <img
                  src={item.url}
                  alt={item.caption || 'Bali travel photograph'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#252923]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] uppercase tracking-wider text-[#EDE5D8] font-medium">
                    {item.category}
                  </span>
                  <p className="text-sm font-medium leading-snug">{item.caption}</p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-[#FAF9F6]/80 font-light">
                    <Eye className="w-3.5 h-3.5 text-[#C6A66B]" />
                    <span>{t('clickToExpand', language)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentModalPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#252923]/90 backdrop-blur-md animate-fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Close photo view"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={currentModalPhoto.url}
              alt={currentModalPhoto.caption}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain border border-stone-800"
            />

            <div className="mt-4 text-center text-white">
              <span className="text-xs uppercase tracking-wider text-[#C6A66B] block">
                {currentModalPhoto.category}
              </span>
              <p className="font-serif text-lg font-medium mt-1">{currentModalPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

