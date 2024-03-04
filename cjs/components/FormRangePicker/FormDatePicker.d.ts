import React from 'react';
import type { FormInstance, FormItemProps } from 'antd';
import type { Moment } from 'moment';
declare const RangePicker: import("antd/lib/date-picker/generatePicker/interface").PickerComponentClass<import("antd/lib/date-picker/generatePicker").RangePickerProps<Moment>, unknown>;
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
    /** 是否允许清空，默认为true */
    allowClear?: boolean;
    /** formItem的校验规则 */
    rules?: FormItemProps['rules'];
    /** formItem的样式 */
    formItemLayout?: {
        labelCol: FormItemProps['labelCol'];
        wrapperCol: FormItemProps['wrapperCol'];
    };
    /**
     * 只展示日期时，是否格式化时间为一天的开始和结束，只有在showTime为false时生效，默认为false
     * @description 比如2023-08-01～2023-08-02传参时实际是为2023-08-01 00:00:00～2023-08-02 23:59:59
     */
    useStartAndEndOfDay?: boolean;
    /** rangePicker的其他属性，常用的属性都已经提升到顶层了，有需要可以在这里添加 */
    otherRangePickerProps?: Omit<RangePickerProps, 'empty' | 'value' | 'defaultValue' | 'onChange' | 'format' | 'showTime' | 'allowClear'>;
    /** formItem的其他属性，常用的属性都已经提升到顶层了，有需要可以在这里添加 */
    otherFormItemProps?: Omit<FormItemProps, 'labelCol' | 'wrapperCol' | 'label' | 'initialValue' | 'name' | 'rules'>;
}
/**
 * 一个方便的日期范围选择组件，不再需要手动进行数据类型转换和字段赋值，组件已经替你做了～
 * @description 需要注意的一点是：组件会导致form的数据中多出一个额外的字段，所以需要你在提交的时候去剔除这个字段，可以用useValidatedFormValues来完成
 */
declare function FormDatePicker(props: Props): React.JSX.Element;
export default FormDatePicker;
export type FormDatePickerProps = Props;
