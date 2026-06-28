import type { AnyFieldApi } from '@tanstack/react-form';
import { Text } from '@/components/ui/text';

function FormFieldError({ field }: { field: AnyFieldApi }) {
  const showError =
    field.state.meta.errors.length > 0 &&
    (field.state.meta.isTouched || field.form.state.submissionAttempts > 0);

  if (!showError) return null;

  return (
    <Text className="text-destructive text-sm">
      {field.state.meta.errors[0]?.message}
    </Text>
  );
}

export { FormFieldError };
