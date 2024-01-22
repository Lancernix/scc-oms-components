/**
 * title: 基础用法
 * description: 用 Popconfirm 包裹了一下按钮，通过简单设置属性即可增加二次确认的交互逻辑
 */
import React, { useState } from 'react';
import { Divider, Radio, type RadioChangeEvent, message } from 'antd';
import { TableButton, type TableButtonProps } from 'scc-oms-components';

function Index() {
  const [withConfirm, setWithConfirm] = useState(false);

  const onWithConfirmChange = (e: RadioChangeEvent) => {
    setWithConfirm(e.target.value);
  };

  const onClick: TableButtonProps['onClick'] = () => {
    if (withConfirm) {
      message.info('点击了【确认】按钮');
      return;
    }
    message.info('点击了【查看】按钮');
  };

  return (
    <>
      <span>withConfirm属性：</span>
      <Radio.Group onChange={onWithConfirmChange} value={withConfirm}>
        <Radio value={true}>true</Radio>
        <Radio value={false}>false</Radio>
      </Radio.Group>
      <Divider />
      <TableButton onClick={onClick} withConfirm={withConfirm}>
        查看
      </TableButton>
    </>
  );
}

export default Index;
