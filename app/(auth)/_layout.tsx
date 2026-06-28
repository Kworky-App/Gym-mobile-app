import { Stack } from 'expo-router';
import { ThemeToggle } from '@/components/theme-toggle';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerRight: () => <ThemeToggle />,
        contentStyle: {
          paddingHorizontal: 16,
          paddingTop: 60,
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Authentification' }} />
    </Stack>
  );
}
