import '@/global.css';

import { ThemeProvider } from '@react-navigation/native';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import { getStoredSession } from '@/features/auth/authStorage.lib';
import { httpClient } from '@/lib/httpClient';
import { queryClient } from '@/lib/queryProvider';
import { NAV_THEME } from '@/lib/theme';

httpClient.setAuthTokenProvider(async () => {
  const session = await getStoredSession();
  return session?.token ?? null;
});

export default function RootLayout() {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex-1 bg-background">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={NAV_THEME[colorScheme ?? 'light']}>
          <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          <Stack screenOptions={{ headerShown: false }} />
          <PortalHost />
        </ThemeProvider>
      </QueryClientProvider>
    </View>
  );
}
