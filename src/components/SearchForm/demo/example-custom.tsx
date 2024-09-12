/**
 * title: 自定义表单项组件
 * description: 按照 Antd 的设定，写自定义组件即可。
 */
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Modal } from 'antd';
import React, { useState } from 'react';
import { SearchForm, type SearchFormProps } from 'scc-oms-components';

function CustomInput({ value, onChange }: { value?: string; onChange?: (value: string) => void }) {
  const [visible, setVisible] = useState(false);
  const handleChange = (val: string) => {
    const res = val.trim().replace('，', ',');
    onChange?.(res);
  };

  return (
    <>
      <Input
        value={value}
        onChange={e => handleChange(e.target.value)}
        suffix={<PlusOutlined onClick={() => setVisible(true)} />}
      />
      <Modal title="批量输入" visible={visible} onCancel={() => setVisible(false)} footer={null}>
        <Input.TextArea value={value} onChange={e => handleChange(e.target.value)} />
      </Modal>
    </>
  );
}

function Index() {
  const [form] = Form.useForm();

  const items: SearchFormProps['items'] = [
    {
      label: '姓名',
      name: 'name',
      type: 'input',
      props: {
        placeholder: '请输入',
      },
    },
    {
      label: '年龄',
      name: 'age',
      type: 'inputNumber',
      props: {
        placeholder: '请输入',
        style: { width: '100%' },
      },
    },
    {
      label: '性别',
      name: 'gender',
      type: 'select',
      props: {
        placeholder: '请选择',
        options: [
          { label: '男', value: 1 },
          { label: '女', value: 2 },
        ],
      },
    },
    {
      label: '时间',
      name: 'time',
      type: 'time',
      props: {
        style: { width: '100%' },
      },
    },
    {
      label: '日期',
      name: 'date',
      type: 'date',
      props: {
        style: { width: '100%' },
      },
    },
    {
      name: 'custom',
      label: '自定义',
      type: 'custom',
      node: <CustomInput />,
    },
  ];

  return <SearchForm items={items} form={form} responsive={false} />;
}

export default Index;
