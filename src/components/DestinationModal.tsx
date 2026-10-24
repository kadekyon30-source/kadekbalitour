import React from 'react';
import { Destination } from '../types';
import { useApp } from '../context/AppContext';
import { X, MapPin, Check, MessageCircle } from 'lucide-react';
import { buildDestinationInquiryMessage } from '../utils/bookingUtils';
import { t, getLocalizedDestination } from '../utils/translations';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({ destination, onClose }) => {
  const { data, openWhatsApp, language } = useApp();

  if (!destination) return null;

  const brandName = data.settings?.siteName || 'KADEK BALI';
  const localized = getLocalizedDestination(destination, language);

  const handleInquire = () => {
    const msg = buildDestinationInquiryMessage(brandName, localized.name, language);
    openWhatsApp(msg);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#252923]/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative bg-[#FAF9F6] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-[#EDE5D8] max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-dest-title"
      >
        {/* Header photo */}
        <div className="relative h-64 sm:h-72 w-full bg-[#EDE5D8] shrink-0">
          <img
            src={localized.imageUrl}
            alt={localized.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#252923]/80 via-[#252923]/20 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF9F6]/80 hover:bg-[#FAF9F6] text-[#252923] transition-colors shadow-sm focus:outline-none"
            aria-label={t('closeBtn', language)}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Destination Title on photo */}
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <div className="flex items-center gap-1.5 text-xs text-[#EDE5D8] font-medium mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span>{localized.location}</span>
            </div>
            <h2 id="modal-dest-title" className="font-serif text-2xl sm:text-3xl font-bold">
              {localized.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <h3 className="text-xs uppercase tracking-wider font-semibold text-[#526B50] mb-2">
              {t('aboutDestTitle', language)}
            </h3>
            <p className="text-sm sm:text-base text-[#252923]/85 leading-relaxed font-light">
              {localized.fullDescription || localized.shortDescription}
            </p>
          </div>

          {localized.highlights && localized.highlights.length > 0 && (
            <div>
              <h3 className="text-xs uppercase tracking-wider font-semibold text-[#526B50] mb-3">
                {t('highlightsTitle', language)}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {localized.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#252923]/80">
                    <span className="w-4 h-4 rounded-full bg-[#526B50]/15 text-[#526B50] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="pt-4 border-t border-[#EDE5D8] flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium border border-[#EDE5D8] text-[#252923] hover:bg-[#EDE5D8]/50 transition-colors cursor-pointer"
            >
              {t('closeBtn', language)}
            </button>

            <button
              onClick={handleInquire}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium bg-[#526B50] text-[#FAF9F6] hover:bg-[#435741] transition-colors shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>
                {language === 'id'
                  ? `Tanya Tur ke ${localized.name} via WhatsApp`
                  : `Inquire ${localized.name} on WhatsApp`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
