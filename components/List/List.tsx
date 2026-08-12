import { FlatList, type FlatListProps } from 'react-native';
import { ListEmptyItem } from '@/components/List/ListEmptyItem';
import { cn } from '@/lib/utils';

type ListProps<T> = Omit<FlatListProps<T>, 'ListEmptyComponent'> & {
  emptyMessage: string;
  onAddEmpty?: () => void;
};

function List<T>({
  emptyMessage,
  onAddEmpty,
  contentContainerClassName,
  ...props
}: ListProps<T>) {
  return (
    <FlatList
      {...props}
      contentContainerClassName={cn(
        props.data?.length ? 'gap-3' : 'flex-1 justify-center',
        contentContainerClassName,
      )}
      ListEmptyComponent={
        <ListEmptyItem message={emptyMessage} onAdd={onAddEmpty} />
      }
    />
  );
}

export type { ListProps };
export { List };
