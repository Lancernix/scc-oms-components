/**
 * title: 弹窗body区域无滚动条
 * description: 一般情况下，弹窗的body区域会随着内容的增多出现竖向的滚动条。但是有些场景不需要body自身滚动，而是由内部的元素控制滚动，比如table。可以通过属性来控制这一行为。
 */
import React, { useState } from 'react';
import { Button } from 'antd';
import { DataModal } from 'scc-oms-components';

function Index() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        打开弹窗
      </Button>
      <DataModal visible={visible} onCancel={() => setVisible(false)} contentScrollY={false}>
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
        <p>弹窗内容...</p>
        <p>弹窗内容...</p>
      </DataModal>
    </>
  );
}

export default Index;
