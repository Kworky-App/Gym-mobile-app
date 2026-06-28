import { Stack } from 'expo-router';
import { ThemeToggle } from '@/components/theme-toggle';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Profil' }} />
    </Stack>
  );
}
