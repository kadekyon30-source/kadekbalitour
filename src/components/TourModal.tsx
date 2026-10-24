import React from 'react';
import { TourPackage } from '../types';
import { useApp } from '../context/AppContext';
import { X, Clock, MapPin, CheckCircle, XCircle, Calendar, MessageCircle } from 'lucide-react';
import { formatPrice, buildTourInquiryMessage } from '../utils/bookingUtils';
import { t, getLocalizedTour } from '../utils/translations';

interface TourModalProps {
  tour: TourPackage | null;
  onClose: () => void;
}

export const TourModal: React.FC<TourModalProps> = ({ tour, onClose }) => {
  const { data, openWhatsApp, language } = useApp();

  if (!tour) return null;

  const brandName = data.settings?.siteName || 'KADEK BALI';
  const localized = getLocalizedTour(tour, language);

  const handleBookWhatsApp = () => {
    const msg = buildTourInquiryMessage(brandName, localized.name, undefined, undefined, language);
    openWhatsApp(msg);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#252923]/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative bg-[#FAF9F6] w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-[#EDE5D8] max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-tour-title"
      >
        {/* Header photo & badge */}
        <div className="relative h-64 sm:h-80 w-full bg-[#EDE5D8] shrink-0">
          <img
            src={localized.mainImage}
            alt={localized.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#252923]/85 via-[#252923]/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF9F6]/80 hover:bg-[#FAF9F6] text-[#252923] transition-colors shadow-sm focus:outline-none"
            aria-label={t('closeBtn', language)}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-5 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#EDE5D8] font-medium mb-1.5">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#C6A66B]" />
                {localized.duration}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#C6A66B]" />
                {localized.availableDates || (language === 'id' ? 'Tersedia Setiap Hari' : 'Daily Available')}
              </span>
            </div>
            <h2 id="modal-tour-title" className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
              {localized.name}
            </h2>
          </div>
        </div>

        {/* Scrollable details */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Overview */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#526B50] mb-2">
              {t('packageOverview', language)}
            </h3>
            <p className="text-sm sm:text-base text-[#252923]/85 leading-relaxed font-light">
              {localized.description}
            </p>
          </div>

          {/* Price display banner */}
          <div className="p-4 rounded-2xl bg-[#EDE5D8]/60 border border-[#EDE5D8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-[#252923]/60 uppercase tracking-wider font-medium block">
                {t('tourRate', language)}
              </span>
              <span className="font-serif text-2xl font-bold text-[#252923]">
                {formatPrice(localized.price, localized.currency, localized.priceType, language)}
              </span>
              {localized.priceType !== 'contact' && (
                <span className="text-xs text-[#252923]/60 block sm:inline sm:ml-2">
                  {t('privateCarIncluded', language)}
                </span>
              )}
            </div>

            <div className="text-xs text-[#526B50] font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#526B50]" />
              <span>
                {localized.bookingStatus === 'available'
                  ? t('statusAvailable', language)
                  : localized.bookingStatus === 'limited'
                  ? t('statusLimited', language)
                  : t('statusOnRequest', language)}
              </span>
            </div>
          </div>

          {/* Destinations included */}
          {localized.destinationsIncluded && localized.destinationsIncluded.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#526B50] mb-2">
                {t('destVisited', language)}
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {localized.destinationsIncluded.map((dest, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-[#EDE5D8] text-[#252923] rounded-full font-medium"
                  >
                    <MapPin className="w-3 h-3 text-[#526B50]" />
                    {dest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Itinerary */}
          {localized.itinerary && localized.itinerary.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#526B50] mb-4">
                {t('sampleItinerary', language)}
              </h3>
              <div className="space-y-4 border-l-2 border-[#EDE5D8] ml-2 pl-4">
                {localized.itinerary.map((step, i) => (
                  <div key={i} className="relative">
                    <span className="absolute -left-[23px] top-1 w-3 h-3 rounded-full bg-[#526B50] border-2 border-[#FAF9F6]" />
                    <span className="text-xs font-semibold text-[#526B50] block mb-0.5">
                      {step.time} — {step.title}
                    </span>
                    <p className="text-xs sm:text-sm text-[#252923]/75 font-light">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#526B50] mb-3 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-[#526B50]" />
                <span>{t('whatIncluded', language)}</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#252923]/80">
                {localized.includedServices && localized.includedServices.length > 0 ? (
                  localized.includedServices.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#526B50] font-bold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-stone-400 italic">Confirmed upon booking</li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-rose-800 mb-3 flex items-center gap-1.5">
                <XCircle className="w-4 h-4 text-rose-700" />
                <span>{t('whatExcluded', language)}</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#252923]/80">
                {localized.excludedServices && localized.excludedServices.length > 0 ? (
                  localized.excludedServices.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-700 font-bold">✗</span>
                      <span>{exc}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-stone-400 italic">None specified</li>
                )}
              </ul>
            </div>
          </div>

          {/* Meeting Point */}
          {localized.meetingPoint && (
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-[#252923]/80">
              <span className="font-semibold text-[#252923] block mb-0.5">
                {t('pickupPoint', language)}
              </span>
              <span>{localized.meetingPoint}</span>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#EDE5D8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium border border-[#EDE5D8] text-[#252923] hover:bg-[#EDE5D8]/50 transition-colors cursor-pointer"
            >
              {t('backBtn', language)}
            </button>

            <button
              onClick={handleBookWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-[#526B50] text-[#FAF9F6] hover:bg-[#435741] transition-all shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t('bookWhatsAppBtn', language)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
