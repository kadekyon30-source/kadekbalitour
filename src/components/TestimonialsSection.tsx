import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, Quote, Info } from 'lucide-react';
import { t, getLocalizedTestimonial } from '../utils/translations';

export const TestimonialsSection: React.FC = () => {
  const { data, language } = useApp();
  const testimonials = (data.testimonials || []).filter((t) => t.published);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-[#EDE5D8]/20 border-t border-[#EDE5D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#526B50] font-semibold block mb-2">
            {t('reviewsKicker', language)}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#252923] font-bold tracking-tight">
            {t('reviewsTitle', language)}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#252923]/70 font-light">
            {t('reviewsSubtitle', language)}
          </p>

          {/* Sample label disclaimer */}
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-stone-100 border border-stone-200 text-stone-600 rounded-full text-xs">
            <Info className="w-3.5 h-3.5 text-[#526B50]" />
            <span>{t('sampleNotice', language)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((rawItem) => {
            const item = getLocalizedTestimonial(rawItem, language);
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-[#EDE5D8] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#C6A66B]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < (item.rating || 5) ? 'fill-[#C6A66B] text-[#C6A66B]' : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-[#EDE5D8]" />
                  </div>

                  <p className="text-sm text-[#252923]/80 font-light leading-relaxed mb-6 italic">
                    "{item.reviewText}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EDE5D8]/60 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EDE5D8] text-[#526B50] flex items-center justify-center font-serif font-bold text-sm">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#252923]">{item.name}</h4>
                    <span className="text-xs text-[#252923]/60 block">{item.roleOrOrigin}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

