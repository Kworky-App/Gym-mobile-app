import { ThemeToggle } from '@/components/theme-toggle';
import { Stack } from 'expo-router';

export default function WorkoutsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerRight: () => <ThemeToggle />,
      }}>
      <Stack.Screen name="index" options={{ title: 'Séances' }} />
    </Stack>
  );
}
