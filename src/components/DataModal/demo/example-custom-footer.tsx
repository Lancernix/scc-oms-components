/**
 * title: 自定义底部内容
 * description: 有的时候，底部的默认内容无法满足需求，你可以自己添加自定义的内容
 */
import React, { useState } from 'react';
import { Button, Divider } from 'antd';
import { DataModal } from 'scc-oms-components';

function Index() {
  const [visible, setVisible] = useState(false);

  const customFooter = (
    <>
      <span style={{ paddingRight: '8px' }}>自定义内容</span>
      <Button onClick={() => setVisible(false)}>关闭</Button>
      <Button danger>删除</Button>
    </>
  );

  return (
    <>
      <Divider />
      <Button type="primary" onClick={() => setVisible(true)}>
        打开弹窗
      </Button>
      <DataModal
        type="create"
        size="l"
        visible={visible}
        onCancel={() => setVisible(false)}
        customFooter={customFooter}
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
