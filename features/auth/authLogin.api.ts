import { useMutation } from '@tanstack/react-query';
import { httpClient } from '@/lib/httpClient';
import { AUTH_BASE_URL } from './auth.constants';
import type { LoginUserRequest, LoginUserResponse } from './auth.schema';

export function useLoginApi() {
  const { mutate, isPending, error, data } = useMutation<
    LoginUserResponse,
    Error,
    LoginUserRequest
  >({
    mutationFn: async (input: LoginUserRequest) => {
      const result = await httpClient.request<LoginUserResponse>(
        `${AUTH_BASE_URL}/login`,
        'POST',
        input,
      );
      if (!result.success) {
        throw new Error(result.message);
      }
      return result.data;
    },
    mutationKey: ['auth-login'],
  });
  return { mutate, isPending, error, data };
}
