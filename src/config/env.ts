const trimTrailingSlash = (value: string): string => value.replace(/\/+$/, '');

export const env = Object.freeze({
  appUrl: trimTrailingSlash(import.meta.env.VITE_APP_URL ?? 'https://azaanbaker.com'),
  apiBaseUrl: trimTrailingSlash(import.meta.env.VITE_API_BASE_URL ?? ''),
  whatsappNumber: (import.meta.env.VITE_WHATSAPP_NUMBER ?? '923061923382').replace(/\D/g, ''),
});
