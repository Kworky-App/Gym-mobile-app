import { useForm } from '@tanstack/react-form';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, type TextInputProps, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FormDateField } from '@/components/form/date-field';
import { FormFieldError } from '@/components/form/field-error';
import { FormTextField } from '@/components/form/text-field';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Text } from '@/components/ui/text';
import { useRegisterApi } from '@/features/auth/authRegister.api';
import {
  type GenderValue,
  genderByValue,
  type RegisterUserFormValues,
  registerUserFormSchema,
  toRegisterUserRequest,
} from '@/features/auth/auth.schema';
import { ROUTES } from '@/lib/routes';

const defaultValues: RegisterUserFormValues = {
  name: '',
  dateOfBirth: '',
  gender: 0,
  email: '',
  password: '',
};

type TextFieldConfig = {
  type: 'text';
  name: 'name' | 'email' | 'password';
  label: string;
  placeholder: string;
} & Pick<
  TextInputProps,
  'autoCapitalize' | 'autoComplete' | 'keyboardType' | 'secureTextEntry'
>;

type DateFieldConfig = {
  type: 'date';
  name: 'dateOfBirth';
  label: string;
  placeholder: string;
} & Pick<TextInputProps, 'autoComplete'>;

type RegisterFieldConfig =
  | TextFieldConfig
  | DateFieldConfig
  | { type: 'gender' };

const registerFields: RegisterFieldConfig[] = [
  {
    type: 'text',
    name: 'name',
    label: 'Nom',
    placeholder: 'Votre nom',
    autoCapitalize: 'words',
    autoComplete: 'name',
  },
  {
    type: 'date',
    name: 'dateOfBirth',
    label: 'Date de naissance',
    placeholder: 'AAAA-MM-JJ',
    autoComplete: 'birthdate-full',
  },
  { type: 'gender' },
  {
    type: 'text',
    name: 'email',
    label: 'Email',
    placeholder: 'votre@email.com',
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    autoComplete: 'email',
  },
  {
    type: 'text',
    name: 'password',
    label: 'Mot de passe',
    placeholder: 'Au moins 8 caractères',
    secureTextEntry: true,
    autoComplete: 'new-password',
  },
];

export default function AuthRegister() {
  const insets = useSafeAreaInsets();
  const [goHome, setGoHome] = useState(false);
  const { mutate, isPending, error } = useRegisterApi();

  useEffect(() => {
    if (!goHome) return;
    router.replace(ROUTES.home);
  }, [goHome]);

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: registerUserFormSchema,
    },
    onSubmit: ({ value }) => {
      mutate(toRegisterUserRequest(value), {
        onSuccess: () => setGoHome(true),
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
        <Text variant="h3">Créer un compte</Text>
        <Text variant="muted">
          Inscrivez-vous pour suivre vos entraînements.
        </Text>

        {registerFields.map((config) => {
          if (config.type === 'gender') {
            return (
              <form.Field key="gender" name="gender">
                {(field) => (
                  <View className="gap-2">
                    <Label>Genre</Label>
                    <RadioGroup
                      value={String(field.state.value)}
                      onValueChange={(value) =>
                        field.handleChange(Number(value) as GenderValue)
                      }
                    >
                      {([0, 1] as const).map((value) => (
                        <View key={value} className="flex-row items-center gap-3">
                          <RadioGroupItem
                            size="lg"
                            value={String(value)}
                            aria-labelledby={`gender-${value}`}
                          />
                          <Label
                            nativeID={`gender-${value}`}
                            onPress={() => field.handleChange(value)}
                            className="text-base"
                          >
                            {genderByValue[value] === 'Male' ? 'Homme' : 'Femme'}
                          </Label>
                        </View>
                      ))}
                    </RadioGroup>
                    <FormFieldError field={field} />
                  </View>
                )}
              </form.Field>
            );
          }

          if (config.type === 'date') {
            return (
              <form.Field key={config.name} name={config.name}>
                {(field) => (
                  <FormDateField
                    field={field}
                    label={config.label}
                    placeholder={config.placeholder}
                  />
                )}
              </form.Field>
            );
          }

          const { type: _, ...textFieldProps } = config;

          return (
            <form.Field key={config.name} name={config.name}>
              {(field) => <FormTextField field={field} {...textFieldProps} />}
            </form.Field>
          );
        })}

        {error ? (
          <Text className="text-destructive text-sm">{error.message}</Text>
        ) : null}
      </ScrollView>

      <View className="flex-row justify-center pb-8">
        <Text className="text-base text-muted-foreground">
          Vous avez déjà un compte ?{' '}
        </Text>
        <Text
          className="text-base font-semibold text-primary"
          onPress={() => router.push('/(auth)')}
        >
          Se connecter
        </Text>
      </View>


      <View
        className="border-t border-border bg-background px-0 pt-4"
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
      >
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button
              className='rounded-full'
              onPress={form.handleSubmit}
              disabled={isPending || isSubmitting}
            >
              <Text>
                {isPending || isSubmitting
                  ? 'Création du compte...'
                  : "S'inscrire"}
              </Text>
            </Button>
          )}
        </form.Subscribe>
      </View>
    </View>
  );
}
