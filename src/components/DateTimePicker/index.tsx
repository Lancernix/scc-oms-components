import { DatePicker as AntdDatePicker, TimePicker as AntdTimePicker } from 'antd';
import type { DatePickerProps as AntdDatePickerProps, TimePickerProps as AntdTimePickerProps } from 'antd';
import type { Moment } from 'moment';
import React, { useMemo } from 'react';
import { momentToValue, valueToMoment } from 'utils/momentTransform';

export type DatePickerProps = Omit<AntdDatePickerProps, 'value' | 'onChange' | 'format'> & {
  value?: string | Moment | number;
  /**
   * value类型，如选择string则form收集到的值为string类型
   * @default 'string';
   */
  valueType?: 'string' | 'secondTimestamp' | 'timestamp' | 'moment';
  onChange?: (value: string | number | Moment) => void;
  /**
   * 日期字符串格式化模版
   * @default 'YYYY-MM-DD HH:mm:ss'
   */
  format?: string;
  /**
   * 当设定了 showTime 的时候，面板是否显示“此刻”按钮
   */
  showNow?: boolean;
  /**
   * 是否展示“今天”按钮
   * @default true
   */
  showToday?: boolean;
  /**
   * 增加时间选择功能
   */
  showTime?: boolean | Record<string, unknown>;
};

/** 日期组件 */
export function DatePicker(props: DatePickerProps) {
  const {
    value,
    onChange,
    valueType = 'string',
    format = 'YYYY-MM-DD HH:mm:ss',
    showToday = true,
    picker,
    ...rest
  } = props;

  // 转换成antd需要的moment对象
  const momentValue = useMemo(() => valueToMoment(value, format), [format, value]);

  const handleChange: AntdDatePickerProps['onChange'] = val => {
    const newVal = momentToValue(val, valueType, format);
    onChange?.(newVal);
  };

  return (
    <AntdDatePicker
      value={momentValue}
      onChange={handleChange}
      format={format}
      picker={picker}
      showToday={showToday}
      {...rest}
    />
  );
}

export type TimePickerProps = Omit<AntdTimePickerProps, 'value' | 'onChange' | 'format'> & {
  value?: string | Moment | number;
  /** value类型，如选择string则form收集到的值为string类型，默认为string */
  valueType?: 'string' | 'moment';
  onChange?: (value: string | Moment) => void;
  /** 时间字符串格式化模版，默认为HH:mm:ss */
  format?: string;
};

/** 时间组件 */
export function TimePicker(props: TimePickerProps) {
  const { value, onChange, valueType = 'string', format = 'HH:mm:ss', ...rest } = props;

  const momentValue = useMemo(() => valueToMoment(value, format), [format, value]);

  const handleChange: AntdTimePickerProps['onChange'] = val => {
    const newVal = momentToValue(val, valueType, format);
    onChange?.(newVal as string | Moment);
  };

  return <AntdTimePicker value={momentValue} onChange={handleChange} format={format} {...rest} />;
}
