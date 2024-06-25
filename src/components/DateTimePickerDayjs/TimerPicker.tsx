import type { PickerTimeProps, RangePickerTimeProps } from 'antd/es/date-picker/generatePicker';
import type { Dayjs } from 'dayjs';
import React, { forwardRef } from 'react';
import DatePicker from './DatePicker';

const { RangePicker } = DatePicker;

interface InnerTimeRangePickerProps extends Omit<RangePickerTimeProps<Dayjs>, 'picker'> {
  popupClassName?: string;
}

const TimeRangePicker = (props: InnerTimeRangePickerProps) => <RangePicker {...props} picker="time" />;

// biome-ignore lint/suspicious/noExplicitAny: 官方抄过来的
interface InnerTimePickerProps extends Omit<PickerTimeProps<Dayjs>, 'picker'>, React.RefAttributes<any> {}

const InnerTimePicker = (props: InnerTimePickerProps) => {
  return <DatePicker {...props} picker="time" mode={undefined} />;
};

InnerTimePicker.RangePicker = TimeRangePicker;
InnerTimePicker.displayName = 'TimePicker';

const TimePicker = Object.assign(
  // biome-ignore lint/suspicious/noExplicitAny: 官方给的any，不改了
  forwardRef<any, InnerTimePickerProps>((props, ref) => {
    return <InnerTimePicker {...props} ref={ref} />;
  }),
  {
    RangePicker: InnerTimePicker.RangePicker,
    displayName: InnerTimePicker.displayName,
  },
);

export default TimePicker;
export type TimeRangePickerProps = InnerTimeRangePickerProps;
