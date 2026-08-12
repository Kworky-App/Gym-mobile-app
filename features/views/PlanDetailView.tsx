import { PlusIcon } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { List } from '@/components/List/List';
import { NameInputDialog } from '@/components/NameInputDialog';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { ExerciseListItem } from '@/features/views/components/ExerciseListItem';
import { usePlanExercisesStore } from '@/features/views/usePlansStore';

type PlanDetailViewProps = {
  planId: string;
};

export const PlanDetailView = ({ planId }: PlanDetailViewProps) => {
  const {
    plan,
    exercises,
    isAddExerciseOpen,
    exerciseName,
    setExerciseName,
    openAddExercise,
    closeAddExercise,
    createExercise,
  } = usePlanExercisesStore(planId);

  if (!plan) {
    return (
      <View className="flex-1 items-center justify-center p-6">
        <Text variant="muted">Plan introuvable.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <View className="w-full gap-4">
        <View className="w-full gap-2">
          <View className="flex-row items-center justify-between">
            <Text variant="h4">{plan.name}</Text>
            <Button
              variant="ghost"
              size="icon"
              onPress={openAddExercise}
              accessibilityLabel="Ajouter un exercice"
            >
              <Icon as={PlusIcon} size={20} />
            </Button>
          </View>
          <List
            data={exercises}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ExerciseListItem exercise={item} />}
            emptyMessage="Veuillez ajouter un exercice"
            onAddEmpty={openAddExercise}
            scrollEnabled={false}
          />
        </View>
      </View>

      <NameInputDialog
        open={isAddExerciseOpen}
        onOpenChange={(open) => (open ? openAddExercise() : closeAddExercise())}
        title="Nom de l'exercice"
        placeholder="Ex: Développé couché"
        value={exerciseName}
        onChangeValue={setExerciseName}
        onSubmit={createExercise}
      />
    </ScrollView>
  );
};
