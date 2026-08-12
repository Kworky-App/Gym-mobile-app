import * as SecureStore from 'expo-secure-store';

const AUTH_SESSION_STORAGE_KEY = 'auth-session';

export type StoredSession = {
  id: string;
  email: string;
  token: string;
};

export async function getStoredSession(): Promise<StoredSession | null> {
  const raw = await SecureStore.getItemAsync(AUTH_SESSION_STORAGE_KEY);
  return raw ? (JSON.parse(raw) as StoredSession) : null;
}

export async function setStoredSession(session: StoredSession): Promise<void> {
  await SecureStore.setItemAsync(
    AUTH_SESSION_STORAGE_KEY,
    JSON.stringify(session),
  );
}

export async function clearStoredSession(): Promise<void> {
  await SecureStore.deleteItemAsync(AUTH_SESSION_STORAGE_KEY);
}
