/**
 * Public storefront configuration.
 *
 * PUBLIC-ONLY module. Safe to edit without affecting the dashboard.
 *
 * NOTE on WhatsApp: no business number is configured in the repo yet.
 * `WHATSAPP_NUMBER` is intentionally left empty — set it to the boutique's
 * real number (country code + number, digits only, e.g. "919876543210")
 * and every public WhatsApp action will deep-link to it automatically.
 * Until then, links fall back to WhatsApp's share picker (`wa.me/?text=…`)
 * so no fake number is ever invented or dialled.
 */

export const STORE = {
  name: 'RK Boutique & Rentals',
  shortName: 'RK Rent Dress',
  city: 'Raipur',
  addressLines: ['123 MG Road', 'Raipur, Chhattisgarh 492001'],
  phoneDisplay: '+91 98XXX-XXX-XX',
  instagram: '@rk_rent_dress_raipur_',
  hours: 'Open all days · 10:30 AM – 8:30 PM',
} as const;

/** Canonical public URL — used for shareable product links in inquiries. */
export const SITE_URL = 'https://rkboutiqueandrental.vercel.app';

/** Digits only, with country code. Empty until the owner provides it. */
export const WHATSAPP_NUMBER = '';

export function buildWhatsAppLink(message: string): string {
  const text = encodeURIComponent(message);
  const digits = WHATSAPP_NUMBER.replace(/\D/g, '');
  return digits ? `https://wa.me/${digits}?text=${text}` : `https://wa.me/?text=${text}`;
}

export interface InquiryDetails {
  name: string;
  priceLine: string;
  productUrl?: string;
  size?: string;
  color?: string;
  rentalStart?: string;
  rentalEnd?: string;
  mode?: 'retail' | 'rental';
}

/** Builds an honest, data-driven inquiry message — never invents stock or prices. */
export function buildProductInquiry(details: InquiryDetails): string {
  const lines = [
    `Hello ${STORE.shortName}!`,
    `I'm interested in "${details.name}" (${details.priceLine}).`,
  ];
  if (details.productUrl) lines.push(details.productUrl);
  if (details.mode === 'rental' && details.rentalStart && details.rentalEnd) {
    lines.push(`Event dates: ${details.rentalStart} to ${details.rentalEnd}.`);
  }
  if (details.size) lines.push(`Size: ${details.size}.`);
  if (details.color) lines.push(`Colour: ${details.color}.`);
  lines.push('Please share availability and next steps.');
  return lines.join('\n');
}

export function buildGeneralInquiry(): string {
  return `Hello ${STORE.shortName}! I'd like to know more about your designer collection and rentals.`;
}
