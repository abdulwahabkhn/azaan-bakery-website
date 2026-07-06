import { env } from '@/config/env';

import type { ApiError, ApiRequestOptions, ApiResult } from '@/api/types';

const defaultTimeoutMs = 9000;
const retryDelayMs = 420;

const createApiError = (error: unknown): ApiError => {
  if (error instanceof DOMException && error.name === 'AbortError') {
    return {
      status: 408,
      message: 'The request timed out. Please try again.',
      code: 'TIMEOUT',
    };
  }

  if (error instanceof TypeError) {
    return {
      status: 0,
      message: 'Network request failed.',
      code: 'NETWORK_ERROR',
    };
  }

  if (error instanceof Error) {
    return {
      status: 0,
      message: error.message,
      code: 'UNKNOWN',
    };
  }

  return {
    status: 0,
    message: 'Unexpected request failure.',
    code: 'UNKNOWN',
  };
};

const wait = (durationMs: number): Promise<void> =>
  new Promise((resolve) => {
    window.setTimeout(resolve, durationMs);
  });

export class HttpClient {
  constructor(private readonly baseUrl: string) {}

  async request<TResponse, TBody = unknown>(
    endpoint: string,
    options: ApiRequestOptions<TBody> = {},
  ): Promise<ApiResult<TResponse>> {
    const method = options.method ?? 'GET';
    const retries = Math.max(0, options.retries ?? 0);

    for (let attempt = 0; attempt <= retries; attempt += 1) {
      const response = await this.execute<TResponse, TBody>(endpoint, { ...options, method });

      if (response.ok || attempt === retries || method !== 'GET') {
        return response;
      }

      await wait(retryDelayMs * (attempt + 1));
    }

    return {
      ok: false,
      error: {
        status: 0,
        message: 'Request could not be completed.',
        code: 'UNKNOWN',
      },
    };
  }

  private async execute<TResponse, TBody>(
    endpoint: string,
    options: ApiRequestOptions<TBody>,
  ): Promise<ApiResult<TResponse>> {
    const controller = new AbortController();
    const timeout = window.setTimeout(
      () => controller.abort(),
      options.timeoutMs ?? defaultTimeoutMs,
    );

    try {
      const token = await options.tokenProvider?.();
      const headers = new Headers(options.headers);
      headers.set('Accept', 'application/json');

      if (options.body !== undefined) {
        headers.set('Content-Type', 'application/json');
      }

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: options.method,
        headers,
        body: options.body === undefined ? undefined : JSON.stringify(options.body),
        credentials: 'same-origin',
        signal: controller.signal,
      });

      if (!response.ok) {
        return {
          ok: false,
          error: {
            status: response.status,
            message: response.statusText || 'Request failed.',
            code: 'HTTP_ERROR',
          },
        };
      }

      const contentType = response.headers.get('content-type') ?? '';

      if (!contentType.includes('application/json')) {
        return {
          ok: true,
          data: undefined as TResponse,
        };
      }

      const data = (await response.json()) as TResponse;

      return {
        ok: true,
        data,
      };
    } catch (error) {
      return {
        ok: false,
        error: createApiError(error),
      };
    } finally {
      window.clearTimeout(timeout);
    }
  }
}

export const apiClient = new HttpClient(env.apiBaseUrl);
