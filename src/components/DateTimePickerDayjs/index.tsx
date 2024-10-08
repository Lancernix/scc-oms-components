import type { Dayjs } from 'dayjs';
import React, { useMemo } from 'react';
import { dayjsToValue, valueToDayjs } from 'utils/dayjsTransform';
import getTimeZone from 'utils/getTimeZone';
import AntdDatePicker, { type InnerDateRangePickerProps } from './DatePicker';
import AntdTimePicker, { type InnerTimeRangePickerProps } from './TimerPicker';

type AntdDatePickerProps = React.ComponentProps<typeof AntdDatePicker>;
type AntdTimePickerProps = React.ComponentProps<typeof AntdTimePicker>;

export type DatePickerProps = Omit<AntdDatePickerProps, 'value' | 'onChange' | 'format'> & {
  value?: string | Dayjs | number;
  /**
   * value类型，如选择string则form收集到的值为string类型
   * @default 'string';
   */
  valueType?: 'string' | 'secondTimestamp' | 'timestamp' | 'dayjs';
  onChange?: (value: string | number | Dayjs) => void;
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
   * @description 该属性影响的是value转换成dayjs对象时使用的时区，比如接口返回的是Asia/Shanghai的日期字符串，那可以通过这个属性设置
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
function InnerDatePicker(props: DatePickerProps) {
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

  // 转换成antd需要的Dayjs对象
  const dayjsValue = useMemo(
    () => valueToDayjs(value, valueType, format, originTimeZone),
    [format, valueType, value, originTimeZone],
  );

  const handleChange: AntdDatePickerProps['onChange'] = val => {
    let realVal = val;
    let realFormat = format;
    if (!showTime && (useStartOfDay || useEndOfDay)) {
      realVal = useStartOfDay ? val?.startOf('day') : val?.endOf('day');
      realFormat = 'YYYY-MM-DD HH:mm:ss';
    }
    const newVal = dayjsToValue(realVal, valueType, realFormat, timeZone);
    onChange?.(newVal);
  };

  return (
    <AntdDatePicker
      value={dayjsValue}
      onChange={handleChange}
      format={format}
      picker={picker}
      showToday={showToday}
      showTime={showTime}
      {...rest}
    />
  );
}
// 补上RangePicker
export const DatePicker = Object.assign(InnerDatePicker, {
  RangePicker: AntdDatePicker.RangePicker,
});
export type DateRangePickerProps = InnerDateRangePickerProps;

export type TimePickerProps = Omit<AntdTimePickerProps, 'value' | 'onChange' | 'format'> & {
  value?: string | Dayjs | number;
  /**
   * value类型，如选择string则form收集到的值为string类型
   * @default 'string'
   */
  valueType?: 'string' | 'dayjs';
  onChange?: (value: string | Dayjs) => void;
  /**
   * 时间字符串格式化模版
   * @default 'HH:mm:ss'
   */
  format?: string;
};

/** 时间组件 */
function InnerTimePicker(props: TimePickerProps) {
  const { value, onChange, valueType = 'string', format = 'HH:mm:ss', ...rest } = props;

  const dayjsValue = useMemo(() => valueToDayjs(value, valueType, format), [format, valueType, value]);

  const handleChange: AntdTimePickerProps['onChange'] = val => {
    const newVal = dayjsToValue(val, valueType, format);
    onChange?.(newVal as string | Dayjs);
  };

  return <AntdTimePicker value={dayjsValue} onChange={handleChange} format={format} {...rest} />;
}
// 补上RangePicker
export const TimePicker = Object.assign(InnerTimePicker, {
  RangePicker: AntdTimePicker.RangePicker,
});
export type TimeRangePickerProps = InnerTimeRangePickerProps;
