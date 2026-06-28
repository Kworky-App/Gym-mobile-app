declare module '@react-native-community/datetimepicker' {
  import type { FC } from 'react';
  import type { ViewProps } from 'react-native';

  export type DateTimePickerEvent = {
    type: 'set' | 'neutralButtonPressed' | 'dismissed';
    nativeEvent: {
      timestamp: number;
      utcOffset: number;
    };
  };

  export type DateTimePickerProps = ViewProps & {
    value: Date;
    mode?: 'date' | 'time' | 'datetime' | 'countdown';
    display?: 'default' | 'spinner' | 'compact' | 'inline' | 'clock' | 'calendar';
    maximumDate?: Date;
    minimumDate?: Date;
    locale?: string;
    onChange?: (event: DateTimePickerEvent, date?: Date) => void;
  };

  const DateTimePicker: FC<DateTimePickerProps>;
  export default DateTimePicker;
}
