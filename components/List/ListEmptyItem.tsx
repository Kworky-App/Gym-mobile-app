import { PlusIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

type ListEmptyItemProps = {
  message: string;
  onAdd?: () => void;
  className?: string;
};

function ListEmptyItem({ message, onAdd, className }: ListEmptyItemProps) {
  return (
    <View
      className={cn(
        'items-center gap-3 rounded-xl border border-border border-dashed p-6',
        className,
      )}
    >
      <Text variant="muted" className="text-center">
        {message}
      </Text>
      {onAdd ? (
        <Pressable
          onPress={onAdd}
          role="button"
          accessibilityLabel="Ajouter"
          className="size-10 items-center justify-center rounded-full bg-primary active:bg-primary/90"
        >
          <Icon as={PlusIcon} className="text-primary-foreground" size={20} />
        </Pressable>
      ) : null}
    </View>
  );
}

export type { ListEmptyItemProps };
export { ListEmptyItem };
