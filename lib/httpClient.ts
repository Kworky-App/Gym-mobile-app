export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; message: string };

export const httpClient = {
  async request<T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: unknown,
  ): Promise<ApiResult<T>> {
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data?.message || 'Unknown error.' };
    }
    return { success: true, data: data as T };
  },
};
