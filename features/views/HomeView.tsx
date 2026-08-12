import { router } from 'expo-router';
import { PlusIcon } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { List } from '@/components/List/List';
import { NameInputDialog } from '@/components/NameInputDialog';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { PlanListItem } from '@/features/views/components/PlanListItem';
import { usePlansStore } from '@/features/views/usePlansStore';

export const HomeView = () => {
  const {
    plans,
    isAddPlanOpen,
    planName,
    setPlanName,
    openAddPlan,
    closeAddPlan,
    createPlan,
  } = usePlansStore();

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
            <Text variant="h4">Mon plan</Text>
            <Button
              variant="ghost"
              size="icon"
              onPress={openAddPlan}
              accessibilityLabel="Ajouter un plan"
            >
              <Icon as={PlusIcon} size={20} />
            </Button>
          </View>
          <List
            data={plans}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <PlanListItem
                plan={item}
                onPress={() => router.push(`/home/${item.id}`)}
              />
            )}
            emptyMessage="Veuillez ajouter un plan"
            onAddEmpty={openAddPlan}
            scrollEnabled={false}
          />
        </View>
      </View>

      <NameInputDialog
        open={isAddPlanOpen}
        onOpenChange={(open) => (open ? openAddPlan() : closeAddPlan())}
        title="Nom du plan"
        placeholder="Ex: Prise de masse"
        value={planName}
        onChangeValue={setPlanName}
        onSubmit={createPlan}
      />
    </ScrollView>
  );
};
