export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiError {
  status: number;
  message: string;
  code: 'NETWORK_ERROR' | 'TIMEOUT' | 'HTTP_ERROR' | 'PARSE_ERROR' | 'UNKNOWN';
}

export type ApiResult<TData> =
  | {
      ok: true;
      data: TData;
    }
  | {
      ok: false;
      error: ApiError;
    };

export interface ApiRequestOptions<TBody> {
  method?: HttpMethod;
  body?: TBody;
  headers?: HeadersInit;
  timeoutMs?: number;
  retries?: number;
  tokenProvider?: () => Promise<string | null> | string | null;
}
