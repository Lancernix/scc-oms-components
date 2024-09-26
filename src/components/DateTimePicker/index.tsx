import { DatePicker as AntdDatePicker, TimePicker as AntdTimePicker } from 'antd';
import type { DatePickerProps as AntdDatePickerProps, TimePickerProps as AntdTimePickerProps } from 'antd';
import type { Moment } from 'moment';
import React, { useMemo } from 'react';
import getTimeZone from 'utils/getTimeZone';
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
   * @default 'YYYY-MM-DD'
   */
  format?: string;
  /**
   * 时区
   * @default 当前所在时区
   * @description 该属性影响的是从组件获取到的字符串格式的值，比如接口需要的是Asia/Shanghai的日期字符串，那可以通过这个属性设置
   */
  timeZone?: string;
  /**
   * value来源时区
   * @default 当前所在时区
   * @description 该属性影响的是value转换成moment对象时使用的时区，比如接口返回的是Asia/Shanghai的日期字符串，那可以通过这个属性设置
   */
  originTimeZone?: string;
  /** 当设定了 showTime 的时候，面板是否显示“此刻”按钮 */
  showNow?: boolean;
  /**
   * 是否展示“今天”按钮
   * @default true
   */
  showToday?: boolean;
  /**
   * 增加时间选择功能
   * @default false
   */
  showTime?: boolean | Record<string, unknown>;
  /**
   * 当只有日期展示时，是否将时间默认为一天的开始00:00:00
   * @default false
   * @description 只有在showTime为false时生效
   */
  useStartOfDay?: boolean;
  /**
   * 当只有日期展示时，是否将时间默认为一天的结束23:59:59
   * @default false
   * @description 只有在showTime为false时生效
   */
  useEndOfDay?: boolean;
};

/** 日期组件 */
export function DatePicker(props: DatePickerProps) {
  const {
    value,
    onChange,
    valueType = 'string',
    format = 'YYYY-MM-DD',
    timeZone = getTimeZone(),
    originTimeZone = getTimeZone(),
    showToday = true,
    picker,
    useStartOfDay = false,
    useEndOfDay = false,
    showTime = false,
    ...rest
  } = props;

  // 转换成antd需要的moment对象
  const momentValue = useMemo(
    () => valueToMoment(value, valueType, format, originTimeZone),
    [format, valueType, value, originTimeZone],
  );

  const handleChange: AntdDatePickerProps['onChange'] = val => {
    let realVal = val;
    let realFormat = format;
    if (!showTime && (useStartOfDay || useEndOfDay)) {
      realVal = useStartOfDay ? val?.startOf('day') : val?.endOf('day');
      realFormat = 'YYYY-MM-DD HH:mm:ss';
    }
    const newVal = momentToValue(realVal, valueType, realFormat, timeZone);
    onChange?.(newVal);
  };

  return (
    <AntdDatePicker
      value={momentValue}
      onChange={handleChange}
      format={format}
      picker={picker}
      showToday={showToday}
      showTime={showTime}
      {...rest}
    />
  );
}

export type TimePickerProps = Omit<AntdTimePickerProps, 'value' | 'onChange' | 'format'> & {
  value?: string | Moment | number;
  /**
   * value类型，如选择string则form收集到的值为string类型
   * @default 'string'
   */
  valueType?: 'string' | 'moment';
  onChange?: (value: string | Moment) => void;
  /**
   * 时间字符串格式化模版
   * @default 'HH:mm:ss'
   */
  format?: string;
};

/** 时间组件 */
export function TimePicker(props: TimePickerProps) {
  const { value, onChange, valueType = 'string', format = 'HH:mm:ss', ...rest } = props;

  const momentValue = useMemo(() => valueToMoment(value, valueType, format), [format, valueType, value]);

  const handleChange: AntdTimePickerProps['onChange'] = val => {
    const newVal = momentToValue(val, valueType, format);
    onChange?.(newVal as string | Moment);
  };

  return <AntdTimePicker value={momentValue} onChange={handleChange} format={format} {...rest} />;
}
