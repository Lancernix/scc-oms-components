/**
 * title: 基础用法
 * description: Table 中的每个 cell 都支持编辑，可以通过 `editable` 属性来设置
 */
import { Button, Form, Input, InputNumber, Select, Typography } from 'antd';
import React, { useState } from 'react';
import { FormTable, type FormTableColumnType } from 'scc-oms-components';

const genderOpts = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
];

const initValues = [{ name: 'Tim', age: 16, gender: 'male', height: 170, country: '中国' }];

const { Link } = Typography;

function Index() {
  const [form] = Form.useForm();
  const [value, setValue] = useState<Record<string, unknown>>();

  const columns: FormTableColumnType[] = [
    {
      title: '姓名',
      dataIndex: 'name',
      editable: true,
      component: <Input />,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      editable: true,
      component: <InputNumber min={0} precision={0} style={{ width: '100%' }} />,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      editable: true,
      component: <Select options={genderOpts} />,
    },
    {
      title: '身高（cm）',
      dataIndex: 'height',
      editable: true,
      component: <InputNumber min={0} precision={0} style={{ width: '100%' }} />,
    },
    {
      title: '国籍',
      dataIndex: 'country',
    },
    ({ add, remove }) => ({
      title: '操作',
      dataIndex: 'operate',
      render: (_, record) => (
        <>
          <Link onClick={() => add({ country: '中国', height: 175 })}>新增</Link>
          <Link style={{ marginLeft: '10px' }} onClick={() => remove(record.name)}>
            删除
          </Link>
        </>
      ),
    }),
  ];

  const handleSubmit = () => {
    form
      .validateFields()
      .then((val: any) => {
        console.log(val);
        setValue(val);
      })
      .catch(e => console.log(e));
  };

  return (
    <>
      <Form form={form} initialValues={initValues}>
        <FormTable name="formTable" tableColumns={columns} initialValue={initValues} />
      </Form>
      <div style={{ marginTop: '16px' }}>
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
