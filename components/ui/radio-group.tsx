import * as RadioGroupPrimitive from '@rn-primitives/radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import { Platform } from 'react-native';
import { cn } from '@/lib/utils';

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root className={cn('gap-3', className)} {...props} />
  );
}

const radioGroupItemVariants = cva(
  cn(
    'border-input dark:bg-input/30 aspect-square shrink-0 items-center justify-center rounded-full border shadow-sm shadow-black/5',
    Platform.select({
      web: 'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive outline-none transition-all focus-visible:ring-[3px] disabled:cursor-not-allowed',
    }),
  ),
  {
    variants: {
      size: {
        default: 'size-4',
        lg: 'size-6',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

const radioGroupIndicatorVariants = cva('bg-primary rounded-full', {
  variants: {
    size: {
      default: 'size-2',
      lg: 'size-3',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

function RadioGroupItem({
  className,
  size,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> &
  VariantProps<typeof radioGroupItemVariants>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        radioGroupItemVariants({ size }),
        props.disabled && 'opacity-50',
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        className={radioGroupIndicatorVariants({ size })}
      />
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
