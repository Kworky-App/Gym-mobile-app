import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AUTH_SESSION_KEY } from './auth.constants';
import {
  clearStoredSession,
  getStoredSession,
  type StoredSession,
  setStoredSession,
} from './authStorage.lib';

export function useAuthStore() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: AUTH_SESSION_KEY,
    queryFn: getStoredSession,
    staleTime: Infinity,
  });

  return {
    user: data ?? null,
    authorized: !!data,
    isLoading,
    signIn: async (session: StoredSession) => {
      await setStoredSession(session);
      queryClient.setQueryData(AUTH_SESSION_KEY, session);
    },
    signOut: async () => {
      await clearStoredSession();
      queryClient.setQueryData(AUTH_SESSION_KEY, null);
    },
  };
}
