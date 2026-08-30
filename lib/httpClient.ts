export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; message: string; status: number };

export class HttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

type AuthTokenProvider = () => Promise<string | null>;

let getAuthToken: AuthTokenProvider = async () => null;

export const httpClient = {
  /** Wire in how to resolve the current auth token. Call once at app startup. */
  setAuthTokenProvider(provider: AuthTokenProvider) {
    getAuthToken = provider;
  },

  async request<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: unknown,
  ): Promise<ApiResult<T>> {
    const token = await getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    const hasBody =
      response.status !== 204 && response.headers.get('content-length') !== '0';
    const data = hasBody ? await response.json().catch(() => null) : null;
    if (!response.ok) {
      return {
        success: false,
        message: data?.message || 'Unknown error.',
        status: response.status,
      };
    }
    return { success: true, data: data as T };
  },
};
