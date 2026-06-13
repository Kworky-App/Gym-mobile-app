import { Text } from '@/components/ui/text';
import { ScrollView } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView
    contentContainerStyle={{
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <Text variant="h1" className="text-center">
        Profil
      </Text>
      <Text variant="muted" className="mt-2 text-center">
        Vos informations personnelles apparaîtront ici.
      </Text>
    </ScrollView>
  );
}
