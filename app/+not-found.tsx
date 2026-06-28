import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { ROUTES } from '@/lib/routes';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View>
        <Text>This screen doesn't exist.</Text>

        <Link href={ROUTES.home}>
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
