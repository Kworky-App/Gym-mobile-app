import { useLocalSearchParams } from 'expo-router';
import { PlanDetailView } from '@/features/views/PlanDetailView';

export default function PlanDetailRoute() {
  const { planId } = useLocalSearchParams<{ planId: string }>();
  return <PlanDetailView planId={planId} />;
}
