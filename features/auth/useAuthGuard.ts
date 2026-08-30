import { router } from 'expo-router';
import { useEffect } from 'react';
import { useGetUserApi } from '@/features/user/useGetUserApi';
import { HttpError } from '@/lib/httpClient';
import { ROUTES } from '@/lib/routes';
import { useAuthStore } from './useAuthStore';

/**
 * Centralizes session validation for gated screens:
 * - resolves whether the current user is authenticated against the server,
 * - redirects to home once authenticated,
 * - signs out locally when the server rejects the session (401),
 * - stays optimistically authenticated when the check fails for any other
 *   reason (network/server unreachable), preserving offline UX.
 *
 * TODO: extend with authorization checks (roles/permissions) once available.
 */
export function useAuthGuard() {
  const { data, error, isPending } = useGetUserApi();
  const { user, isLoading, signOut } = useAuthStore();

  const isReady = !isPending && !isLoading;
  const isSessionExpired = error instanceof HttpError && error.status === 401;
  const isSessionConfirmed = !!data && data.email === user?.email;
  const isNetworkOrServerError = !!error && !isSessionExpired;
  const isAuthenticated =
    isReady && !!user && (isSessionConfirmed || isNetworkOrServerError);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(ROUTES.home);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isSessionExpired && user) {
      signOut();
    }
  }, [isSessionExpired, user, signOut]);

  return { isReady, isAuthenticated, user };
}
