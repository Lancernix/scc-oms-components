/**
 * title: 配置额外的操作元素
 * description: 除去常规的查询、重置、展开等操作，还可以配置额外的操作元素，如：设置按钮。
 */
import { SettingOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import React from 'react';
import { SearchForm, type SearchFormProps } from 'scc-oms-components';

const extraNode = <Button icon={<SettingOutlined />} type="text" />;

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
      type: 'dateRange',
      props: {
        name: 'dateRange',
        label: '日期范围',
        form: form,
        fields: ['startDate', 'endDate'],
        otherRangePickerProps: {
          style: { width: '100%' },
        },
      },
    },
    {
      type: 'timeRange',
      props: {
        name: 'timeRange',
        label: '时间范围',
        form: form,
        fields: ['startTime', 'endTIme'],
        otherRangePickerProps: {
          style: { width: '100%' },
        },
      },
    },
  ];

  return <SearchForm items={items} form={form} responsive={false} collapsed extraOperateNode={extraNode} />;
}

export default Index;
