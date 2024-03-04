import type { FormItemProps, FormListFieldData, FormListOperation, TableColumnType, TableProps } from 'antd';
import React from 'react';
/** FormTableColumn类型定义 */
export type FormTableColumnType = ({
    /**
     * 是否可编辑，是则需要增加对应的编辑组件
     * @default false
     */
    editable?: boolean;
    /** 可编辑cell对应的组件，`editable`为true时必须设置 */
    component?: React.ReactNode | ((record: FormListFieldData) => React.ReactNode);
    /**
     * 是否隐藏该字段
     * @default false
     */
    hidden?: boolean;
    /**
     * 是否展示表头必填标识
     * @default false
     */
    requiredMark?: boolean;
    /** 字段提示 */
    tooltip?: React.ReactNode;
    /** 组件在form中使用的校验规则 */
    rules?: FormItemProps['rules'] | ((record: FormListFieldData) => FormItemProps['rules']);
    /** 子列 */
    children?: Array<FormTableColumnType>;
    /** 初始值 */
    initialValue?: unknown | ((record: FormListFieldData) => unknown);
} & TableColumnType<FormListFieldData>) | (({ add, remove, move }: FormListOperation) => TableColumnType<FormListFieldData>);
interface Props {
    /** 在form中使用的name */
    name: string | number | Array<string | number>;
    /** table需要的columns */
    tableColumns: Array<FormTableColumnType>;
    /** 整个formTable对应的初始值 */
    initialValue?: Array<Record<string, unknown>>;
    /**
     * 操作按钮（新增、批量删除）的位置
     * @default 'bottom'
     */
    operateBtnsPosition?: 'top' | 'bottom';
    /** 操作按钮自定义Node */
    operateBtnsNode?: React.ReactNode | (({ add, remove, move }: FormListOperation) => React.ReactNode);
    /**
     * table的其他属性
     * @default { bordered: true, pagination: false }
     */
    tableProps?: Omit<TableProps<FormListFieldData>, 'rowKey' | 'dataSource' | 'columns' | 'className'>;
}
export default function FormTable(props: Props): React.JSX.Element;
export type FormTableProps = Props;
export {};
