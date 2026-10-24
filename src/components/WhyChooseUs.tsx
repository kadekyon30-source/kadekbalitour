import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Compass, Car, PhoneCall } from 'lucide-react';
import { t, getLocalizedAdvantage } from '../utils/translations';

export const WhyChooseUs: React.FC = () => {
  const { data, language } = useApp();
  const advantages = data.about?.advantages || [];

  const icons = [Compass, Shield, Car, PhoneCall];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6] border-y border-[#EDE5D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#526B50] font-semibold block mb-2">
            {t('whyKicker', language)}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#252923] font-bold tracking-tight">
            {t('whyTitle', language)}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#252923]/70 font-light">
            {t('whySubtitle', language)}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((rawAdv, idx) => {
            const adv = getLocalizedAdvantage(rawAdv, language);
            const Icon = icons[idx % icons.length];
            const numStr = `0${idx + 1}.`;
            return (
              <div
                key={adv.id || idx}
                className="bg-white rounded-2xl p-7 border border-[#EDE5D8] flex flex-col justify-between hover:border-[#526B50]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-10 h-10 rounded-full bg-[#EDE5D8]/60 text-[#526B50] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-mono font-medium text-stone-400">
                      {numStr}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-[#252923] mb-2.5">
                    {adv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#252923]/70 leading-relaxed font-light">
                    {adv.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

