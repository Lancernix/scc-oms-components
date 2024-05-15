/**
 * title: 多个按钮组合
 * description: 表格操作列常见的使用场景
 */
import React, { useState } from 'react';
import { message } from 'antd';
import { TableButton } from 'scc-oms-components';

function Index() {
  const [loading, setLoading] = useState(false);

  const onClickView = () => {
    message.info('点击了【查看】按钮');
  };

  const onClickEdit = () => {
    message.info('点击了【编辑】按钮');
  };

  const onClickDel = () => {
    setLoading(true);
    message.info('点击了删除确认弹窗中的【确认】按钮');
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  return (
    <>
      <TableButton onClick={onClickView}>查看</TableButton>
      <TableButton onClick={onClickEdit}>编辑</TableButton>
      <TableButton danger onClick={onClickDel} withConfirm loading={loading}>
        删除
      </TableButton>
    </>
  );
}

export default Index;
