import test from 'node:test';
import assert from 'node:assert/strict';
import {
  cleanPhoneNumber,
  formatWhatsAppLink,
  buildTourInquiryMessage,
  buildDestinationInquiryMessage,
  formatPrice,
  validateContactForm,
} from './bookingUtils';

test('cleanPhoneNumber sanitizes international and Indonesian local phone formats', () => {
  assert.equal(cleanPhoneNumber('+62 812 3456 7890'), '6281234567890');
  assert.equal(cleanPhoneNumber('081234567890'), '6281234567890');
  assert.equal(cleanPhoneNumber('6281999888777'), '6281999888777');
});

test('formatWhatsAppLink generates valid wa.me URL with encoded message', () => {
  const link = formatWhatsAppLink('+62 812 3456 7890', 'Hello VERLASKA TRAVEL!');
  assert.ok(link.startsWith('https://wa.me/6281234567890?text=Hello%20VERLASKA%20TRAVEL!'));
});

test('buildTourInquiryMessage supports both English and Indonesian formats', () => {
  const msgEn = buildTourInquiryMessage('VERLASKA TRAVEL', 'Ubud Heritage Tour', '2026-11-15', 2, 'en');
  assert.ok(msgEn.includes('VERLASKA TRAVEL'));
  assert.ok(msgEn.includes('Ubud Heritage Tour'));
  assert.ok(msgEn.includes('Number of travelers: 2'));

  const msgId = buildTourInquiryMessage('VERLASKA TRAVEL', 'Ubud Heritage Tour', '2026-11-15', 2, 'id');
  assert.ok(msgId.includes('Halo VERLASKA TRAVEL'));
  assert.ok(msgId.includes('Jumlah tamu: 2 orang'));
});

test('buildDestinationInquiryMessage supports both English and Indonesian formats', () => {
  const msgEn = buildDestinationInquiryMessage('VERLASKA TRAVEL', 'Nusa Penida', 'en');
  assert.ok(msgEn.includes('Nusa Penida'));
  assert.ok(msgEn.includes('VERLASKA TRAVEL'));

  const msgId = buildDestinationInquiryMessage('VERLASKA TRAVEL', 'Nusa Penida', 'id');
  assert.ok(msgId.includes('Halo VERLASKA TRAVEL'));
  assert.ok(msgId.includes('Nusa Penida'));
});

test('formatPrice correctly handles fixed, starting, and contact price types in EN and ID', () => {
  assert.equal(formatPrice(650000, 'IDR', 'starting', 'en'), 'From IDR 650,000');
  assert.equal(formatPrice(650000, 'IDR', 'starting', 'id'), 'Mulai Dari IDR 650,000');
  assert.equal(formatPrice(550000, 'IDR', 'fixed', 'en'), 'IDR 550,000');
  assert.equal(formatPrice(0, 'IDR', 'contact', 'en'), 'Contact Us for Price');
  assert.equal(formatPrice(0, 'IDR', 'contact', 'id'), 'Hubungi Kami untuk Harga');
});

test('validateContactForm checks full name, valid email, and provides localized errors', () => {
  const invalidId = validateContactForm({
    fullName: '',
    email: 'not-an-email',
    message: '',
  }, 'id');
  assert.equal(invalidId.valid, false);
  assert.ok(invalidId.errors.fullName.includes('nama lengkap'));
  assert.ok(invalidId.errors.email.includes('alamat email'));

  const valid = validateContactForm({
    fullName: 'Jane Doe',
    email: 'jane@example.com',
    message: 'We are looking for a private driver in Bali next month.',
    travelersCount: 3,
  }, 'en');
  assert.equal(valid.valid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
