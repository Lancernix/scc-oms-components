/**
 * title: 嵌套 FormTable
 * description: FormTable 与 FormTable 嵌套的情况。这里给出了一个业务中实际用到的但不常见的示例可以作为参考。
 */
import React, { useState } from 'react';
import type { FormListFieldData, TableProps } from 'antd';
import { Button, Form, Input, InputNumber, Select, Typography } from 'antd';
import { FormTable } from 'scc-oms-components';
import type { FormTableColumnType, FormTableProps } from 'scc-oms-components';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  padding-bottom: 40px;

  .operate-btns-area {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .ant-table-cell.ant-table-row-expand-icon-cell {
    display: none;
  }

  .ant-table-cell {
    width: 10%;

    &.op-col {
      width: 4%;
    }

    &.op-col.fixed-right {
      position: sticky;
      right: 0px;
    }
  }

  .ant-table-content {
    width: 1800px;
  }
`;

const classOpts = [
  { label: 'C3-1（三年级一班）', value: 'C3-1', title: '三年级一班' },
  { label: 'C3-2（三年级二班）', value: 'C3-2', title: '三年级二班' },
  { label: 'C1-1（一年级一班）', value: 'C1-1', title: '一年级一班' },
  { label: 'C1-2（一年级二班）', value: 'C1-2', title: '一年级二班' },
  { label: 'C2-1（二年级一班）', value: 'C2-1', title: '二年级一班' },
  { label: 'C2-2（二年级二班）', value: 'C2-2', title: '二年级二班' },
];

const genderOpts = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
];

const initValues = [{ stuList: [{ stuNo: '1001' }] }];

const { Link } = Typography;

function subTable(formValues?: any) {
  const res: TableProps<FormListFieldData>['expandable']['expandedRowRender'] = parentObj => {
    const belongClass = formValues?.[parentObj.name] || [];

    const columns: FormTableColumnType[] = [
      {
        title: '学号',
        dataIndex: 'stuNo',
        editable: true,
        component: <Input />,
        requiredMark: true,
        rules: ({ name }) => ([
          { required: true, message: '请填写学号' },
          {
            validator(_, value) {
              const usedNoList = (belongClass.stuList as Array<any>)
                .filter((_: any, index) => index !== name).map(stu => stu.stuNo).filter(Boolean);
              if (usedNoList.includes(value)) {
                return Promise.reject(new Error('学号不能重复'));
              }
              return Promise.resolve();
            },
          },
        ]),
      },
      {
        title: '姓名',
        dataIndex: 'stuName',
        editable: true,
        component: <Input />,
      },
      {
        title: '性别',
        dataIndex: 'gender',
        editable: true,
        component: <Select options={genderOpts} />,
      },
      ...Array.from({ length: 5 }).map((_, i) => ({
        title: `其他属性${i + 1}`,
        dataIndex: `remark${i + 1}`,
        width: 100,
      })),
      ({ add, remove }) => ({
        title: '操作',
        dataIndex: 'operate',
        editable: false,
        fixed: 'right',
        className: 'op-col',
        render: (_, record) => (
          <>
            <Link
              onClick={() => add()}
              disabled={belongClass?.studentNum <= belongClass?.stuList?.length}
            >
              新增
            </Link>
            <Link
              style={{ marginLeft: '10px' }}
              onClick={() => remove(record.name)}
              disabled={belongClass?.stuList?.length <= 1}
              type="danger"
            >
              删除
            </Link>
          </>
        ),
      }),
    ];

    return (
      <FormTable
        name={[parentObj.name, 'stuList']}
        tableColumns={columns}
      />
    );
  };

  return res;
}

const opBtns: FormTableProps['operateBtnsNode'] = ({ add }) => (
  <Button type="dashed" block onClick={() => add({ stuList: [{}] })}>新增班级</Button>
);

function Index() {
  const [form] = Form.useForm();
  const [value, setValue] = useState<Record<string, unknown>>();
  const classList = Form.useWatch(['classList'], form);

  const columns: FormTableColumnType[] = [
    {
      title: '基本信息',
      children: [
        {
          title: '班级',
          dataIndex: 'classNo',
          editable: true,
          component: record => (
            <Select
              options={classOpts}
              onChange={(_, opt) =>
                form.setFieldValue(['classList', record.name, 'classTitle'], (opt as (typeof classOpts)[number]).title)}
            />
          ),
          requiredMark: true,
          rules: [{ required: true, message: '请选择班级' }],
        },
        {
          title: '班级名称',
          dataIndex: 'classTitle',
          editable: true,
          component: <Input disabled />,
          hidden: true,
        },
        {
          title: '班主任',
          dataIndex: 'teacher',
          editable: true,
          component: <Input />,
        },
        {
          title: '班级人数',
          dataIndex: 'studentNum',
          editable: true,
          component: <InputNumber min={0} precision={0} style={{ width: '100%' }} />,
        },
      ],
    },
    {
      title: '其他信息',
      children: Array.from({ length: 6 }).map((_, i) => ({
        title: `其他属性${i + 1}`,
        dataIndex: `remark${i + 1}`,
      })),
    },
    ({ remove }) => ({
      title: '操作',
      key: 'operate',
      editable: false,
      fixed: 'right',
      className: 'op-col ant-table-cell-fix-right ant-table-cell-fix-right-first fixed-right',
      render: (_, record) => (
        <Link onClick={() => remove(record.name)} type="danger">
          删除
        </Link>
      ),
    }),
  ];

  const handleSubmit = () => {
    form.validateFields().then((val: any) => {
      setValue(val);
    }).catch(e => console.log(e));
  };

  return (
    <>
      <Wrapper>
        <Form form={form}>
          <div style={{ overflowX: 'auto' }}>
            <FormTable
              name="classList"
              tableColumns={columns}
              initialValue={initValues}
              tableProps={{
                expandable: {
                  expandedRowRender: subTable(classList),
                  expandedRowKeys: (classList || []).map((_: any, index: number) => index),
                },
                bordered: true,
                pagination: false,
              }}
              operateBtnsNode={opBtns}
            />
          </div>
        </Form>
      </Wrapper>
      <div style={{ marginTop: '10px' }}>
        <Button type="primary" onClick={() => handleSubmit()}>
          提交
        </Button>
        <span style={{ marginLeft: '40px' }}>
          Form获取的值为：
          {JSON.stringify(value)}
        </span>
      </div>
    </>

  );
}

export default Index;
