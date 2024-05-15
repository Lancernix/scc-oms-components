/**
 * title: 提示信息与校验规则
 * description: 表头可以通过简单设置增加必填标识和 tooltip 提示，同时也可以配置字段在 form 中的校验规则
 */
import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Select, Typography } from 'antd';
import { FormTable, type FormTableColumnType } from 'scc-oms-components';

const genderOpts = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
];

const initValues = [{ name: 'Tim', age: 16, gender: 'male', height: 170, country: '中国', isAdult: 2 }];

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
      requiredMark: true,
      rules: [{ required: true, message: '请填写姓名' }],
    },
    {
      title: '年龄',
      dataIndex: 'age',
      editable: true,
      requiredMark: true,
      component: ({ name }) => (
        <InputNumber
          min={0}
          precision={0}
          style={{ width: '100%' }}
          onBlur={e => {
            form.setFieldValue(['formTable', name, 'isAdult'], +e.target.value >= 18 ? 1 : 2);
          }}
        />
      ),
    },
    {
      title: '性别',
      dataIndex: 'gender',
      editable: true,
      requiredMark: true,
      component: <Select options={genderOpts} />,
    },
    {
      title: '身高',
      dataIndex: 'height',
      editable: true,
      component: <InputNumber min={0} precision={0} style={{ width: '100%' }} />,
      tooltip: '单位为厘米',
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
