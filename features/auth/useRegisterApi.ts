import { useMutation } from '@tanstack/react-query';
import { httpClient } from '@/lib/httpClient';
import { AUTH_BASE_URL } from './authConstants';
import type { RegisterUserRequest, RegisterUserResponse } from './authSchema';

export function useRegisterApi() {
  const { mutate, isPending, error } = useMutation<
    RegisterUserResponse,
    Error,
    RegisterUserRequest
  >({
    mutationFn: async (input: RegisterUserRequest) => {
      const result = await httpClient.request<RegisterUserResponse>(
        `${AUTH_BASE_URL}/register`,
        'POST',
        {
          ...input,
          dateOfBirth: input.dateOfBirth.toISOString().slice(0, 10),
        },
      );
      if (!result.success) {
        throw new Error(result.message);
      }
      return result.data;
    },
    mutationKey: ['auth-register'],
  });
  return { mutate, isPending, error };
}
