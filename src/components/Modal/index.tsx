import React from 'react';
import { Button, Modal, type ModalProps, Spin } from 'antd';
import useAdaptiveHeight from 'hooks/useAdaptiveHeight';

interface Props extends Omit<ModalProps, 'width' | 'confirmLoading' | 'footer'> {
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
  contentScrollY?: boolean;
  /**
   * 内容区域loading
   * @default false
   */
  fetchLoading?: boolean;
  /**
   * 提交按钮loading
   * @default false
   */
  submitLoading?: boolean;
  /** 底部额外的内容 */
  extraFooter?: React.ReactNode;
}

const SIZE_MAP = { s: '600px', m: '800px', l: '1000px', xl: '1200px' };

function Footer(
  { type, onReset, onOk, resetText, submitText, onSubmit, okText, submitLoading, extraFooter }: Partial<Props>,
) {
  switch (type) {
    case 'edit':
    case 'create':
      return (
        <>
          {extraFooter ?? null}
          <Button style={{ marginLeft: '10px' }} key="reset" onClick={onReset}>{resetText}</Button>
          <Button
            style={{ marginLeft: '10px' }}
            key="submit"
            type="primary"
            onClick={onSubmit}
            loading={submitLoading}
          >
            {submitText}

          </Button>
        </>
      );
    default:
      return (
        <>
          {extraFooter ?? null}
          <Button key="ok" style={{ marginLeft: '10px' }} type="primary" onClick={onOk}>{okText}</Button>
        </>
      );
  }
}

/**
 * 高度自适应当前视窗的弹窗，常用于详情/创建弹窗的使用
 * @description 为了UI统一，强烈建议使用该组件
 * @param props antd modal的所有属性（除去width，width由size替代）
 */
function AdaptiveHeightModal(props: Props) {
  const {
    type = 'view',
    size = 'm',
    onReset,
    onOk,
    okText = '确定',
    onSubmit,
    resetText = '重置',
    submitText = '提交',
    fetchLoading = false,
    submitLoading = false,
    contentScrollY = false,
    bodyStyle,
    extraFooter,
    children,
    ...rest
  } = props;

  const maxHeight = useAdaptiveHeight(150, 150, 100);

  return (
    <Modal
      {...rest}
      width={SIZE_MAP[size]}
      bodyStyle={{ ...bodyStyle, height: 'fit-content', maxHeight, overflowY: contentScrollY ? 'hidden' : 'auto' }}
      footer={(
        <Footer
          type={type}
          onOk={onOk}
          okText={okText}
          onReset={onReset}
          onSubmit={onSubmit}
          submitLoading={submitLoading}
          resetText={resetText}
          submitText={submitText}
          extraFooter={extraFooter}
        />
      )}
    >
      <Spin spinning={fetchLoading}>{children}</Spin>
    </Modal>
  );
}

export default AdaptiveHeightModal;
