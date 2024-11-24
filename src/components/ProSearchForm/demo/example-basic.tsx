/**
 * title: 基础用法
 * description: 常用的筛选项表单，支持设置是否展示搜索按钮、重置按钮，是否开启折叠、响应式等功能。
 */
import { Divider, Form, Switch } from 'antd';
import React, { useState } from 'react';
import { ProSearchForm, type ProSearchFormProps } from 'scc-oms-components';

const colSpanMap = {
  1200: 12, // 屏幕宽度大于1200px时，每col占用12个span，即可以排列2个基本筛选项（小于1200px时也会使用这个配置）
  1700: 8, // 屏幕宽度大于1700px时，每col占用8个span，即可以排列3个基本筛选项
  2200: 6, // 屏幕宽度大于2200px时，每col占用6个span，即可以排列4个基本筛选项
};

function Index() {
  const [form] = Form.useForm();

  const items: ProSearchFormProps['items'] = [
    {
      label: '姓名',
      name: 'name',
      type: 'input',
      props: {
        placeholder: '请输入',
      },
      displayOrder: 1,
    },
    {
      label: '年龄',
      name: 'age',
      type: 'inputNumber',
      props: {
        placeholder: '请输入',
        style: { width: '100%' },
      },
      displayOrder: 2,
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
      displayOrder: 3,
    },
    {
      label: '时间',
      name: 'time',
      type: 'time',
      props: {
        placeholder: '请选择',
        style: { width: '100%' },
      },
      displayOrder: 4,
    },
    {
      label: '日期',
      name: 'date',
      type: 'date',
      props: {
        placeholder: '请选择',
        style: { width: '100%' },
      },
      displayOrder: 5,
    },
    {
      name: 'dateRange',
      label: '日期范围',
      type: 'dateRange',
      props: {
        form: form,
        fields: ['startDate', 'endDate'],
        style: { width: '100%' },
      },
      displayOrder: 6,
    },
    {
      name: 'timeRange',
      label: '时间范围',
      type: 'timeRange',
      props: {
        form: form,
        fields: ['startTime', 'endTIme'],
        style: { width: '100%' },
      },
      displayOrder: 7,
    },
  ];

  const handleSortFinished: ProSearchFormProps['onSortFinished'] = newItems => {
    console.log('🚀newItems:', newItems);
  };

  return <ProSearchForm items={items} form={form} responsive={colSpanMap} onSortFinished={handleSortFinished} />;
}

export default Index;
