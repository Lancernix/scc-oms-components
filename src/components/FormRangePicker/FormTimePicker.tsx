import { Form, FormInstance, FormItemProps, Input, TimePicker } from 'antd';
import { TimeRangePickerProps } from 'antd/es/time-picker';
import { Moment } from 'moment';
import React from 'react';
import useRangePicker from './hooks';

const { RangePicker } = TimePicker;

interface Props {
  /** 字段名称元组，如[create_time_start, create_time_end] */
  fields: [string, string];
  /** formItem的label */
  label?: FormItemProps['label'];
  /** formItem的name，不传会给一个默认的 */
  name?: FormItemProps['name'];
  /** form实例 */
  form: FormInstance;
  /** formitem初始值，进行了扩展，数据类型可以是moment，string */
  initialValue?: [Moment, Moment] | [string, string];
  /** value类型，如选择string则form收集到的值为string类型，默认为string */
  valueType?: 'string' | 'moment';
  /** 时间字符串格式化模版，默认为HH:mm:ss */
  format?: string;
  /** 是否允许清空，默认为true */
  allowClear?: boolean;
  /** formItem的校验规则 */
  rules?: FormItemProps['rules'];
  /** formItem的样式 */
  formItemLayout?: {
    labelCol: FormItemProps['labelCol'];
    wrapperCol: FormItemProps['wrapperCol'];
  };
  otherRangePickerProps?: Omit<
    TimeRangePickerProps,
    'empty' | 'value' | 'defaultValue' | 'onChange' | 'format' | 'allowClear'
  >;
  /** formItem的其他属性，常用的属性都已经提升到顶层了，有需要可以在这里添加 */
  otherFormItemProps?: Omit<FormItemProps, 'labelCol' | 'wrapperCol' | 'label' | 'initialValue' | 'name' | 'rules'>;
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
 * 一个方便的时间范围选择组件，不再需要手动进行数据类型转换和字段赋值，组件已经替你做了～
 * @description 需要注意的一点是：组件会导致form的数据中多出一个额外的字段，所以需要你在提交的时候去剔除这个字段
 */
const FormTimePicker = (props: Props) => {
  const {
    label,
    fields,
    name,
    initialValue = [void 0, void 0],
    form,
    rules,
    allowClear = true,
    format = 'HH:mm:ss',
    valueType = 'string',
    formItemLayout = formDefaultProps,
    otherRangePickerProps = {},
    otherFormItemProps = {},
  } = props;

  const [initValue, onChangeValue] = useRangePicker(initialValue, {
    form,
    fields,
    valueType,
    format,
  });

  return (
    <>
      <Form.Item
        label={label}
        name={name ?? `${fields[0]}__${fields[1]}`}
        {...formItemLayout}
        initialValue={initValue}
        rules={rules}
        {...otherFormItemProps}
      >
        <RangePicker onChange={onChangeValue} allowClear={allowClear} {...otherRangePickerProps} />
      </Form.Item>
      <Form.Item hidden name={fields[0]} initialValue={initialValue[0] ?? ''}>
        <Input />
      </Form.Item>
      <Form.Item hidden name={fields[1]} initialValue={initialValue[1] ?? ''}>
        <Input />
      </Form.Item>
    </>
  );
};

export default FormTimePicker;
export type FormTimePickerProps = Props;
