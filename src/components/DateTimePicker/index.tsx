import {
  DatePicker as AntdDatePicker,
  DatePickerProps as AntdDatePickerProps,
  TimePicker as AntdTimePicker,
  TimePickerProps as AntdTimePickerProps,
} from 'antd';
import { Moment } from 'moment';
import React, { useMemo } from 'react';
import { momentToValue, valueToMoment } from 'utils/momentTransform';

export type DatePickerProps = Omit<AntdDatePickerProps, 'value' | 'onChange' | 'format'> & {
  value?: string | Moment | number;
  /** @property value类型，如选择string则form收集到的值为string类型，默认为string */
  valueType?: 'string' | 'secondTimestamp' | 'timestamp' | 'moment';
  onChange?: (value: string | number | Moment) => void;
  /**
   * 日期字符串格式化模版
   * @default 'YYYY-MM-DD HH:mm:ss'
   */
  format?: string;
};

/** 日期组件 */
export const DatePicker = (props: DatePickerProps) => {
  const { value, onChange, valueType = 'string', format = 'YYYY-MM-DD HH:mm:ss', picker, ...rest } = props;

  // 转换成antd需要的moment对象
  const momentValue = useMemo(() => valueToMoment(value, format), [value]);

  const handleChange: AntdDatePickerProps['onChange'] = val => {
    const newVal = momentToValue(val, valueType, format);
    onChange?.(newVal);
  };

  return <AntdDatePicker value={momentValue} onChange={handleChange} format={format} picker={picker} {...rest} />;
};

export type TimePickerProps = Omit<AntdTimePickerProps, 'value' | 'onChange' | 'format'> & {
  value?: string | Moment | number;
  /** @property value类型，如选择string则form收集到的值为string类型，默认为string */
  valueType?: 'string' | 'moment';
  onChange?: (value: string | Moment) => void;
  /** @property 时间字符串格式化模版，默认为HH:mm:ss */
  format?: string;
};

/** 时间组件 */
export function TimePicker(props: TimePickerProps) {
  const { value, onChange, valueType = 'string', format = 'HH:mm:ss', ...rest } = props;

  const momentValue = useMemo(() => valueToMoment(value, format), [value]);

  const handleChange: AntdTimePickerProps['onChange'] = val => {
    const newVal = momentToValue(val, valueType, format);
    onChange?.(newVal as string | Moment);
  };

  return <AntdTimePicker value={momentValue} onChange={handleChange} format={format} {...rest} />;
}
