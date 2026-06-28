export const ROUTES = {
  home: '/home',
  auth: '/(auth)',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
