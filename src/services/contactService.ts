import { apiClient } from '@/api/httpClient';
import { env } from '@/config/env';
import { sanitizeContactPayload, sanitizeNewsletterPayload } from '@/utils/sanitize';

import type { ApiResult } from '@/api/types';
import type { ContactFormValues, NewsletterFormValues } from '@/utils/validation';

export interface ContactSubmissionResponse {
  id: string;
  receivedAt: string;
  status: 'queued';
}

const createLocalSubmission = (): ContactSubmissionResponse => ({
  id: crypto.randomUUID(),
  receivedAt: new Date().toISOString(),
  status: 'queued',
});

const simulateLatency = (): Promise<void> =>
  new Promise((resolve) => {
    window.setTimeout(resolve, 700);
  });

export const contactService = {
  async submitContact(values: ContactFormValues): Promise<ApiResult<ContactSubmissionResponse>> {
    const payload = sanitizeContactPayload(values);

    if (!env.apiBaseUrl) {
      await simulateLatency();
      return { ok: true, data: createLocalSubmission() };
    }

    return apiClient.request<ContactSubmissionResponse, ContactFormValues>('/contact', {
      method: 'POST',
      body: payload,
      timeoutMs: 9000,
    });
  },

  async subscribe(values: NewsletterFormValues): Promise<ApiResult<ContactSubmissionResponse>> {
    const payload = sanitizeNewsletterPayload(values);

    if (!env.apiBaseUrl) {
      await simulateLatency();
      return { ok: true, data: createLocalSubmission() };
    }

    return apiClient.request<ContactSubmissionResponse, NewsletterFormValues>('/newsletter', {
      method: 'POST',
      body: payload,
      timeoutMs: 9000,
    });
  },
};
