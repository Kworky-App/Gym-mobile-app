import { ClipboardListIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import type { Plan } from '@/features/views/usePlansStore';

type PlanListItemProps = {
  plan: Plan;
  onPress?: () => void;
};

export function PlanListItem({ plan, onPress }: PlanListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      role="button"
      className="flex-row items-center gap-3 rounded-xl border border-border bg-card p-4 active:bg-accent"
    >
      <Avatar alt={plan.name} className="size-10">
        <AvatarFallback className="bg-secondary">
          <Icon as={ClipboardListIcon} className="text-primary" size={20} />
        </AvatarFallback>
      </Avatar>
      <View className="flex-1">
        <Text className="font-bold">{plan.name}</Text>
        <Text variant="muted" className="text-sm">
          {plan.exercises.length} exercice
          {plan.exercises.length > 1 ? 's' : ''} -{' '}
          {plan.createdAt.toLocaleDateString('fr-FR')}
        </Text>
      </View>
    </Pressable>
  );
}
