import React from 'react';
import type { DatePickerProps as AntdDatePickerProps, TimePickerProps as AntdTimePickerProps } from 'antd';
import type { Moment } from 'moment';
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
};
/** 日期组件 */
export declare function DatePicker(props: DatePickerProps): React.JSX.Element;
export type TimePickerProps = Omit<AntdTimePickerProps, 'value' | 'onChange' | 'format'> & {
    value?: string | Moment | number;
    /** value类型，如选择string则form收集到的值为string类型，默认为string */
    valueType?: 'string' | 'moment';
    onChange?: (value: string | Moment) => void;
    /** 时间字符串格式化模版，默认为HH:mm:ss */
    format?: string;
};
/** 时间组件 */
export declare function TimePicker(props: TimePickerProps): React.JSX.Element;
