import React, { useState } from 'react';
import { Button, Popconfirm } from 'antd';
import type { ButtonProps, PopconfirmProps } from 'antd';

interface Props extends Omit<ButtonProps, 'type'> {
  /**
   * 是否增加二次确认逻辑
   * @description false
   */
  withConfirm?: boolean;
  /**
   * popconfirm的title
   * @description '确定执行该操作吗？'
   */
  popconfirmTitle?: PopconfirmProps['title'];
  /**
   * popconfirm确认按钮的文本
   * @description '确定'
   */
  popconfirmOkText?: PopconfirmProps['okText'];
  /**
   * popconfirm取消按钮的文本
   * @description '取消'
   */
  popconfirmCancelText?: PopconfirmProps['cancelText'];
}

function TableButton(props: Props) {
  const {
    children,
    withConfirm = false,
    onClick,
    popconfirmTitle = '确定执行该操作吗？',
    popconfirmOkText = '确定',
    popconfirmCancelText = '取消',
    loading,
    style,
    ...rest
  } = props;

  const [visible, setVisible] = useState(false);

  const handleBtnClick: Props['onClick'] = e => {
    if (withConfirm) {
      setVisible(true);
      return;
    }
    onClick?.(e);
  };

  const handleConfirm: PopconfirmProps['onConfirm'] = e => {
    if (withConfirm) {
      onClick?.(e);
      setVisible(false);
    }
  };

  return (
    <Popconfirm
      title={popconfirmTitle}
      visible={withConfirm ? visible : false}
      onConfirm={handleConfirm}
      onCancel={() => setVisible(false)}
      okText={popconfirmOkText}
      cancelText={popconfirmCancelText}
    >
      <Button
        type="link"
        loading={loading}
        onClick={handleBtnClick}
        style={{ ...style, padding: 0, height: 'auto', margin: '0 4px' }}
        {...rest}
      >
        {children}
      </Button>
    </Popconfirm>
  );
}

export default TableButton;

export type TableButtonProps = Props;
