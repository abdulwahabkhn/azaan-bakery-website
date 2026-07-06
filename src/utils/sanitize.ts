import type { ContactFormValues, NewsletterFormValues } from '@/utils/validation';

const htmlEntityMap: Readonly<Record<string, string>> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
  '=': '&#x3D;',
  '/': '&#x2F;',
};

const dangerousCharacterPattern = /[&<>"'`=/]/g;

export const sanitizeText = (value: string): string =>
  value.trim().replace(dangerousCharacterPattern, (character) => htmlEntityMap[character] ?? '');

export const normalizeSearchTerm = (value: string): string =>
  value.trim().replace(/[<>]/g, '').replace(/\s+/g, ' ').slice(0, 80);

export const sanitizeContactPayload = (values: ContactFormValues): ContactFormValues => ({
  name: sanitizeText(values.name),
  phone: sanitizeText(values.phone),
  address: sanitizeText(values.address),
  orderDetails: sanitizeText(values.orderDetails),
  optionalMessage: sanitizeText(values.optionalMessage),
  companyWebsite: values.companyWebsite,
});

export const sanitizeNewsletterPayload = (values: NewsletterFormValues): NewsletterFormValues => ({
  email: values.email.trim().toLowerCase(),
  companyWebsite: values.companyWebsite,
});
