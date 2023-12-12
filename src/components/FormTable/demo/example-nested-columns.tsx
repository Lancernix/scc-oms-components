/**
 * title: 表头分组
 * description: 适用于信息展示需要分组的情况，在设置分组表头时，注意父级表头只会有 `title` 和 `children` 属性会被使用，其他属性会自动忽略
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

const careerOpts = [
  { label: '学生', value: 1 },
  { label: '白领', value: 2 },
  { label: '工人', value: 3 },
  { label: '其他', value: 4 },
];

const initValues = {
  formTable: [{ name: 'Tim', age: 16, gender: 'male', isAdult: 2, career: 1 }],
};

const { Link } = Typography;

function Index() {
  const [form] = Form.useForm();

  const list = Form.useWatch('formTable', form);
  console.log('实时list', list);

  const columns: FormTableColumnType[] = [
    {
      title: '基本信息',
      children: [
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
      ],
    },
    {
      title: '职业信息',
      children: [
        {
          title: '职业',
          dataIndex: 'career',
          editable: true,
          component: <Select options={careerOpts} />,
        },
        {
          title: '所在公司',
          dataIndex: 'company',
          editable: true,
          component: record => <Input disabled={list?.[record.name]?.career === 1} />,
        },
        {
          title: '备注',
          dataIndex: 'remark',
          editable: true,
          component: record => <Input disabled={list?.[record.name]?.career !== 4} />,
        },
      ],
    },
    ({ add, remove }) => ({
      title: '操作',
      dataIndex: 'operate',
      width: '100px',
      editable: false,
      render: (_, record) => (
        <>
          <Link onClick={() => add()}>
            新增
          </Link>
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
