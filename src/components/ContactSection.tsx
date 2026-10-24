import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { submitInquiry } from '../services/dataService';
import { validateContactForm, formatWhatsAppLink, buildSocialUrl } from '../utils/bookingUtils';
import { MessageCircle, Mail, MapPin, Clock, Instagram, Facebook, Youtube, Share2, ExternalLink, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { t, getLocalizedDestination } from '../utils/translations';

export const ContactSection: React.FC = () => {
  const { data, showToast, language } = useApp();
  const contact = data.contact || {};
  const destinations = data.destinations || [];
  const brandName = data.settings?.siteName || 'KADEK BALI';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    travelDate: '',
    travelersCount: 2,
    preferredDestination: 'Ubud',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = validateContactForm({
      fullName: formData.fullName,
      email: formData.email,
      travelDate: formData.travelDate,
      travelersCount: formData.travelersCount,
      preferredDestination: formData.preferredDestination,
      message: formData.message,
    }, language);

    if (!validation.valid) {
      setErrors(validation.errors);
      showToast(
        language === 'id'
          ? 'Mohon periksa kolom yang ditandai merah.'
          : 'Please correct the highlighted fields in the inquiry form.',
        'error'
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await submitInquiry(formData);
      if (res.success) {
        setSubmittedInquiry(res.inquiry || { ...formData, id: 'temp' });
        showToast(
          language === 'id' ? 'Pertanyaan Anda berhasil dikirim!' : res.message,
          'success'
        );
      } else {
        showToast(
          language === 'id'
            ? 'Gagal mengirim pertanyaan. Silakan coba lagi atau hubungi via WhatsApp.'
            : 'Failed to submit inquiry. Please try again or chat directly on WhatsApp.',
          'error'
        );
      }
    } catch (err) {
      showToast(language === 'id' ? 'Terjadi kesalahan saat mengirim.' : 'Error sending inquiry.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenWhatsAppCopy = () => {
    const customMsg =
      language === 'id'
        ? `Halo ${brandName}, nama saya ${formData.fullName}. Saya tertarik berwisata ke ${formData.preferredDestination} pada ${formData.travelDate || 'waktu mendatang'} untuk ${formData.travelersCount} orang. Pesan saya: "${formData.message}"`
        : `Hello ${brandName}, my name is ${formData.fullName}. I am interested in visiting ${formData.preferredDestination} on ${formData.travelDate || 'an upcoming date'} for ${formData.travelersCount} traveler(s). Message: "${formData.message}"`;
    const url = formatWhatsAppLink(contact.whatsappNumber || '+6281234567890', customMsg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest text-[#526B50] font-semibold block mb-2">
            {t('contactKicker', language)}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#252923] font-bold tracking-tight">
            {t('contactTitle', language)}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#252923]/70 font-light">
            {t('contactSubtitle', language)}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact details & cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#EDE5D8]/40 rounded-3xl p-6 sm:p-8 border border-[#EDE5D8]">
              <h3 className="font-serif text-xl font-bold text-[#252923] mb-6">
                {t('directAssistance', language)}
              </h3>

              <div className="space-y-5 text-xs sm:text-sm text-[#252923]/80">
                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <span className="w-9 h-9 rounded-full bg-[#526B50] text-[#FAF9F6] flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#526B50] block mb-0.5">
                      {t('waBookingTitle', language)}
                    </span>
                    <a
                      href={formatWhatsAppLink(
                        contact.whatsappNumber || '+6285739256845',
                        language === 'id' ? `Halo ${brandName} TOUR BALI!` : `Hello ${brandName} TOUR BALI!`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-emerald-800 hover:text-emerald-600 transition-colors"
                    >
                      {contact.whatsappNumber || '+6285739256845'}
                    </a>
                    <span className="text-xs text-stone-500 block">
                      {t('waBookingSubtitle', language)}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <span className="w-9 h-9 rounded-full bg-[#FAF9F6] text-[#526B50] border border-[#EDE5D8] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#526B50] block mb-0.5">
                      {t('emailTitle', language)}
                    </span>
                    <a
                      href={`mailto:${contact.email || 'info@kadekbali.com'}`}
                      className="font-medium hover:text-[#526B50] transition-colors"
                    >
                      {contact.email || 'info@kadekbali.com'}
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5">
                  <span className="w-9 h-9 rounded-full bg-[#FAF9F6] text-[#526B50] border border-[#EDE5D8] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#526B50] block mb-0.5">
                      {t('operatingHoursTitle', language)}
                    </span>
                    <p className="font-light">
                      {language === 'id'
                        ? 'Senin – Minggu: 07:00 – 22:00 WITA'
                        : contact.operatingHours || 'Mon – Sun: 07:00 AM – 10:00 PM (GMT+8)'}
                    </p>
                  </div>
                </div>

                {/* Island-wide Mobile Service - No Physical Office */}
                <div className="flex items-start gap-3.5 bg-white/70 p-3.5 rounded-2xl border border-[#EDE5D8]">
                  <span className="w-9 h-9 rounded-full bg-[#15803D]/10 text-[#15803D] border border-[#15803D]/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#15803D] block mb-0.5">
                      {language === 'id' ? 'Layanan Seluruh Bali · Antar-Jemput Hotel' : 'Island-wide Service · Hotel & Airport Pickup'}
                    </span>
                    <p className="text-xs text-stone-600 font-light leading-relaxed">
                      {language === 'id'
                        ? 'Kami melayani penjemputan langsung di tempat Anda menginap (seluruh hotel, villa, resort, dan Bandara Internasional Ngurah Rai Bali). Tidak perlu repot datang ke kantor, kami yang datang menjemput Anda tepat waktu!'
                        : 'We provide direct doorstep pickup at your hotel, villa, resort, or Bali International Airport (DPS). No need to visit a physical office—we arrive promptly wherever you stay!'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="mt-8 pt-6 border-t border-[#EDE5D8] space-y-2.5">
                <span className="text-xs font-semibold text-[#252923]/70 block">
                  {t('socialTitle', language)}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {contact.instagram && (
                    <a
                      href={buildSocialUrl('instagram', contact.instagram)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#EDE5D8] text-xs font-medium text-[#252923] hover:border-[#E1306C] hover:text-[#E1306C] transition-colors shadow-xs"
                      title="Kunjungi Instagram KADEK BALI"
                    >
                      <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                      <span>{contact.instagram}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>
                  )}

                  {contact.facebook && (
                    <a
                      href={buildSocialUrl('facebook', contact.facebook)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#EDE5D8] text-xs font-medium text-[#252923] hover:border-[#1877F2] hover:text-[#1877F2] transition-colors shadow-xs"
                      title="Kunjungi Facebook KADEK BALI"
                    >
                      <Facebook className="w-3.5 h-3.5 text-[#1877F2]" />
                      <span>{contact.facebook}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>
                  )}

                  {contact.tiktok && (
                    <a
                      href={buildSocialUrl('tiktok', contact.tiktok)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#EDE5D8] text-xs font-medium text-[#252923] hover:border-black hover:text-black transition-colors shadow-xs"
                      title="Kunjungi TikTok KADEK BALI"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>TikTok: {contact.tiktok}</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>
                  )}

                  {contact.youtube && (
                    <a
                      href={buildSocialUrl('youtube', contact.youtube)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#EDE5D8] text-xs font-medium text-[#252923] hover:border-[#FF0000] hover:text-[#FF0000] transition-colors shadow-xs"
                      title="Kunjungi YouTube KADEK BALI"
                    >
                      <Youtube className="w-3.5 h-3.5 text-[#FF0000]" />
                      <span>YouTube</span>
                      <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Island-wide service map */}
            <div className="rounded-3xl overflow-hidden border border-[#EDE5D8] shadow-xs bg-white p-4">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-[#252923] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#15803D]" />
                  <span>{language === 'id' ? 'Cakupan Area Layanan Seluruh Bali' : 'Bali-Wide Service Coverage'}</span>
                </span>
                <span className="text-[10px] font-semibold text-[#15803D] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  {language === 'id' ? 'Gratis Penjemputan Hotel' : 'Hotel Pickup Included'}
                </span>
              </div>
              <div className="rounded-2xl overflow-hidden h-44 bg-[#EDE5D8]">
                <iframe
                  title="Bali Map"
                  src="https://maps.google.com/maps?q=Bali%2C+Indonesia&t=&z=10&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="text-[11px] text-stone-500 mt-2 font-light text-center">
                {language === 'id'
                  ? 'Kuta · Seminyak · Canggu · Ubud · Sanur · Nusa Dua · Uluwatu · Kintamani · Bedugul'
                  : 'Kuta · Seminyak · Canggu · Ubud · Sanur · Nusa Dua · Uluwatu · Kintamani · Bedugul'}
              </p>
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EDE5D8] shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-[#252923] mb-2">
                {t('sendInquiryTitle', language)}
              </h3>
              <p className="text-xs sm:text-sm text-[#252923]/70 font-light mb-8">
                {t('sendInquirySubtitle', language)}
              </p>

              {submittedInquiry ? (
                <div className="p-6 rounded-2xl bg-[#EDE5D8]/40 border border-[#526B50]/30 space-y-4">
                  <div className="flex items-center gap-3 text-[#526B50]">
                    <CheckCircle2 className="w-6 h-6" />
                    <h4 className="font-serif text-lg font-bold">
                      {t('inquirySuccessTitle', language)}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-[#252923]/80 leading-relaxed font-light">
                    {language === 'id' ? (
                      <>
                        Terima kasih, <strong>{submittedInquiry.fullName}</strong>. Pertanyaan Anda telah tersimpan di sistem antrean reservasi kami.
                      </>
                    ) : (
                      <>
                        Thank you, <strong>{submittedInquiry.fullName}</strong>. Your inquiry has been saved to our reservation queue.
                      </>
                    )}
                  </p>
                  <p className="text-xs text-[#252923]/70 font-light">
                    {t('inquiryWhatsAppPrompt', language)}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={handleOpenWhatsAppCopy}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[#526B50] text-[#FAF9F6] hover:bg-[#435741] transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{t('continueWhatsAppBtn', language)}</span>
                    </button>
                    <button
                      onClick={() => {
                        setSubmittedInquiry(null);
                        setFormData({
                          fullName: '',
                          email: '',
                          travelDate: '',
                          travelersCount: 2,
                          preferredDestination: 'Ubud',
                          message: '',
                        });
                      }}
                      className="px-4 py-2.5 rounded-full text-xs font-medium border border-[#EDE5D8] text-[#252923] hover:bg-stone-50 cursor-pointer"
                    >
                      {t('sendAnotherBtn', language)}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-medium text-[#252923] mb-1.5">
                        {t('fullNameLabel', language)}
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder={language === 'id' ? 'misal: Budi Santoso' : 'e.g. John Miller'}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border ${
                          errors.fullName ? 'border-rose-500' : 'border-[#EDE5D8]'
                        } focus:outline-none focus:border-[#526B50] transition-colors`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-[#252923] mb-1.5">
                        {t('emailLabel', language)}
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={language === 'id' ? 'budi@example.com' : 'john@example.com'}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border ${
                          errors.email ? 'border-rose-500' : 'border-[#EDE5D8]'
                        } focus:outline-none focus:border-[#526B50] transition-colors`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {/* Travel Date */}
                    <div>
                      <label htmlFor="travelDate" className="block text-xs font-medium text-[#252923] mb-1.5">
                        {t('travelDateLabel', language)}
                      </label>
                      <input
                        id="travelDate"
                        type="date"
                        value={formData.travelDate}
                        onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8] focus:outline-none focus:border-[#526B50] transition-colors"
                      />
                    </div>

                    {/* Number of Travelers */}
                    <div>
                      <label htmlFor="travelersCount" className="block text-xs font-medium text-[#252923] mb-1.5">
                        {t('travelersCountLabel', language)}
                      </label>
                      <input
                        id="travelersCount"
                        type="number"
                        min="1"
                        max="20"
                        value={formData.travelersCount}
                        onChange={(e) => setFormData({ ...formData, travelersCount: parseInt(e.target.value, 10) || 1 })}
                        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8] focus:outline-none focus:border-[#526B50] transition-colors"
                      />
                    </div>

                    {/* Preferred Destination */}
                    <div>
                      <label htmlFor="destination" className="block text-xs font-medium text-[#252923] mb-1.5">
                        {t('preferredAreaLabel', language)}
                      </label>
                      <select
                        id="destination"
                        value={formData.preferredDestination}
                        onChange={(e) => setFormData({ ...formData, preferredDestination: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border border-[#EDE5D8] focus:outline-none focus:border-[#526B50] transition-colors"
                      >
                        <option value={t('customAreaOption', language)}>
                          {t('customAreaOption', language)}
                        </option>
                        {destinations.map((rawD) => {
                          const d = getLocalizedDestination(rawD, language);
                          return (
                            <option key={d.id} value={d.name}>
                              {d.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-[#252923] mb-1.5">
                      {t('messageLabel', language)}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t('messagePlaceholder', language)}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-[#FAF9F6] border ${
                        errors.message ? 'border-rose-500' : 'border-[#EDE5D8]'
                      } focus:outline-none focus:border-[#526B50] transition-colors`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-[#526B50] text-[#FAF9F6] hover:bg-[#435741] transition-all shadow-md cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{submitting ? t('submittingBtn', language) : t('submitInquiryBtn', language)}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

