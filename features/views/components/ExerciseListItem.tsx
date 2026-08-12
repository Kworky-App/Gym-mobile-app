import { DumbbellIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import type { Exercise } from '@/features/views/usePlansStore';

type ExerciseListItemProps = {
  exercise: Exercise;
};

export function ExerciseListItem({ exercise }: ExerciseListItemProps) {
  return (
    <View className="flex-row items-center gap-3 rounded-xl border border-border bg-card p-4">
      <Avatar alt={exercise.name} className="size-10">
        <AvatarFallback className="bg-secondary">
          <Icon as={DumbbellIcon} className="text-primary" size={20} />
        </AvatarFallback>
      </Avatar>
      <Text className="font-bold">{exercise.name}</Text>
    </View>
  );
}
