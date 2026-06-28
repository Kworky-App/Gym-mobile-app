import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useState } from 'react';
import { Platform, Pressable, View } from 'react-native';
import { FormFieldError } from '@/components/form/field-error';
import { FormTextField } from '@/components/form/text-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import {
  formatDateDisplay,
  formatDateISO,
  parseLocalDateString,
} from '@/lib/date';

const DEFAULT_BIRTH_DATE = new Date(2000, 0, 1);

function parseDate(value: string): Date {
  return parseLocalDateString(value) ?? DEFAULT_BIRTH_DATE;
}

type FormDateFieldProps = {
  field: AnyFieldApi;
  label: string;
  placeholder?: string;
  maximumDate?: Date;
  minimumDate?: Date;
};

function NativeFormDateField({
  field,
  label,
  placeholder = 'Sélectionner une date',
  maximumDate = new Date(),
  minimumDate = new Date(1900, 0, 1),
}: FormDateFieldProps) {
  const [showPicker, setShowPicker] = useState(false);
  const selectedDate = parseDate(field.state.value);
  const displayValue = formatDateDisplay(field.state.value);

  const handleChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }

    if (!date) return;

    field.handleChange(formatDateISO(date));
    field.handleBlur();
  };

  return (
    <View className="gap-1.5">
      <Label nativeID={field.name}>{label}</Label>

      <Pressable
        onPress={() => {
          setShowPicker(true);
          field.handleBlur();
        }}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        <View pointerEvents="none">
          <Input
            nativeID={field.name}
            editable={false}
            placeholder={placeholder}
            value={displayValue}
          />
        </View>
      </Pressable>

      {showPicker ? (
        Platform.OS === 'ios' ? (
          <View className="gap-2">
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="spinner"
              maximumDate={maximumDate}
              minimumDate={minimumDate}
              locale="fr-FR"
              onChange={handleChange}
            />
            <Button variant="outline" onPress={() => setShowPicker(false)}>
              <Text>Valider</Text>
            </Button>
          </View>
        ) : (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            onChange={handleChange}
          />
        )
      ) : null}

      <FormFieldError field={field} />
    </View>
  );
}

function FormDateField(props: FormDateFieldProps) {
  if (Platform.OS === 'web') {
    return (
      <FormTextField
        field={props.field}
        label={props.label}
        placeholder={props.placeholder}
        autoComplete="birthdate-full"
      />
    );
  }

  return <NativeFormDateField {...props} />;
}

export { FormDateField };
