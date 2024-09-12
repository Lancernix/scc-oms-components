/**
 * title: 自定义响应式设置
 * description: 组件设置了一个默认的响应式布局配置，如果不合适，可以自己设定（key为当前最小屏幕宽度，value则是col占用的span数量）。这里调整视窗宽度，可观察响应式效果。
 */
import { Form } from 'antd';
import React from 'react';
import { SearchForm, type SearchFormProps } from 'scc-oms-components';

const colSpanMap = {
  1200: 12, // 屏幕宽度大于1200px时，每col占用12个span，即可以排列2个基本筛选项（小于1200px时也会使用这个配置）
  1700: 8, // 屏幕宽度大于1700px时，每col占用8个span，即可以排列3个基本筛选项
  2200: 6, // 屏幕宽度大于2200px时，每col占用6个span，即可以排列4个基本筛选项
};

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

  return <SearchForm items={items} form={form} responsive={colSpanMap} collapsed />;
}

export default Index;
