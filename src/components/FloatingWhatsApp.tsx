import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle } from 'lucide-react';
import { buildGeneralInquiryMessage } from '../utils/bookingUtils';
import { t } from '../utils/translations';

export const FloatingWhatsApp: React.FC = () => {
  const { data, openWhatsApp, language } = useApp();
  const brandName = 'KADEK BALI';
  const whatsappNum = data.contact?.whatsappNumber || '+6285739256845';

  const handleClick = () => {
    const msg = buildGeneralInquiryMessage(brandName, language);
    openWhatsApp(msg);
  };

  return (
    <aside
      aria-label={language === 'id' ? 'Bantuan Langsung WhatsApp' : 'Direct WhatsApp Assistance'}
      className="fixed bottom-6 right-6 z-40 flex items-center group"
    >
      <div className="hidden sm:flex items-center gap-1.5 mr-3 bg-white text-[#252923] text-xs font-semibold py-1.5 px-3.5 rounded-full shadow-lg border border-emerald-200 opacity-90 group-hover:opacity-100 transition-opacity duration-200">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>{t('floatingTooltip', language)} ({whatsappNum})</span>
      </div>

      <button
        onClick={handleClick}
        className="w-14 h-14 rounded-full bg-[#15803D] text-[#FAF9F6] flex items-center justify-center shadow-xl hover:bg-[#166534] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 cursor-pointer"
        aria-label={language === 'id' ? 'Chat langsung di WhatsApp' : 'Chat directly on WhatsApp'}
      >
        <MessageCircle className="w-7 h-7" />
        <span className="sr-only">
          {language === 'id' ? 'Chat di WhatsApp' : 'Chat on WhatsApp'}
        </span>
      </button>
    </aside>
  );
};

