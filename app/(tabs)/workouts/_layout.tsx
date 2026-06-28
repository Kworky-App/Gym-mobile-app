import { Stack } from 'expo-router';
import { ThemeToggle } from '@/components/theme-toggle';

export default function WorkoutsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Séances' }} />
    </Stack>
  );
}
