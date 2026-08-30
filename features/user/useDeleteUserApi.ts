import { useMutation } from '@tanstack/react-query';
import { HttpError, httpClient } from '@/lib/httpClient';
import { USER_BASE_URL } from './userConstants';

export function useDeleteUserApi() {
  const { mutate, isPending, error } = useMutation<void, HttpError>({
    mutationFn: async () => {
      const result = await httpClient.request<void>(
        `${USER_BASE_URL}/me`,
        'DELETE',
      );
      if (!result.success) {
        throw new HttpError(result.message, result.status);
      }
    },
    mutationKey: ['user-delete'],
  });
  return { mutate, isPending, error };
}
