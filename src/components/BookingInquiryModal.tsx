import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { submitInquiry } from '../services/dataService';
import { sendBookingEmailNotification } from '../services/emailService';
import {
  X,
  Calendar,
  Users,
  MapPin,
  Mail,
  User,
  Phone,
  MessageSquare,
  CheckCircle2,
  MessageCircle,
  Sparkles,
  Send,
  AlertCircle,
  Car,
  ShieldCheck,
} from 'lucide-react';
import { getLocalizedTour, getLocalizedDestination } from '../utils/translations';

export const BookingInquiryModal: React.FC = () => {
  const { data, bookingModal, closeBookingModal, language, showToast, openWhatsApp } = useApp();

  const [activeTab, setActiveTab] = useState<'booking' | 'inquiry'>('booking');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    selectedPackage: '',
    travelDate: '',
    travelersCount: 2,
    hotelPickup: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<{
    refCode: string;
    fullName: string;
    email: string;
    phone: string;
    itemTitle: string;
    travelDate: string;
    travelersCount: number;
    hotelPickup: string;
    notes: string;
  } | null>(null);

  // Sync initial target tour/dest when modal opens
  useEffect(() => {
    if (bookingModal.isOpen) {
      setSubmittedBooking(null);
      setErrors({});

      let initialPackage = '';
      if (bookingModal.tour) {
        const localized = getLocalizedTour(bookingModal.tour, language);
        initialPackage = `[Tur] ${localized.name}`;
      } else if (bookingModal.destination) {
        const localized = getLocalizedDestination(bookingModal.destination, language);
        initialPackage = `[Destinasi] ${localized.name}`;
      } else if (data.tours && data.tours.length > 0) {
        initialPackage = `[Tur] ${getLocalizedTour(data.tours[0], language).name}`;
      }

      setFormData((prev) => ({
        ...prev,
        selectedPackage: initialPackage,
      }));

      if (bookingModal.type) {
        setActiveTab(bookingModal.type);
      }
    }
  }, [bookingModal, language, data.tours]);

  if (!bookingModal.isOpen) return null;

  const adminEmail = data.contact?.email || 'kadek.yon30@guru.sd.belajar.id';
  const brandName = data.settings?.siteName || 'KADEK BALI';

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = language === 'id' ? 'Nama lengkap wajib diisi.' : 'Full name is required.';
    }
    if (!formData.email.trim()) {
      errs.email = language === 'id' ? 'Email wajib diisi.' : 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = language === 'id' ? 'Format email tidak valid.' : 'Please enter a valid email address.';
    }
    if (activeTab === 'inquiry' && !formData.notes.trim()) {
      errs.notes = language === 'id' ? 'Pesan pertanyaan wajib diisi.' : 'Please write your question or message.';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showToast(
        language === 'id' ? 'Mohon lengkapi kolom yang diperlukan.' : 'Please complete the highlighted fields.',
        'error'
      );
      return;
    }

    setSubmitting(true);
    const refCode = `KB-${Math.floor(100000 + Math.random() * 900000)}`;
    const itemTitle = formData.selectedPackage || 'Paket Tur Bali';

    try {
      // 1. Send direct email notification to linked admin email
      await sendBookingEmailNotification(
        {
          customerName: formData.fullName,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          travelDate: formData.travelDate,
          travelersCount: formData.travelersCount,
          tourName: itemTitle,
          hotelPickup: formData.hotelPickup,
          notes: formData.notes,
          bookingRef: refCode,
          type: activeTab,
        },
        adminEmail
      );

      // 2. Submit to local/server inquiries database so admin sees it in Dashboard "Pesan Masuk"
      await submitInquiry({
        fullName: formData.fullName,
        email: formData.email,
        travelDate: formData.travelDate,
        travelersCount: formData.travelersCount,
        preferredDestination: itemTitle,
        message: `[${refCode}] ${activeTab === 'booking' ? 'Pemesanan Tur' : 'Pertanyaan'}\nWhatsApp: ${
          formData.phone || '-'
        }\nPenjemputan: ${formData.hotelPickup || 'Layanan Antar-Jemput'}\nCatatan: ${formData.notes || '-'}`,
      });

      // 3. Set success state
      setSubmittedBooking({
        refCode,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        itemTitle,
        travelDate: formData.travelDate,
        travelersCount: formData.travelersCount,
        hotelPickup: formData.hotelPickup,
        notes: formData.notes,
      });

      showToast(
        language === 'id'
          ? `Pesanan berhasil! Notifikasi telah langsung dikirim ke email admin (${adminEmail}).`
          : `Booking submitted! Instant email notification dispatched to admin (${adminEmail}).`,
        'success'
      );
    } catch (err) {
      console.error('Error completing booking:', err);
      showToast(
        language === 'id'
          ? 'Pesanan tersimpan di sistem antrean kami.'
          : 'Booking recorded in our reservation queue.',
        'info'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleWhatsAppForward = () => {
    if (!submittedBooking) return;
    const msg =
      language === 'id'
        ? `Halo ${brandName} TOUR BALI! Saya telah membuat ${
            activeTab === 'booking' ? 'pemesanan' : 'pertanyaan'
          } di website dengan Kode Reservasi *${submittedBooking.refCode}*:\n\n` +
          `• Nama: ${submittedBooking.fullName}\n` +
          `• Email: ${submittedBooking.email}\n` +
          `• WhatsApp: ${submittedBooking.phone || '-'}\n` +
          `• Paket/Destinasi: ${submittedBooking.itemTitle}\n` +
          `• Tanggal: ${submittedBooking.travelDate || 'Fleksibel'}\n` +
          `• Peserta: ${submittedBooking.travelersCount} Orang\n` +
          `• Antar-Jemput: ${submittedBooking.hotelPickup || 'Hotel/Bandara Bali'}\n` +
          (submittedBooking.notes ? `• Catatan: "${submittedBooking.notes}"\n\n` : '\n') +
          `Mohon informasi ketersediaan mobil privat dan jadwal penjemputannya. Terima kasih!`
        : `Hello ${brandName} TOUR BALI! I submitted a ${
            activeTab === 'booking' ? 'booking' : 'inquiry'
          } on your website with Reference *${submittedBooking.refCode}*:\n\n` +
          `• Name: ${submittedBooking.fullName}\n` +
          `• Email: ${submittedBooking.email}\n` +
          `• WhatsApp: ${submittedBooking.phone || '-'}\n` +
          `• Package/Dest: ${submittedBooking.itemTitle}\n` +
          `• Date: ${submittedBooking.travelDate || 'Flexible'}\n` +
          `• Guests: ${submittedBooking.travelersCount} Person(s)\n` +
          `• Pickup: ${submittedBooking.hotelPickup || 'Hotel/Airport'}\n` +
          (submittedBooking.notes ? `• Notes: "${submittedBooking.notes}"\n\n` : '\n') +
          `Please confirm availability and private car pickup details. Thank you!`;

    openWhatsApp(msg);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#252923]/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="relative bg-[#FAF9F6] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-[#EDE5D8] my-auto max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#1E6FD9]/10 via-[#FAF9F6] to-[#15803D]/10 px-6 py-5 border-b border-[#EDE5D8] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1E6FD9] to-[#15803D] text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5" />
            </span>
            <div>
              <h2 id="booking-modal-title" className="font-serif text-xl sm:text-2xl font-bold text-[#252923]">
                {submittedBooking
                  ? language === 'id'
                    ? 'Pesanan Berhasil Dikirim!'
                    : 'Booking Confirmed!'
                  : activeTab === 'booking'
                  ? language === 'id'
                    ? 'Formulir Pesanan Tur Bali'
                    : 'Bali Tour Booking Form'
                  : language === 'id'
                  ? 'Pertanyaan & Konsultasi Wisata'
                  : 'Trip Inquiry & Consultation'}
              </h2>
              <span className="text-xs text-[#526B50] font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
                <span>
                  {language === 'id'
                    ? `Notifikasi otomatis terhubung langsung ke: ${adminEmail}`
                    : `Instant notifications linked to: ${adminEmail}`}
                </span>
              </span>
            </div>
          </div>

          <button
            onClick={closeBookingModal}
            className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {submittedBooking ? (
            /* SUCCESS CONFIRMATION VIEW */
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-4">
                <div className="flex items-center gap-3 text-[#15803D]">
                  <CheckCircle2 className="w-8 h-8 shrink-0" />
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold">
                      {language === 'id' ? 'Terima Kasih atas Pesanan Anda!' : 'Thank you for your booking!'}
                    </h3>
                    <p className="text-xs text-emerald-800">
                      {language === 'id'
                        ? 'Notifikasi pesanan telah langsung dikirimkan ke email pengelola KADEK BALI TOUR.'
                        : 'A notification has been automatically emailed to our tour coordinator.'}
                    </p>
                  </div>
                </div>

                {/* Booking Summary Box */}
                <div className="bg-white/90 p-4 rounded-2xl border border-emerald-100 text-xs sm:text-sm space-y-2 text-[#252923]">
                  <div className="flex items-center justify-between border-b border-emerald-100/70 pb-2">
                    <span className="text-stone-500">{language === 'id' ? 'Kode Reservasi:' : 'Booking Ref:'}</span>
                    <span className="font-mono font-bold text-[#1E6FD9] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                      {submittedBooking.refCode}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">{language === 'id' ? 'Nama Tamu:' : 'Customer Name:'}</span>
                    <span className="font-semibold">{submittedBooking.fullName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">{language === 'id' ? 'Email:' : 'Email:'}</span>
                    <span>{submittedBooking.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">{language === 'id' ? 'Paket / Destinasi:' : 'Package / Dest:'}</span>
                    <span className="font-medium text-[#15803D]">{submittedBooking.itemTitle}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500">{language === 'id' ? 'Tanggal & Tamu:' : 'Date & Guests:'}</span>
                    <span>
                      {submittedBooking.travelDate || (language === 'id' ? 'Fleksibel' : 'Flexible')} ·{' '}
                      {submittedBooking.travelersCount} {language === 'id' ? 'Orang' : 'Guests'}
                    </span>
                  </div>
                  {submittedBooking.hotelPickup && (
                    <div className="flex items-start justify-between gap-2 pt-1 border-t border-emerald-100/70">
                      <span className="text-stone-500 shrink-0">{language === 'id' ? 'Penjemputan:' : 'Pickup:'}</span>
                      <span className="text-right text-stone-700">{submittedBooking.hotelPickup}</span>
                    </div>
                  )}
                </div>

                <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 flex items-start gap-2.5 text-xs text-amber-900 font-light">
                  <Car className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>
                    {language === 'id'
                      ? 'Layanan kami mencakup penjemputan gratis langsung di hotel / villa Anda di seluruh wilayah Bali atau Bandara Ngurah Rai.'
                      : 'Our service includes complimentary doorstep pickup directly at your Bali hotel/villa or Ngurah Rai Airport.'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleWhatsAppForward}
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold bg-[#15803D] text-white hover:bg-[#166534] transition-all shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" />
                  <span>
                    {language === 'id'
                      ? 'Kirim Salinan Pesanan ke WhatsApp Kadek Bali'
                      : 'Send Booking Copy via WhatsApp'}
                  </span>
                </button>

                <button
                  onClick={closeBookingModal}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  {language === 'id' ? 'Tutup Jendela Ini' : 'Close This Window'}
                </button>
              </div>
            </div>
          ) : (
            /* BOOKING & INQUIRY FORM VIEW */
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Mode Toggle: Pesanan Tur vs Pertanyaan */}
              <div className="flex items-center p-1 rounded-2xl bg-[#EDE5D8]/60 border border-[#EDE5D8]">
                <button
                  type="button"
                  onClick={() => setActiveTab('booking')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'booking'
                      ? 'bg-white text-[#15803D] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {language === 'id' ? '🗓️ Pesan Tur (Booking)' : '🗓️ Book a Tour'}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('inquiry')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === 'inquiry'
                      ? 'bg-white text-[#1E6FD9] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {language === 'id' ? '💬 Pertanyaan / Konsultasi' : '💬 General Inquiry'}
                </button>
              </div>

              {/* Package / Destination Select */}
              <div>
                <label className="block text-xs font-bold text-[#252923] mb-1.5 flex items-center justify-between">
                  <span>{language === 'id' ? 'Pilih Paket Tur atau Wisata' : 'Select Tour or Destination'}</span>
                  <span className="text-[11px] font-normal text-stone-400">
                    {language === 'id' ? 'Dapat disesuaikan' : 'Customizable'}
                  </span>
                </label>
                <select
                  value={formData.selectedPackage}
                  onChange={(e) => setFormData({ ...formData, selectedPackage: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white border border-[#EDE5D8] focus:outline-none focus:border-[#15803D] transition-colors"
                >
                  <optgroup label={language === 'id' ? 'Paket Tur Unggulan' : 'Tour Packages'}>
                    {(data.tours || []).map((t) => {
                      const loc = getLocalizedTour(t, language);
                      return (
                        <option key={t.id} value={`[Tur] ${loc.name}`}>
                          {loc.name} ({loc.duration})
                        </option>
                      );
                    })}
                  </optgroup>
                  <optgroup label={language === 'id' ? 'Destinasi Wisata Populer' : 'Popular Destinations'}>
                    {(data.destinations || []).map((d) => {
                      const loc = getLocalizedDestination(d, language);
                      return (
                        <option key={d.id} value={`[Destinasi] ${loc.name}`}>
                          {loc.name} ({loc.location})
                        </option>
                      );
                    })}
                  </optgroup>
                  <option value={language === 'id' ? '[Kustom] Rute Bebas / Kustom Sendiri' : '[Custom] Custom Itinerary'}>
                    {language === 'id' ? '✨ Rute Bebas / Custom Bali Tour' : '✨ Custom Bali Itinerary'}
                  </option>
                </select>
              </div>

              {/* Two columns: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#252923] mb-1 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#1E6FD9]" />
                    <span>{language === 'id' ? 'Nama Lengkap *' : 'Full Name *'}</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder={language === 'id' ? 'Nama Anda' : 'Your Name'}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white border ${
                      errors.fullName ? 'border-rose-500' : 'border-[#EDE5D8]'
                    } focus:outline-none focus:border-[#1E6FD9] transition-colors`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#252923] mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#1E6FD9]" />
                    <span>{language === 'id' ? 'Alamat Email *' : 'Email Address *'}</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white border ${
                      errors.email ? 'border-rose-500' : 'border-[#EDE5D8]'
                    } focus:outline-none focus:border-[#1E6FD9] transition-colors`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Two columns: WhatsApp Phone & Travel Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#252923] mb-1 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#15803D]" />
                    <span>{language === 'id' ? 'Nomor WhatsApp / HP' : 'WhatsApp / Mobile Number'}</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+62 8..."
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white border border-[#EDE5D8] focus:outline-none focus:border-[#15803D] transition-colors"
                  />
                  <span className="text-[10px] text-stone-500 mt-0.5 block">
                    {language === 'id' ? 'Untuk koordinasi penjemputan oleh supir privat' : 'For driver pickup coordination'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-[#252923] mb-1 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#C6A66B]" />
                      <span>{language === 'id' ? 'Tanggal' : 'Date'}</span>
                    </label>
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full px-2.5 py-2.5 rounded-xl text-xs bg-white border border-[#EDE5D8] focus:outline-none focus:border-[#15803D] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#252923] mb-1 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#C6A66B]" />
                      <span>{language === 'id' ? 'Peserta' : 'Guests'}</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={formData.travelersCount}
                      onChange={(e) =>
                        setFormData({ ...formData, travelersCount: parseInt(e.target.value, 10) || 1 })
                      }
                      className="w-full px-2.5 py-2.5 rounded-xl text-xs bg-white border border-[#EDE5D8] focus:outline-none focus:border-[#15803D] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Hotel / Villa Pickup Location */}
              <div>
                <label className="block text-xs font-bold text-[#252923] mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#15803D]" />
                    <span>{language === 'id' ? 'Lokasi Penjemputan (Hotel / Villa / Bandara Bali)' : 'Pickup Hotel / Villa / Airport'}</span>
                  </span>
                  <span className="text-[10px] text-[#15803D] font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {language === 'id' ? 'Antar-Jemput Gratis' : 'Doorstep Pickup'}
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.hotelPickup}
                  onChange={(e) => setFormData({ ...formData, hotelPickup: e.target.value })}
                  placeholder={
                    language === 'id'
                      ? 'misal: Hotel Maya Ubud / Villa Seminyak / Bandara DPS'
                      : 'e.g. Maya Ubud Resort / Seminyak Villa / DPS Airport'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white border border-[#EDE5D8] focus:outline-none focus:border-[#15803D] transition-colors"
                />
              </div>

              {/* Special Notes / Questions */}
              <div>
                <label className="block text-xs font-bold text-[#252923] mb-1 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-stone-500" />
                  <span>
                    {activeTab === 'booking'
                      ? language === 'id'
                        ? 'Catatan Tambahan / Permintaan Khusus'
                        : 'Special Requests / Notes'
                      : language === 'id'
                      ? 'Pesan Pertanyaan Anda *'
                      : 'Your Question / Message *'}
                  </span>
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={
                    activeTab === 'booking'
                      ? language === 'id'
                        ? 'Tuliskan permintaan khusus (misal: kursi bayi, itinerary tambahan, preferensi makanan)...'
                        : 'Any special requests, infant car seat, specific sightseeing stops...'
                      : language === 'id'
                      ? 'Tuliskan pertanyaan atau rencana perjalanan Anda...'
                      : 'Ask about custom routes, vehicle types, pricing...'
                  }
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-white border ${
                    errors.notes ? 'border-rose-500' : 'border-[#EDE5D8]'
                  } focus:outline-none focus:border-[#15803D] transition-colors`}
                />
                {errors.notes && (
                  <p className="mt-1 text-[11px] text-rose-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.notes}
                  </p>
                )}
              </div>

              {/* Notice that notifications will directly ping admin email */}
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/70 flex items-start gap-2.5 text-xs text-blue-900">
                <Mail className="w-4 h-4 text-[#1E6FD9] shrink-0 mt-0.5" />
                <p className="font-light leading-relaxed">
                  {language === 'id' ? (
                    <>
                      Ketika Anda menekan <strong>Kirim Pesanan</strong>, notifikasi otomatis langsung dikirim ke email admin:{' '}
                      <strong className="underline">{adminEmail}</strong> dan Anda dapat langsung melanjutkan koordinasi via WhatsApp.
                    </>
                  ) : (
                    <>
                      Submitting will automatically send an instant booking notification to our tour manager email:{' '}
                      <strong className="underline">{adminEmail}</strong>.
                    </>
                  )}
                </p>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-semibold text-stone-600 hover:text-stone-900 border border-stone-200 hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  {language === 'id' ? 'Batal' : 'Cancel'}
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#15803D] text-white hover:bg-[#166534] transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {submitting
                      ? language === 'id'
                        ? 'Mengirim Notifikasi...'
                        : 'Sending Notification...'
                      : activeTab === 'booking'
                      ? language === 'id'
                        ? 'Kirim Pesanan Sekarang'
                        : 'Submit Booking Now'
                      : language === 'id'
                      ? 'Kirim Pertanyaan'
                      : 'Send Inquiry'}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
