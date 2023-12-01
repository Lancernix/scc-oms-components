import { Form, type FormListFieldData, type FormListOperation, Table, type TableColumnType } from 'antd';
import React from 'react';

/** FormTableColumn类型定义 */
export type FormTableColumnType =
  | ({
    /** 是否可编辑，是则需要增加对应的编辑组件 */
    editable: boolean;
    /** 可编辑cell对应的组件 */
    component?: React.ReactNode;
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
}

/** 字段展示组件 */
function Display({ value }: { value?: React.ReactText; onChange?: (val: React.ReactText) => void }) {
  return <span>{value}</span>;
}

function genFormTableColumns(
  originColumns: Array<FormTableColumnType>,
  { remove, add, move }: FormListOperation,
): Array<TableColumnType<FormListFieldData>> {
  return originColumns.map(originCol => {
    let resCol: TableColumnType<FormListFieldData>;
    // 一般是操作列
    if (typeof originCol === 'function') {
      resCol = originCol({ remove, add, move });
    } else {
      resCol.title = originCol.title;
      resCol.key = originCol.key ?? (originCol.dataIndex as string | number);
      resCol.width = originCol.width;
      // 有render则直接使用
      if (originCol.render) {
        resCol.render = originCol.render;
      } else if (originCol.editable) {
        // 没有则根据editbale、component生成对应的render方法
        if (!originCol.component) {
          console.error('When `editable` is true, `component` cannot be empty.');
        } else {
          resCol.render = (_, record) => (
            <Form.Item name={[record.key, originCol.dataIndex as string | number]} style={{ margin: 0 }}>
              {originCol.component}
            </Form.Item>
          );
        }
      } else {
        resCol.render = (_, record) => (
          <Form.Item name={[record.key, originCol.dataIndex as string | number]} style={{ margin: 0 }}>
            <Display />
          </Form.Item>
        );
      }
    }
    return resCol;
  });
}

export default function FormTable(props: Props) {
  const { name, tableColumns, operateBtnsPosition = 'bottom', operateBtnsNode } = props;

  return (
    <Form.List name={name}>
      {(fields, { add, remove, move }) => {
        return (
          <div
            style={{ display: 'flex', flexDirection: operateBtnsPosition === 'bottom' ? 'column' : 'column-reverse' }}
          >
            <Table
              bordered
              rowKey={record => record.key}
              pagination={false}
              dataSource={fields}
              size="small"
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
