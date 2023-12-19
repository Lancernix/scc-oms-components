import type {
  FormItemProps,
  FormListFieldData,
  FormListOperation,
  TableColumnGroupType,
  TableColumnType,
  TableProps,
} from 'antd';
import { Form, Table, Tooltip } from 'antd';
import React, { memo } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th, .ant-table-tbody > tr > td, .ant-table tfoot > tr > th, .ant-table tfoot > tr > td {
    padding: 8px;
  }
  .hidden {
    display: none;
  }
  .ant-table-thead > tr > th.ant-table-cell {
    .required-mark {
      color: #ff4d4f;
      margin-right: 4px;
    }
    .title-icon {
      vertical-align: -0.2em;
      margin-left: 4px;
    }
  }
`;

/** FormTableColumn类型定义 */
export type FormTableColumnType =
  | ({
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
    initialValue?: unknown;
  } & TableColumnType<FormListFieldData>)
  | (({ add, remove, move }: FormListOperation) => TableColumnType<FormListFieldData>);

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

/** 字段展示组件 */
const Display = memo(
  function Display({ value }: { value?: React.ReactText; onChange?: (val: React.ReactText) => void }) {
    return <span>{value}</span>;
  },
);

/** 扩展title展示组件 */
const Title = memo(function RequiredTitle(
  { title, requiredMark, tooltip }: { title: React.ReactNode; requiredMark: boolean; tooltip?: React.ReactNode },
) {
  return (
    <>
      {requiredMark ? <span className="required-mark">*</span> : null}
      {title}
      {tooltip ? (<Tooltip title={tooltip}><QuestionCircleOutlined className="title-icon" /></Tooltip>) : null}
    </>
  );
});

/** 生成Antd需要的columns */
function genFormTableColumns(
  originColumns: Array<FormTableColumnType>,
  { remove, add, move }: FormListOperation,
): Array<TableColumnType<FormListFieldData> | TableColumnGroupType<FormListFieldData>> {
  return originColumns.map(originCol => {
    let resCol: TableColumnType<FormListFieldData> | TableColumnGroupType<FormListFieldData> = {};
    // 一般是操作列
    if (typeof originCol === 'function') {
      resCol = originCol({ remove, add, move });
    } else {
      // 其他正常列
      if (originCol.children?.length) {
        // 嵌套表头
        resCol.title = originCol.requiredMark
          ? <Title title={originCol.title} tooltip={originCol.tooltip} requiredMark={originCol.requiredMark} />
          : originCol.title;
        (resCol as TableColumnGroupType<FormListFieldData>).children
          = genFormTableColumns(originCol.children, { remove, add, move });
      } else {
        const { requiredMark, hidden, editable, component, rules, initialValue, tooltip, ...rest } = originCol;
        resCol = rest;
        // 正常表头
        resCol.title = (requiredMark || tooltip)
          ? <Title title={originCol.title} tooltip={tooltip} requiredMark={requiredMark} />
          : originCol.title;
        resCol.key = originCol.key ?? (originCol.dataIndex as string | number);
        resCol.width = originCol.width;
        if (hidden) {
          resCol.className = 'hidden'; // 通过display来控制列的隐藏
          resCol.colSpan = 0; // 同时需要设置一下colSpan，不然在表头分组时会出现列错位
        }
        if (originCol.render) {
          // 有render则直接使用（render优先级高）
          resCol.render = originCol.render;
        } else if (editable) {
          // 没有则根据editbale、component生成对应的render方法
          if (!component) {
            console.error('When `editable` is true, `component` cannot be empty.');
          } else {
            resCol.render = (_, record) => (
              <Form.Item
                name={[record.name, originCol.dataIndex as string | number]}
                style={{ margin: 0 }}
                rules={typeof rules === 'function' ? rules(record) : rules}
                hidden={originCol.hidden} // 这里控制FormItem是否展示
              >
                {typeof component === 'function' ? component(record) : component}
              </Form.Item>
            );
          }
        } else {
          resCol.render = (_, record) => (
            <Form.Item
              name={[record.name, originCol.dataIndex as string | number]}
              style={{ margin: 0 }}
              initialValue={initialValue}
            >
              <Display />
            </Form.Item>
          );
        }
      }
    }
    return resCol;
  });
}

export default function FormTable(props: Props) {
  const {
    name,
    tableColumns,
    operateBtnsPosition = 'bottom',
    operateBtnsNode,
    tableProps = { bordered: true, pagination: false },
    initialValue,
  } = props;

  return (
    <Form.List name={name} initialValue={initialValue}>
      {(fields, { add, remove, move }) => {
        return (
          <div
            style={{ display: 'flex', flexDirection: operateBtnsPosition === 'bottom' ? 'column' : 'column-reverse' }}
          >
            <StyledTable
              {...tableProps}
              rowKey={record => record.name}
              dataSource={fields}
              columns={genFormTableColumns(tableColumns, { add, remove, move })}
            />
            {operateBtnsNode
              ? (
                <div className="operate-btns-area">
                  {typeof operateBtnsNode === 'function' ? operateBtnsNode({ add, remove, move }) : operateBtnsNode}
                </div>
              )
              : null}
          </div>
        );
      }}
    </Form.List>
  );
}
export type FormTableProps = Props;
