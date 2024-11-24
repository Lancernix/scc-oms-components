import type { Dayjs } from 'dayjs';
import type { SharedTimeProps } from 'rc-picker/es/panels/TimePanel';
import React, { useEffect, useRef, useState } from 'react';
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
  /**
   * onChange回调
   * @param value
   * @param dayjsValue 这个值可以直接获取组件当前使用的dayjs对象，有些时候可能需要
   * @returns
   */
  onChange?: (value: string | number | Dayjs, dayjsValue?: Dayjs) => void;
  /**
   * 日期字符串格式化模版
   * @default 'YYYY-MM-DD'
   */
  format?: string;
  /**
   * 目标转换时区
   * @default 当前所在时区
   * @description 该属性影响的是从组件获取到的字符串格式的值，比如接口需要的是Asia/Shanghai的日期字符串，那可以通过这个属性设置
   */
  targetTimeZone?: string;
  /**
   * value来源时区
   * @default 当前所在时区
   * @description 该属性影响的是value转换成dayjs对象时使用的时区，比如接口返回的是Asia/Shanghai的日期字符串，那可以通过这个属性设置
   */
  sourceTimeZone?: string;
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
  showTime?: boolean | SharedTimeProps<Dayjs>;
  /**
   * 当只有日期展示时，是否将时间默认为一天的开始00:00:00
   * @default false
   * @description 只有在showTime为false时生效，且此时需要注意你的format格式
   */
  useStartOfDay?: boolean;
  /**
   * 当只有日期展示时，是否将时间默认为一天的结束23:59:59
   * @default false
   * @description 只有在showTime为false时生效，且此时需要注意你的format格式
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
    targetTimeZone = getTimeZone(),
    sourceTimeZone = getTimeZone(),
    showToday = true,
    picker,
    useStartOfDay = false,
    useEndOfDay = false,
    showTime = false,
    ...rest
  } = props;

  // 用来标识value的变动是否来自于组件内部
  const internalChange = useRef(false);
  // 组件用到的dayjs值
  const [dayjsValue, setDayjsValue] = useState<Dayjs>(null);

  // 监听外部的变动（比如form.setFieldValue这种操作），同步修改内部的dayjsValue
  useEffect(() => {
    if (internalChange.current) {
      // 如果是来自于组件内部的修改，dayjsVal已经和外部的value同步，无需再处理，直接跳过
      // 重置标识，让effect的逻辑能够在需要的时候执行
      internalChange.current = false;
      return;
    }
    setDayjsValue(valueToDayjs(value, valueType, format, sourceTimeZone));
  }, [value, valueType, format, sourceTimeZone]);

  const handleChange: AntdDatePickerProps['onChange'] = val => {
    internalChange.current = true; // 修改标识，告知是内部的修改
    let realVal = val;
    let realFormat = format;
    if (!showTime && (useStartOfDay || useEndOfDay)) {
      realVal = useStartOfDay ? val?.startOf('day') : val?.endOf('day');
      realFormat = 'YYYY-MM-DD HH:mm:ss';
    }
    // 存一下用在组件中的值
    setDayjsValue(realVal);
    // 将值处理一下，抛出去
    const newVal = dayjsToValue(realVal, valueType, realFormat, targetTimeZone);
    onChange?.(newVal, realVal);
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
  valueType?: 'string' | 'dayjs' | 'secondTimestamp' | 'timestamp';
  onChange?: (value: string | Dayjs | number, dayjsValue: Dayjs) => void;
  /**
   * 时间字符串格式化模版
   * @default 'HH:mm:ss'
   */
  format?: string;
  /**
   * 目标转换时区
   * @default 当前所在时区
   * @description 该属性影响的是从组件获取到的字符串格式的值，比如接口需要的是Asia/Shanghai的日期字符串，那可以通过这个属性设置
   */
  targetTimeZone?: string;
  /**
   * value来源时区
   * @default 当前所在时区
   * @description 该属性影响的是value转换成dayjs对象时使用的时区，比如接口返回的是Asia/Shanghai的日期字符串，那可以通过这个属性设置
   */
  sourceTimeZone?: string;
};

/** 时间组件 */
function InnerTimePicker(props: TimePickerProps) {
  const {
    value,
    onChange,
    valueType = 'string',
    format = 'HH:mm:ss',
    targetTimeZone = getTimeZone(),
    sourceTimeZone = getTimeZone(),
    ...rest
  } = props;

  // 用来标识value的变动是否来自于组件内部
  const internalChange = useRef(false);
  // 组件用到的dayjs值
  const [dayjsValue, setDayjsValue] = useState<Dayjs>(null);

  // 监听外部的变动（比如form.setFieldValue这种操作），同步修改内部的dayjsValue
  useEffect(() => {
    if (internalChange.current) {
      // 如果是来自于组件内部的修改，dayjsVal已经和外部的value同步，无需再处理，直接跳过
      // 重置标识，让effect的逻辑能够在需要的时候执行
      internalChange.current = false;
      return;
    }
    setDayjsValue(valueToDayjs(value, valueType, format, sourceTimeZone));
  }, [value, valueType, format, sourceTimeZone]);

  const handleChange: AntdTimePickerProps['onChange'] = val => {
    internalChange.current = true; // 修改标识，告知是内部的修改
    // 存一下用在组件中的值
    setDayjsValue(val);
    // 将值处理一下，抛出去
    const newVal = dayjsToValue(val, valueType, format, targetTimeZone);
    onChange?.(newVal, val);
  };

  return <AntdTimePicker value={dayjsValue} onChange={handleChange} format={format} {...rest} />;
}
// 补上RangePicker
export const TimePicker = Object.assign(InnerTimePicker, {
  RangePicker: AntdTimePicker.RangePicker,
});
export type TimeRangePickerProps = InnerTimeRangePickerProps;

// 这里也将使用dayjs替换moment之后的组件抛出去，万一在某些时候封装的组件确实不适用，就可以使用原生的
export { AntdDatePicker, AntdTimePicker, type AntdDatePickerProps, type AntdTimePickerProps };
