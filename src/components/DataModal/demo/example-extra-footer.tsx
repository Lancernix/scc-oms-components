/**
 * title: 底部增加额外内容
 * description: 有的时候，底部的基本按钮无法满足需求，你可以自己添加需要的元素
 */
import React, { useState } from 'react';
import { Button, Divider } from 'antd';
import { DataModal } from 'scc-oms-components';

function Index() {
  const [visible, setVisible] = useState(false);

  const extraFooter = (
    <>
      <span style={{ paddingRight: '8px' }}>额外的内容</span>
      <Button danger>删除</Button>
    </>
  );

  return (
    <>
      <Divider />
      <Button type="primary" onClick={() => setVisible(true)}>打开弹窗</Button>
      <DataModal
        type="create"
        size="l"
        visible={visible}
        onCancel={() => setVisible(false)}
        extraFooter={extraFooter}
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
