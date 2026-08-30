import { useQuery } from '@tanstack/react-query';
import { HttpError, httpClient } from '@/lib/httpClient';
import { USER_BASE_URL } from './userConstants';
import type { CurrentUserResponse } from './userSchema';

export function useGetUserApi() {
  const { isPending, error, data } = useQuery<CurrentUserResponse, HttpError>({
    queryFn: async () => {
      const result = await httpClient.request<CurrentUserResponse>(
        `${USER_BASE_URL}/me`,
        'GET',
      );
      if (!result.success) {
        throw new HttpError(result.message, result.status);
      }
      return result.data;
    },
    queryKey: ['user-get'],
    retry: false,
  });
  return { isPending, error, data };
}
