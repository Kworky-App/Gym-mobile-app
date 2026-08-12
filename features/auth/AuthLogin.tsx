import { useForm } from '@tanstack/react-form';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, type TextInputProps, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FormTextField } from '@/components/form/text-field';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import {
  type LoginUserFormValues,
  loginUserFormSchema,
} from '@/features/auth/auth.schema';
import { useLoginApi } from '@/features/auth/authLogin.api';
import { useAuthStore } from '@/features/auth/useAuthStore';
import { ROUTES } from '@/lib/routes';

const defaultValues: LoginUserFormValues = {
  email: '',
  password: '',
};

type LoginFieldConfig = {
  name: 'email' | 'password';
  label: string;
  placeholder: string;
} & Pick<
  TextInputProps,
  'autoCapitalize' | 'autoComplete' | 'keyboardType' | 'secureTextEntry'
>;

const loginFields: LoginFieldConfig[] = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'votre@email.com',
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    autoComplete: 'email',
  },
  {
    name: 'password',
    label: 'Mot de passe',
    placeholder: 'Votre mot de passe',
    secureTextEntry: true,
    autoComplete: 'current-password',
  },
];

export default function AuthLogin() {
  const insets = useSafeAreaInsets();
  const [goHome, setGoHome] = useState(false);
  const { mutate, isPending, error } = useLoginApi();
  const { signIn } = useAuthStore();

  useEffect(() => {
    if (!goHome) return;
    router.replace(ROUTES.home);
  }, [goHome]);

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: loginUserFormSchema,
    },
    onSubmit: ({ value }) => {
      mutate(value, {
        onSuccess: async (session) => {
          await signIn(session);
          setGoHome(true);
        },
      });
    },
  });

  if (goHome) return null;

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 pt-2"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text variant="h3">Connexion</Text>
        <Text variant="muted">
          Connectez-vous pour suivre vos entraînements.
        </Text>

        {loginFields.map(({ name, ...fieldProps }) => (
          <form.Field key={name} name={name}>
            {(field) => <FormTextField field={field} {...fieldProps} />}
          </form.Field>
        ))}

        {error ? (
          <Text className="text-destructive text-sm">{error.message}</Text>
        ) : null}
      </ScrollView>

      <View className="flex-row justify-center pb-8">
        <Text className="text-base text-muted-foreground">
          Vous n'avez pas de compte ?{' '}
        </Text>
        <Text
          className="text-base font-semibold text-primary"
          onPress={() => router.push('/(auth)/register')}
        >
          S'inscrire
        </Text>
      </View>

      <View
        className="border-t border-border bg-background px-0 pt-4"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button
              className="rounded-full"
              onPress={form.handleSubmit}
              disabled={isPending || isSubmitting}
            >
              <Text>
                {isPending || isSubmitting ? 'Connexion...' : 'Se connecter'}
              </Text>
            </Button>
          )}
        </form.Subscribe>
      </View>
    </View>
  );
}
