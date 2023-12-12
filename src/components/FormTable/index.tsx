import type { FormListFieldData, FormListOperation, TableColumnGroupType, TableColumnType, TableProps } from 'antd';
import { Form, Table } from 'antd';
import React from 'react';

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
    children?: Array<FormTableColumnType>;
  } & TableColumnType<FormListFieldData>)
  | (({ add, remove, move }: FormListOperation) => TableColumnType<FormListFieldData>);

interface Props {
  /** 在form中使用的name */
  name: string;
  /** table需要的Columns */
  tableColumns: Array<FormTableColumnType>;
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
  tableProps?: Omit<TableProps<FormListFieldData>, 'rowKey' | 'dataSource' | 'columns'>;
}

/** 字段展示组件 */
function Display({ value }: { value?: React.ReactText; onChange?: (val: React.ReactText) => void }) {
  return <span>{value}</span>;
}

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
        resCol.title = originCol.title;
        (resCol as TableColumnGroupType<FormListFieldData>).children
          = genFormTableColumns(originCol.children, { remove, add, move });
      } else {
        // 正常表头
        resCol.title = originCol.title;
        resCol.key = originCol.key ?? (originCol.dataIndex as string | number);
        resCol.width = originCol.width;
        if (originCol.render) {
          // 有render则直接使用（render优先级高）
          resCol.render = originCol.render;
        } else if (originCol.editable) {
          // 没有则根据editbale、component生成对应的render方法
          if (!originCol.component) {
            console.error('When `editable` is true, `component` cannot be empty.');
          } else {
            resCol.render = (_, record) => (
              <Form.Item name={[record.name, originCol.dataIndex as string | number]} style={{ margin: 0 }}>
                {typeof originCol.component === 'function' ? originCol.component(record) : originCol.component}
              </Form.Item>
            );
          }
        } else {
          resCol.render = (_, record) => (
            <Form.Item name={[record.name, originCol.dataIndex as string | number]} style={{ margin: 0 }}>
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
  } = props;

  return (
    <Form.List name={name}>
      {(fields, { add, remove, move }) => {
        return (
          <div
            style={{ display: 'flex', flexDirection: operateBtnsPosition === 'bottom' ? 'column' : 'column-reverse' }}
          >
            <Table
              {...tableProps}
              rowKey={record => record.key}
              dataSource={fields}
              columns={genFormTableColumns(tableColumns, { add, remove, move })}
            />
            {operateBtnsNode
              ? (
                <div>
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
