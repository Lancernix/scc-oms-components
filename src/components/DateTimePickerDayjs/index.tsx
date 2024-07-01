import type { Dayjs } from 'dayjs';
import React, { useMemo } from 'react';
import { dayjsToValue, valueToDayjs } from 'utils/dayjsTransform';
import getTimeZone from 'utils/getTimeZone';
import AntdDatePicker from './DatePicker';
import AntdTimePicker from './TimerPicker';

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
   * @default 'YYYY-MM-DD HH:mm:ss'
   */
  format?: string;
  /**
   * 时区
   * @default 当前所在时区
   * @description 该属性影响的是从组件获取到的字符串格式的值，比如接口需要的是Asia/Shanghai的日期字符串，那可以通过这个属性设置
   */
  timeZone?: string;
  /**
   * 组件展示所在的时区
   * @default 当前所在时区
   * @description 该属性影响的是组件展示，可以通过设置这个属性让日期按照你设置的时区展示而非当前所在的时区
   */
  displayTimeZone?: string;
  /** 当设定了 showTime 的时候，面板是否显示“此刻”按钮 */
  showNow?: boolean;
  /**
   * 是否展示“今天”按钮
   * @default true
   */
  showToday?: boolean;
  /** 增加时间选择功能 */
  showTime?: boolean | Record<string, unknown>;
  /**
   * 当只有日期展示时，是否将时间默认为一天的开始00:00:00
   * @default false
   * @description 只有在showTime为false时生效，而且要注意format需要包含时间
   */
  useStartOfDay?: boolean;
  /**
   * 当只有日期展示时，是否将时间默认为一天的结束23:59:59
   * @default false
   * @description 只有在showTime为false时生效，而且要注意format需要包含时间
   */
  useEndOfDay?: boolean;
};

/** 日期组件 */
export function DatePicker(props: DatePickerProps) {
  const {
    value,
    onChange,
    valueType = 'string',
    format = 'YYYY-MM-DD HH:mm:ss',
    timeZone = getTimeZone(),
    displayTimeZone = getTimeZone(),
    showToday = true,
    picker,
    useStartOfDay = false,
    useEndOfDay = false,
    showTime = false,
    ...rest
  } = props;

  // 转换成antd需要的Dayjs对象
  const dayjsValue = useMemo(
    () => valueToDayjs(value, valueType, format, displayTimeZone),
    [format, valueType, value, displayTimeZone],
  );

  const handleChange: AntdDatePickerProps['onChange'] = val => {
    let realVal = val;
    if (!showTime && (useStartOfDay || useEndOfDay)) {
      realVal = useStartOfDay ? val.startOf('day') : val.endOf('day');
    }
    const newVal = dayjsToValue(realVal, valueType, format, timeZone);
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

export type TimePickerProps = Omit<AntdTimePickerProps, 'value' | 'onChange' | 'format'> & {
  value?: string | Dayjs | number;
  /** value类型，如选择string则form收集到的值为string类型，默认为string */
  valueType?: 'string' | 'dayjs';
  onChange?: (value: string | Dayjs) => void;
  /** 时间字符串格式化模版，默认为HH:mm:ss */
  format?: string;
};

/** 时间组件 */
export function TimePicker(props: TimePickerProps) {
  const { value, onChange, valueType = 'string', format = 'HH:mm:ss', ...rest } = props;

  const dayjsValue = useMemo(() => valueToDayjs(value, valueType, format), [format, valueType, value]);

  const handleChange: AntdTimePickerProps['onChange'] = val => {
    const newVal = dayjsToValue(val, valueType, format);
    onChange?.(newVal as string | Dayjs);
  };

  return <AntdTimePicker value={dayjsValue} onChange={handleChange} format={format} {...rest} />;
}
