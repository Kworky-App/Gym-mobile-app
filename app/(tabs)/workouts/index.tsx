import { Text } from '@/components/ui/text';
import { ScrollView } from 'react-native';

export default function WorkoutsScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}>
      <Text variant="h1" className="text-center">
        Séances
      </Text>
      <Text variant="muted" className="mt-2 text-center">
        Vos entraînements apparaîtront ici.
      </Text>
    </ScrollView>
  );
}
