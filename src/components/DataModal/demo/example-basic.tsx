import { Button, Divider, Radio, type RadioChangeEvent } from 'antd';
/**
 * title: 基础用法
 * description: 结合业务需要，不同的编辑状态，底部的基本按钮也会不同（新建/编辑/复制时有确认、重置按钮；查看时只有确认按钮，并且调用的是 `onCancel` 回调）。弹窗的高度会自适应当前视窗的高度，不会出现超出底部的情况
 */
import React, { useState } from 'react';
import { DataModal, type DataModalProps } from 'scc-oms-components';

function Index() {
  const [type, setType] = useState<DataModalProps['type']>('view');
  const [size, setSize] = useState<DataModalProps['size']>('m');
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const onTypeChange = (e: RadioChangeEvent) => {
    setType(e.target.value);
  };

  const onSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };

  const onConfirmLoadingChange = (e: RadioChangeEvent) => {
    setConfirmLoading(e.target.value);
  };

  return (
    <>
      <span>type属性：</span>
      <Radio.Group onChange={onTypeChange} value={type}>
        <Radio value="view">查看</Radio>
        <Radio value="create">新建</Radio>
        <Radio value="edit">编辑</Radio>
        <Radio value="copy">复制</Radio>
      </Radio.Group>
      <br />
      <span>size属性：</span>
      <Radio.Group onChange={onSizeChange} value={size}>
        <Radio value="xs">xs</Radio>
        <Radio value="s">s</Radio>
        <Radio value="m">m</Radio>
        <Radio value="l">l</Radio>
        <Radio value="xl">xl</Radio>
      </Radio.Group>
      <br />
      <span>confirmLoading属性：</span>
      <Radio.Group onChange={onConfirmLoadingChange} value={confirmLoading}>
        <Radio value={true}>true</Radio>
        <Radio value={false}>false</Radio>
      </Radio.Group>
      <Divider />
      <Button type="primary" onClick={() => setVisible(true)}>
        打开弹窗
      </Button>
      <DataModal
        type={type}
        size={size}
        visible={visible}
        onCancel={() => setVisible(false)}
        confirmLoading={confirmLoading}
      >
        <p>弹窗内容...</p>
        <p>弹窗内容...</p>
        <p>弹窗内容...</p>
        <p>弹窗内容...</p>
        <p>弹窗内容...</p>
        <p>弹窗内容...</p>
        <p>弹窗内容...</p>
        <p>弹窗内容...</p>
        <p>弹窗内容...</p>
        <p>弹窗内容...</p>
        <p>弹窗内容...</p>
        <p>弹窗内容...</p>
        <p>弹窗内容...</p>
        <p>弹窗内容...</p>
        <p>弹窗内容...</p>
        <p>弹窗内容...</p>
        <p>弹窗内容...</p>
        <p>弹窗内容...</p>
        <p>弹窗内容...</p>
        <p>弹窗内容...</p>
      </DataModal>
    </>
  );
}

export default Index;
