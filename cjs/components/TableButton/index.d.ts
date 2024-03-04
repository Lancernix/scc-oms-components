import React from 'react';
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
declare function TableButton(props: Props): React.JSX.Element;
export default TableButton;
export type TableButtonProps = Props;
