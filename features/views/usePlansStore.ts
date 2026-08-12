import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export type Exercise = {
  id: string;
  name: string;
};

export type Plan = {
  id: string;
  name: string;
  exercises: Exercise[];
  createdAt: Date;
};

const PLANS_QUERY_KEY = ['plans'] as const;

function usePlansQuery() {
  return useQuery({
    queryKey: PLANS_QUERY_KEY,
    queryFn: () => [] as Plan[],
    initialData: [] as Plan[],
    staleTime: Infinity,
  }).data;
}

export function usePlan(planId: string) {
  const plans = usePlansQuery();
  return plans.find((plan) => plan.id === planId) ?? null;
}

export function usePlansStore() {
  const plans = usePlansQuery();
  const queryClient = useQueryClient();
  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false);
  const [planName, setPlanName] = useState('');

  const openAddPlan = () => setIsAddPlanOpen(true);

  const closeAddPlan = () => {
    setIsAddPlanOpen(false);
    setPlanName('');
  };

  const createPlan = () => {
    const name = planName.trim();
    if (!name) return;

    // TODO: brancher la création de plan une fois l'API disponible.
    queryClient.setQueryData<Plan[]>(PLANS_QUERY_KEY, (prev = []) => [
      ...prev,
      { id: Date.now().toString(), name, exercises: [], createdAt: new Date() },
    ]);
    closeAddPlan();
  };

  return {
    plans,
    isAddPlanOpen,
    planName,
    setPlanName,
    openAddPlan,
    closeAddPlan,
    createPlan,
  };
}

export function usePlanExercisesStore(planId: string) {
  const plan = usePlan(planId);
  const queryClient = useQueryClient();
  const [isAddExerciseOpen, setIsAddExerciseOpen] = useState(false);
  const [exerciseName, setExerciseName] = useState('');

  const openAddExercise = () => setIsAddExerciseOpen(true);

  const closeAddExercise = () => {
    setIsAddExerciseOpen(false);
    setExerciseName('');
  };

  const createExercise = () => {
    const name = exerciseName.trim();
    if (!name || !plan) return;

    // TODO: brancher la création d'exercice une fois l'API disponible.
    queryClient.setQueryData<Plan[]>(PLANS_QUERY_KEY, (prev = []) =>
      prev.map((p) =>
        p.id === plan.id
          ? {
              ...p,
              exercises: [...p.exercises, { id: Date.now().toString(), name }],
            }
          : p,
      ),
    );
    closeAddExercise();
  };

  return {
    plan,
    exercises: plan?.exercises ?? [],
    isAddExerciseOpen,
    exerciseName,
    setExerciseName,
    openAddExercise,
    closeAddExercise,
    createExercise,
  };
}
