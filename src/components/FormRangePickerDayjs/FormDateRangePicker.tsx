import type { FormInstance } from 'antd';
import { Form, Input } from 'antd';
import React, { useRef, useState } from 'react';
import { dayjsToValue } from 'utils/dayjsTransform';
import getTimeZone from 'utils/getTimeZone';
import DatePicker from '../DateTimePickerDayjs/DatePicker';

const { RangePicker } = DatePicker;
type RangePickerProps = React.ComponentProps<typeof RangePicker>;

type Props = {
  /** form实例 */
  form: FormInstance;
  /** 字段名称元组，如[create_time_start, create_time_end] */
  fields: [string, string];
  /**
   * 拆分字段对应的值类型
   * @default 'dayjs'
   */
  fieldValueType?: 'string' | 'dayjs' | 'secondTimestamp' | 'timestamp';
  /**
   * 目标转换时区
   * @default 当前所在时区
   * @description 只有当fieldValueType为string时生效，其他类型没意义
   * @description 该属性影响的是从组件获取到的字符串格式的值，比如最终你需要的是Asia/Shanghai的日期字符串，那可以通过这个属性设置
   */
  targetTimeZone?: string;
  /**
   * 只展示日期时，是否格式化时间为一天的开始和结束，只有在showTime为false时生效，默认为false
   * @description 比如2023-08-01～2023-08-02传参时实际是为2023-08-01 00:00:00～2023-08-02 23:59:59
   */
  useStartAndEndOfDay?: boolean;
  /**
   * 是否展示时间数据
   * @default false
   */
  showTime?: boolean;
  /**
   * 显示日期格式化
   * @default 'YYYY-MM-DD'
   */
  format?: string;
} & Omit<RangePickerProps, 'format'>;

/**
 * 日期范围选择组件，组件做了字段赋值，并且可以传入数据类型、时区相关的属性来进行更加灵活的转换
 * @description 字段赋值是利用form的特性来完成的，赋值的字段是隐藏的，通过form可以直接获取到
 * @description 组件有一个必填的form属性，意味着必须配合Form使用。如果你不是用来提交数据，那这个组件并不适用
 */
function FormDateRangePicker(props: Props) {
  const {
    allowClear = true,
    fields,
    fieldValueType = 'dayjs',
    form,
    value,
    onChange,
    showTime = false,
    useStartAndEndOfDay = false,
    format = 'YYYY-MM-DD',
    targetTimeZone = getTimeZone(),
    picker,
    ...rest
  } = props;

  // 标识是否是组件首次加载
  const isInitRender = useRef(true);
  // 拆分字段对应的初始值
  const [fieldsInitValue, setFieldsInitValue] = useState([]);
  if (isInitRender.current) {
    const startValue = useStartAndEndOfDay ? value?.[0]?.startOf('day') : value?.[0];
    const endValue = useStartAndEndOfDay ? value?.[1]?.endOf('day') : value?.[1];
    const initStart = dayjsToValue(startValue, fieldValueType, format, targetTimeZone);
    const initEnd = dayjsToValue(endValue, fieldValueType, format, targetTimeZone);
    setFieldsInitValue([initStart, initEnd]);
    isInitRender.current = false;
  }

  const handleChange: RangePickerProps['onChange'] = (date, formatString) => {
    let start = date?.[0];
    let end = date?.[1];
    // 如果设置了不展示时间但是需要时间信息，则需要手动修正时间
    if (!showTime && useStartAndEndOfDay) {
      start = start?.startOf('day');
      end = end?.endOf('day');
    }
    const formatStart = dayjsToValue(start, fieldValueType, format, targetTimeZone);
    const formatEnd = dayjsToValue(end, fieldValueType, format, targetTimeZone);
    // 触发外部的change事件
    onChange?.(date, formatString);
    // 设置form隐藏字段的值
    form?.setFieldsValue({
      [fields[0]]: formatStart,
      [fields[1]]: formatEnd,
    });
  };

  return (
    <>
      <RangePicker
        format={format}
        value={value}
        showTime={showTime}
        picker={picker}
        allowClear={allowClear}
        onChange={handleChange}
        {...rest}
      />
      <Form.Item noStyle hidden name={fields[0]} initialValue={fieldsInitValue[0]}>
        <Input />
      </Form.Item>
      <Form.Item noStyle hidden name={fields[1]} initialValue={fieldsInitValue[1]}>
        <Input />
      </Form.Item>
    </>
  );
}

export default FormDateRangePicker;
export type FormDateRangePickerProps = Props;
