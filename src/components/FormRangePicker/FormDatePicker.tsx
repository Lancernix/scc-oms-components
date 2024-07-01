import type { FormInstance, FormItemProps } from 'antd';
import { DatePicker, Form, Input } from 'antd';
import type { Moment } from 'moment';
import React from 'react';
import getTimeZone from 'utils/getTimeZone';
import { momentToValue, valueToMoment } from 'utils/momentTransform';
import useRangePicker from './hooks';

const { RangePicker } = DatePicker;
type RangePickerProps = React.ComponentProps<typeof RangePicker>;

interface Props {
  /** 字段名称元组，如[create_time_start, create_time_end] */
  fields: [string, string];
  /** formItem的label */
  label?: FormItemProps['label'];
  /** formItem的name，不传会给一个默认的 */
  name?: FormItemProps['name'];
  /** form实例 */
  form: FormInstance;
  /** formitem初始值，进行了扩展，类型可以是moment、string或者时间戳 */
  initialValue?: [Moment, Moment] | [string, string] | [number, number];
  /** 是否增加时间数据 */
  showTime?: boolean;
  /** value类型，如选择string则form收集到的值为string类型，默认为string */
  valueType?: 'string' | 'secondTimestamp' | 'timestamp' | 'moment';
  /** 日期字符串格式化模版，默认为YYYY-MM-DD HH:mm:ss */
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
  /** 是否允许清空，默认为true */
  allowClear?: boolean;
  /** formItem的校验规则 */
  rules?: FormItemProps['rules'];
  /**
   * 只展示日期时，是否格式化时间为一天的开始和结束，只有在showTime为false时生效，默认为false
   * @description 比如2023-08-01～2023-08-02传参时实际是为2023-08-01 00:00:00～2023-08-02 23:59:59，注意此时的format应该包含时间
   */
  useStartAndEndOfDay?: boolean;
  /** rangePicker的其他属性，常用的属性都已经提升到顶层了，有需要可以在这里添加 */
  otherRangePickerProps?: Omit<
    RangePickerProps,
    'empty' | 'value' | 'defaultValue' | 'onChange' | 'format' | 'showTime' | 'allowClear'
  >;
  /**
   * formItem的其他属性，常用的属性都已经提升到顶层了，有需要可以在这里添加
   * @description 这里有一个默认的labelCol、wrapperCol设置，如果不需要可以覆盖
   */
  otherFormItemProps?: Omit<FormItemProps, 'label' | 'initialValue' | 'name' | 'rules'>;
}

/**
 * 默认属性
 */
const formDefaultProps = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

/**
 * 一个方便的日期范围选择组件，不再需要手动进行数据类型转换和字段赋值，组件已经替你做了～
 * @description 需要注意的一点是：组件会导致form的数据中多出一个额外的字段，所以需要你在提交的时候去剔除这个字段，可以用useValidatedFormValues来完成
 */
function FormDatePicker(props: Props) {
  const {
    label,
    name,
    rules,
    allowClear = true,
    fields,
    initialValue,
    form,
    showTime = false,
    useStartAndEndOfDay = false,
    format = 'YYYY-MM-DD HH:mm:ss',
    timeZone = getTimeZone(),
    displayTimeZone = getTimeZone(),
    valueType = 'string',
    otherRangePickerProps = {},
    otherFormItemProps = formDefaultProps,
  } = props;
  const { picker, ...rest } = otherRangePickerProps;

  const [initValue, onChangeValue] = useRangePicker(initialValue, {
    form,
    fields,
    valueType,
    format,
    useStartAndEndOfDay,
    showTime,
    timeZone,
    displayTimeZone,
  });

  return (
    <>
      <Form.Item
        label={label}
        name={name ?? `${fields[0]}__${fields[1]}`}
        initialValue={initValue}
        rules={rules}
        {...otherFormItemProps}
      >
        <RangePicker showTime={showTime} picker={picker} allowClear={allowClear} onChange={onChangeValue} {...rest} />
      </Form.Item>
      <Form.Item hidden name={fields[0]} initialValue={momentToValue(initValue[0], valueType, format, timeZone)}>
        <Input />
      </Form.Item>
      <Form.Item hidden name={fields[1]} initialValue={momentToValue(initValue[1], valueType, format, timeZone)}>
        <Input />
      </Form.Item>
    </>
  );
}

export default FormDatePicker;
export type FormDatePickerProps = Props;
