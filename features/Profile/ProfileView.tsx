import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useAuthStore } from '@/features/auth/useAuthStore';
import { ROUTES } from '@/lib/routes';

export const ProfileView = () => {
  const { user, signOut } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
    router.replace(ROUTES.auth);
  };

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerClassName="items-center px-6 py-6"
      >
        <Text className="text-center">{user?.email}</Text>
        <Text variant="muted" className="mt-2 text-center">
          Vos informations personnelles apparaîtront ici.
        </Text>
        <View className="border-t border-border p-4">
          <Button variant="destructive" onPress={handleSignOut}>
            <Text>Se déconnecter</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};
