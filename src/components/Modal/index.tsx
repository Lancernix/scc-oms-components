import React from 'react';
import { Modal, type ModalProps } from 'antd';
import useAdaptiveHeight from 'hooks/useAdaptiveHeight';

interface Props extends Omit<ModalProps, 'width'> {
  /**
   * 弹窗编辑状态
   * @description 这个属性可以帮你设置弹窗的title，如果你不需要直接设置`title`属性覆盖即可
   * @default 'view'
   */
  type?: 'view' | 'edit' | 'create';
  /**
   * 弹窗的大小，替代了width属性
   * @description 尺寸设置：xl-1200px | l-1000px | m-800px | s-600px
   * @default 'm'
   */
  size?: 'xl' | 'l' | 'm' | 's';
  /** 重置按钮的回调 */
  onReset?: () => void;
  /**
   * 重置按钮的展示文本
   * @default '重置'
   */
  resetText?: React.ReactNode;
  /** 提交按钮的回调 */
  onSubmit?: () => void;
  /**
   * 提交按钮的展示文本
   * @default '提交'
   */
  submitText?: React.ReactNode;
  /**
   * 内容区域是否竖向滚动
   * @default true
   */
  contentScroll?: boolean;
}

/**
 * 宽度1000px，高度自适应当前视窗的弹窗，常用于详情/创建弹窗的使用
 * @description 为了UI统一，强烈建议使用该组件
 * @param props antd modal的所有属性（除去width，width固定为1000）
 */
function AdaptiveHeightModal(props: Props) {
  const { bodyStyle, ...rest } = props;
  const maxHeight = useAdaptiveHeight(150, 150, 100);

  return (
    <Modal {...rest} width={1000} bodyStyle={{ ...bodyStyle, height: 'fit-content', maxHeight, overflowY: 'auto' }} />
  );
}

export default AdaptiveHeightModal;
