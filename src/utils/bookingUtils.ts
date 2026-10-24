import { PriceType } from '../types';

/**
 * Cleans any phone number format into international digits without symbols.
 * Handles Indonesian local '08...' converting to '628...'.
 */
export function cleanPhoneNumber(raw: string): string {
  if (!raw) return '6285739256845';
  let cleaned = raw.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+')) {
    cleaned = cleaned.slice(1);
  }
  // Convert local Indonesian prefix 08xx to 628xx
  if (cleaned.startsWith('08')) {
    cleaned = '62' + cleaned.slice(1);
  }
  return cleaned;
}

/**
 * Generates an official WhatsApp click-to-chat URL with pre-filled message.
 */
export function formatWhatsAppLink(whatsappNumber: string, message: string): string {
  const phone = cleanPhoneNumber(whatsappNumber);
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${phone}?text=${encodedText}`;
}

/**
 * Formats a tour booking inquiry message with bilingual support.
 */
export function buildTourInquiryMessage(
  brandName: string,
  tourName: string,
  travelDate?: string,
  guests?: number,
  lang: 'en' | 'id' = 'en'
): string {
  if (lang === 'id') {
    let msg = `Halo ${brandName}, saya tertarik untuk memesan paket "${tourName}".`;
    if (travelDate) {
      msg += ` Rencana tanggal: ${travelDate}.`;
    }
    if (guests && guests > 0) {
      msg += ` Jumlah tamu: ${guests} orang.`;
    }
    msg += ` Mohon informasi lebih lanjut dan ketersediaan jadwalnya. Terima kasih!`;
    return msg;
  }

  let msg = `Hello ${brandName}, I am interested in your "${tourName}" tour package.`;
  if (travelDate) {
    msg += ` Planned date: ${travelDate}.`;
  }
  if (guests && guests > 0) {
    msg += ` Number of travelers: ${guests}.`;
  }
  msg += ` Could you please provide more information and availability?`;
  return msg;
}

/**
 * Formats a destination inquiry message with bilingual support.
 */
export function buildDestinationInquiryMessage(
  brandName: string,
  destinationName: string,
  lang: 'en' | 'id' = 'en'
): string {
  if (lang === 'id') {
    return `Halo ${brandName}, saya sangat ingin mengunjungi ${destinationName} di Bali. Apakah bisa merekomendasikan rute tur privat terbaik untuk ke sana?`;
  }
  return `Hello ${brandName}, I would love to explore ${destinationName} in Bali. Could you please share recommended private day tours or custom itineraries for this place?`;
}

/**
 * Formats a general inquiry message with bilingual support.
 */
export function buildGeneralInquiryMessage(brandName: string, lang: 'en' | 'id' = 'en'): string {
  if (lang === 'id') {
    return `Halo ${brandName}, saya sedang merencanakan liburan ke Bali dan ingin bertanya tentang layanan tur privat serta sewa mobil.`;
  }
  return `Hello ${brandName}, I am planning a trip to Bali and would like to ask about your private tour and transport services.`;
}

/**
 * Formats price display according to priceType (fixed, starting, contact) and language.
 */
export function formatPrice(
  price: number,
  currency: string = 'IDR',
  priceType: PriceType = 'starting',
  lang: 'en' | 'id' = 'en'
): string {
  if (priceType === 'contact') {
    return lang === 'id' ? 'Hubungi Kami untuk Harga' : 'Contact Us for Price';
  }

  let formattedNumber = price.toLocaleString('en-US');
  if (currency === 'IDR') {
    formattedNumber = `IDR ${formattedNumber}`;
  } else if (currency === 'USD') {
    formattedNumber = `$${formattedNumber}`;
  } else if (currency === 'AUD') {
    formattedNumber = `A$${formattedNumber}`;
  } else {
    formattedNumber = `${currency} ${formattedNumber}`;
  }

  if (priceType === 'starting') {
    return lang === 'id' ? `Mulai Dari ${formattedNumber}` : `From ${formattedNumber}`;
  }
  return formattedNumber;
}

export interface ContactFormInput {
  fullName: string;
  email: string;
  travelDate?: string;
  travelersCount?: number;
  preferredDestination?: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

/**
 * Validates the contact/inquiry form with bilingual error messages.
 */
export function validateContactForm(data: ContactFormInput, lang: 'en' | 'id' = 'en'): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName =
      lang === 'id'
        ? 'Harap masukkan nama lengkap Anda (minimal 2 karakter).'
        : 'Please enter your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email =
      lang === 'id'
        ? 'Harap masukkan alamat email yang valid.'
        : 'Please provide a valid email address.';
  }

  if (!data.message || data.message.trim().length < 5) {
    errors.message =
      lang === 'id'
        ? 'Harap masukkan pesan atau pertanyaan Anda (minimal 5 karakter).'
        : 'Please enter your message (at least 5 characters).';
  }

  if (data.travelersCount !== undefined && data.travelersCount < 1) {
    errors.travelersCount =
      lang === 'id'
        ? 'Jumlah tamu minimal 1 orang.'
        : 'Number of travelers must be at least 1.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Builds a direct clickable URL for social media profiles.
 * Handles '@username', plain 'username', and complete 'https://...' URLs.
 */
export function buildSocialUrl(
  platform: 'instagram' | 'facebook' | 'tiktok' | 'youtube',
  input?: string
): string {
  if (!input) return '';
  const trimmed = input.trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  const cleanHandle = trimmed.replace(/^@/, '');
  switch (platform) {
    case 'instagram':
      return `https://instagram.com/${cleanHandle}`;
    case 'facebook':
      return `https://facebook.com/${cleanHandle}`;
    case 'tiktok':
      return `https://tiktok.com/@${cleanHandle}`;
    case 'youtube':
      return cleanHandle.startsWith('channel/') || cleanHandle.startsWith('c/')
        ? `https://youtube.com/${cleanHandle}`
        : `https://youtube.com/@${cleanHandle}`;
    default:
      return trimmed;
  }
}
