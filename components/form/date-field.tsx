import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useState } from 'react';
import { Modal, Platform, Pressable, View } from 'react-native';
import { FormFieldError } from '@/components/form/field-error';
import { FormTextField } from '@/components/form/text-field';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import {
  formatDateDisplay,
  formatDateISO,
  parseLocalDateString,
} from '@/lib/date';
import { cn } from '@/lib/utils';

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

type DateTriggerProps = {
  labelId: string;
  value: string;
  placeholder: string;
  onPress: () => void;
};

function DateTrigger({
  labelId,
  value,
  placeholder,
  onPress,
}: DateTriggerProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      aria-labelledby={labelId}
      className="dark:bg-input/30 border-input bg-background h-10 w-full justify-center rounded-md border px-3 shadow-sm shadow-black/5"
    >
      <Text
        className={cn(
          'text-base',
          value ? 'text-foreground' : 'text-muted-foreground/50',
        )}
      >
        {value || placeholder}
      </Text>
    </Pressable>
  );
}

function NativeFormDateField({
  field,
  label,
  placeholder = 'Sélectionner une date',
  maximumDate = new Date(),
  minimumDate = new Date(1900, 0, 1),
}: FormDateFieldProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [pickerDate, setPickerDate] = useState(() =>
    parseDate(field.state.value),
  );
  const labelId = `${field.name}-label`;
  const displayValue = formatDateDisplay(field.state.value);

  const openPicker = () => {
    setPickerDate(parseDate(field.state.value));
    setShowPicker(true);
  };

  const closePicker = () => {
    setShowPicker(false);
    field.handleBlur();
  };

  const handleAndroidChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowPicker(false);

    if (event.type === 'dismissed' || !date) {
      field.handleBlur();
      return;
    }

    field.handleChange(formatDateISO(date));
    field.handleBlur();
  };

  const handleIosChange = (_event: DateTimePickerEvent, date?: Date) => {
    if (date) setPickerDate(date);
  };

  const confirmIosDate = () => {
    field.handleChange(formatDateISO(pickerDate));
    closePicker();
  };

  return (
    <View className="gap-1.5">
      <Label nativeID={labelId}>{label}</Label>

      <DateTrigger
        labelId={labelId}
        value={displayValue}
        placeholder={placeholder}
        onPress={openPicker}
      />

      {showPicker && Platform.OS === 'ios' ? (
        <Modal
          visible
          transparent
          animationType="slide"
          onRequestClose={closePicker}
        >
          <View className="flex-1 justify-end bg-black/40">
            <Pressable className="flex-1" onPress={closePicker} />
            <View className="bg-background gap-4 rounded-t-2xl p-4 pb-8">
              <DateTimePicker
                value={pickerDate}
                mode="date"
                display="spinner"
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                locale="fr-FR"
                onChange={handleIosChange}
              />
              <Button onPress={confirmIosDate}>
                <Text>Valider</Text>
              </Button>
            </View>
          </View>
        </Modal>
      ) : showPicker ? (
        <DateTimePicker
          value={pickerDate}
          mode="date"
          display="default"
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          onChange={handleAndroidChange}
        />
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
