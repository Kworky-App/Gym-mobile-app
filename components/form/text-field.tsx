import type { AnyFieldApi } from '@tanstack/react-form';
import { type TextInputProps, View } from 'react-native';
import { FormFieldError } from '@/components/form/field-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type FormTextFieldProps = {
  field: AnyFieldApi;
  label: string;
  placeholder?: string;
} & Pick<
  TextInputProps,
  'autoCapitalize' | 'autoComplete' | 'keyboardType' | 'secureTextEntry'
>;

function FormTextField({
  field,
  label,
  placeholder,
  ...inputProps
}: FormTextFieldProps) {
  return (
    <View className="gap-1.5">
      <Label nativeID={field.name}>{label}</Label>
      <Input
        nativeID={field.name}
        placeholder={placeholder}
        value={field.state.value}
        onChangeText={field.handleChange}
        onBlur={field.handleBlur}
        {...inputProps}
      />
      <FormFieldError field={field} />
    </View>
  );
}

export { FormTextField };
