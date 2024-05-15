/**
 * title: 字段与字段间的联动
 * description: 有的时候，部分字段需要通过某个字段来实现自动填充；或者某个字段在特定字段是某个值的时候，需要控制禁用。这些字段间的联动，同样可以利用 Form 提供的功能来实现
 */
import React from 'react';
import { Form, Input, InputNumber, Select, Typography } from 'antd';
import { FormTable, type FormTableColumnType } from 'scc-oms-components';

const genderOpts = [
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
];

const idAdultOpts = [
  { label: '是', value: 1 },
  { label: '否', value: 2 },
];

const initValues = {
  formTable: [{ name: 'Tim', age: 16, gender: 'male', isAdult: 2 }],
};

const { Link } = Typography;

function Index() {
  const [form] = Form.useForm();

  const list = Form.useWatch('formTable', form);
  console.log('实时list', list);

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
      component: record => (
        <InputNumber
          min={0}
          precision={0}
          onBlur={e => form.setFieldValue(['formTable', record.name, 'isAdult'], +e.target.value > 18 ? 1 : 2)}
        />
      ),
    },
    {
      title: '性别',
      dataIndex: 'gender',
      editable: true,
      component: <Select options={genderOpts} />,
    },
    {
      title: '是否成年',
      dataIndex: 'isAdult',
      editable: true,
      component: <Select options={idAdultOpts} disabled />,
    },
    {
      title: '体重（女士不用填）',
      dataIndex: 'height',
      editable: true,
      component: record => {
        const disabled = list?.[record.name]?.gender === 'female';
        return <Input disabled={disabled} />;
      },
    },
    ({ add, remove }) => ({
      title: '操作',
      dataIndex: 'operate',
      editable: false,
      render: (_, record) => (
        <>
          <Link onClick={() => add()}>新增</Link>
          <Link style={{ marginLeft: '10px' }} onClick={() => remove(record.name)}>
            删除
          </Link>
        </>
      ),
    }),
  ];

  return (
    <Form form={form} initialValues={initValues}>
      <FormTable name="formTable" tableColumns={columns} />
    </Form>
  );
}

export default Index;
