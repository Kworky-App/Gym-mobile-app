import { Stack } from 'expo-router';
import { ThemeToggle } from '@/components/theme-toggle';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Accueil' }} />
    </Stack>
  );
}
