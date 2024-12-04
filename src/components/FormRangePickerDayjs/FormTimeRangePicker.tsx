import type { FormInstance } from 'antd';
import { Form, Input } from 'antd';
import type { NamePath } from 'antd/es/form/interface';
import React, { useEffect } from 'react';
import { currentTimeZone, dayjsToValue } from 'utils/dayjsTransform';
import TimerPicker from '../DateTimePickerDayjs/TimerPicker';

const { RangePicker } = TimerPicker;
type RangePickerProps = React.ComponentProps<typeof RangePicker>;

type Props = {
  /** form实例 */
  form: FormInstance;
  /** 字段名称元组，如[create_time_start, create_time_end] */
  fields: [NamePath, NamePath];
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
   * 显示日期格式化
   * @default 'HH:mm:ss'
   */
  format?: string;
} & Omit<RangePickerProps, 'format'>;

/**
 * 时间范围选择组件，组件做了字段赋值，并且可以传入数据类型、时区相关的属性来进行更加灵活的转换
 * @description 字段赋值是利用form的特性来完成的，赋值的字段是隐藏的，通过form可以直接获取到
 * @description 组件有一个必填的form属性，意味着必须配合Form使用。如果你不是用来提交数据，那这个组件并不适用
 */
function FormTimeRangePicker(props: Props) {
  const {
    allowClear = true,
    fields,
    fieldValueType = 'dayjs',
    form,
    value,
    onChange,
    format = 'HH:mm:ss',
    targetTimeZone = currentTimeZone,
    ...rest
  } = props;

  // biome-ignore lint/correctness/useExhaustiveDependencies: 首次加载将初始值转换并set到对应字段上
  useEffect(() => {
    if (value) {
      const initStart = dayjsToValue(value?.[0], fieldValueType, format, targetTimeZone);
      const initEnd = dayjsToValue(value?.[1], fieldValueType, format, targetTimeZone);
      // 设置form隐藏字段的值（这里的目的其实是设置初始值）
      // form.resetFields会再次触发这个副作用，所以也能达到重置为初始值的效果
      form?.setFieldValue(fields[0], initStart);
      form?.setFieldValue(fields[1], initEnd);
    }
  }, []);

  const handleChange: RangePickerProps['onChange'] = (date, formatString) => {
    const [start, end] = date ?? [];
    const formatStart = dayjsToValue(start, fieldValueType, format, targetTimeZone);
    const formatEnd = dayjsToValue(end, fieldValueType, format, targetTimeZone);
    // 触发外部的change事件
    onChange?.(date, formatString);
    // 设置form隐藏字段的值
    form?.setFieldValue(fields[0], formatStart);
    form?.setFieldValue(fields[1], formatEnd);
  };

  return (
    <>
      <RangePicker allowClear={allowClear} format={format} value={value} onChange={handleChange} {...rest} />
      <Form.Item noStyle hidden name={fields[0]}>
        <Input />
      </Form.Item>
      <Form.Item noStyle hidden name={fields[1]}>
        <Input />
      </Form.Item>
    </>
  );
}

export default FormTimeRangePicker;
export type FormTimeRangePickerProps = Props;
