import { API_BASE_URL } from '@/lib/env';

export const AUTH_BASE_URL = `${API_BASE_URL}/auth`;

export const AUTH_SESSION_KEY = ['auth', 'session'] as const;
