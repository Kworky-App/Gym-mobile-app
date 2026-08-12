export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; message: string };

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
    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data?.message || 'Unknown error.' };
    }
    return { success: true, data: data as T };
  },
};
