/**
 * title: 无Footer
 * description: 某些情况下，弹窗会比较简单，并不需要底部的操作区域，可以通过控制`showFooter`属性来控制是否展示底部区域。
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
      <DataModal visible={visible} onCancel={() => setVisible(false)} showFooter={false}>
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
