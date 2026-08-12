import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from 'expo-router/unstable-native-tabs';
import { useColorScheme } from 'nativewind';
import { THEME } from '@/lib/theme';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const scheme = colorScheme ?? 'light';
  const colors = THEME[scheme];

  return (
    <NativeTabs
      blurEffect={
        scheme === 'dark' ? 'systemMaterialDark' : 'systemMaterialLight'
      }
      disableTransparentOnScrollEdge
      tintColor={colors.primary}
      iconColor={{
        default: colors.mutedForeground,
        selected: colors.primary,
      }}
      labelStyle={{
        default: {
          color: colors.mutedForeground,
          fontSize: 11,
          fontWeight: '600',
        },
        selected: { color: colors.primary, fontSize: 11, fontWeight: '600' },
      }}
    >
      <NativeTabs.Trigger name="home">
        <Label>Accueil</Label>
        <Icon
          sf={{ default: 'house', selected: 'house.fill' }}
          androidSrc={
            <VectorIcon family={MaterialCommunityIcons} name="home" />
          }
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="profile">
        <Label>Profil</Label>
        <Icon
          sf={{ default: 'person', selected: 'person.fill' }}
          androidSrc={
            <VectorIcon family={MaterialCommunityIcons} name="account" />
          }
        />
      </NativeTabs.Trigger>
    </NativeTabs >
  );
}
