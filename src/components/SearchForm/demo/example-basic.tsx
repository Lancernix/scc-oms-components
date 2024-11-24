/**
 * title: 基础用法
 * description: 常用的筛选项表单，支持设置是否展示搜索按钮、重置按钮，是否开启折叠、响应式等功能。
 */
import { Divider, Form, Switch } from 'antd';
import React, { useState } from 'react';
import { SearchForm, type SearchFormProps } from 'scc-oms-components';

function Index() {
  const [showSearchBtn, setShowSearchBtn] = useState<SearchFormProps['showSearchBtn']>(true);
  const [showResetBtn, setShowResetBtn] = useState<SearchFormProps['showResetBtn']>(true);
  const [collapsed, setCollapsed] = useState(false);
  const [responsive, setResponsive] = useState(false);

  const onShowSearchBtnChange = (val: boolean) => {
    setShowSearchBtn(val);
  };

  const onShowResetBtnChange = (val: boolean) => {
    setShowResetBtn(val);
  };

  const onCollapsedChange = (val: boolean) => {
    setCollapsed(val);
  };

  const onResponsiveChange = (val: boolean) => {
    setResponsive(val);
  };

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
        placeholder: '请选择',
        style: { width: '100%' },
      },
    },
    {
      label: '日期',
      name: 'date',
      type: 'date',
      props: {
        placeholder: '请选择',
        style: { width: '100%' },
      },
    },
    {
      label: '日期范围',
      name: 'dateRange',
      type: 'dateRange',
      props: {
        form: form,
        fields: ['startDate', 'endDate'],
        style: { width: '100%' },
        fieldValueType: 'string',
      },
    },
    {
      label: '时间范围',
      name: 'timeRange',
      type: 'timeRange',
      props: {
        style: { width: '100%' },
        form: form,
        fields: ['startTime', 'endTime'],
        fieldValueType: 'string',
      },
    },
  ];

  return (
    <>
      <span>是否展示搜索按钮：</span>
      <Switch checked={showSearchBtn} onChange={onShowSearchBtnChange} />
      <br />
      <span>是否展示重置按钮：</span>
      <Switch checked={showResetBtn} onChange={onShowResetBtnChange} />
      <br />
      <span>是否开启折叠：</span>
      <Switch checked={collapsed} onChange={onCollapsedChange} />
      <br />
      <span>是否开启响应式：</span>
      <Switch checked={responsive} onChange={onResponsiveChange} />
      <Divider />
      <SearchForm
        items={items}
        form={form}
        showResetBtn={showResetBtn}
        showSearchBtn={showSearchBtn}
        collapsed={collapsed}
        responsive={responsive}
      />
    </>
  );
}

export default Index;
