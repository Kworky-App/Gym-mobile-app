import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';

type NameInputDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  placeholder?: string;
  submitLabel?: string;
  value: string;
  onChangeValue: (value: string) => void;
  onSubmit: () => void;
};

export function NameInputDialog({
  open,
  onOpenChange,
  title,
  placeholder,
  submitLabel = 'Créer',
  value,
  onChangeValue,
  onSubmit,
}: NameInputDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full rounded-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Input
          value={value}
          onChangeText={onChangeValue}
          placeholder={placeholder}
          autoFocus
        />
        <DialogFooter>
          <Button onPress={onSubmit} disabled={!value.trim()}>
            <Text>{submitLabel}</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
