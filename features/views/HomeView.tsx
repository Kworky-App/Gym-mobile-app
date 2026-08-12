import { Link } from 'expo-router';
import {
  ClipboardListIcon,
  DumbbellIcon,
  HistoryIcon,
  type LucideIcon,
  TimerIcon,
  TrendingUpIcon,
} from 'lucide-react-native';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/ui/text';

const FEATURES: {
  key: string;
  label: string;
  icon: LucideIcon;
  route: '/workouts' | '/profile';
}[] = [
  {
    key: '1',
    label: 'Suivi des entraînements',
    icon: DumbbellIcon,
    route: '/workouts',
  },
  {
    key: '2',
    label: 'Programmes personnalisés',
    icon: ClipboardListIcon,
    route: '/workouts',
  },
  {
    key: '3',
    label: 'Statistiques de progression',
    icon: TrendingUpIcon,
    route: '/profile',
  },
  { key: '4', label: 'Timer de repos', icon: TimerIcon, route: '/workouts' },
  {
    key: '5',
    label: 'Historique des séances',
    icon: HistoryIcon,
    route: '/workouts',
  },
];

export default function HomeScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <View className="w-full gap-4">
        <View className="items-center gap-2">
          <View className="mb-2 size-[76px] items-center justify-center rounded-2xl bg-primary/15">
            <Icon as={DumbbellIcon} className="text-primary" size={44} />
          </View>
          <Text variant="h1" className="text-center">
            Bienvenu au Gym-Kworky
          </Text>
          <Text variant="muted" className="text-center">
            Profitez des fonctionnalités suivantes :
          </Text>
        </View>
        <Separator />
        <View className="gap-2">
          {FEATURES.map((feature) => (
            <Link key={feature.key} href={feature.route} asChild>
              <TouchableOpacity activeOpacity={0.7}>
                <View className="flex-row items-center gap-3 rounded-xl bg-muted/60 p-3">
                  <View className="rounded-full bg-secondary p-2.5">
                    <Icon
                      as={feature.icon}
                      className="text-primary"
                      size={20}
                    />
                  </View>
                  <Text>{feature.label}</Text>
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
