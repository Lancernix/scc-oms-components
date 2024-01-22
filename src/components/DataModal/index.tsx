import React, { memo } from 'react';
import { Modal as AntdModal, Button, type ModalProps, Spin } from 'antd';
import useAdaptiveHeight from 'hooks/useAdaptiveHeight';

interface Props extends Omit<ModalProps, 'width' | 'footer'> {
  /**
   * 弹窗状态
   * @description 这个属性可以默认设置弹窗的title，如果不需要直接设置`title`属性覆盖即可
   * @default 'view'
   */
  type?: 'view' | 'edit' | 'create';
  /**
   * 弹窗的大小，替代了width属性
   * @description 尺寸设置: xl-1360px | l-1120px | m-880px | s-640px | xs-400px
   * @default 'm'
   */
  size?: 'xl' | 'l' | 'm' | 's' | 'xs';
  /** 重置按钮的回调 */
  onReset?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /**
   * 重置按钮的展示文本
   * @description `view`状态下没有重置按钮
   * @default '重置'
   */
  resetText?: React.ReactNode;
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
   * 是否展示弹窗底部区域
   * @default true
   */
  showFooter?: boolean;
  /** 底部额外的内容，只有在`showFooter`为true时才有效 */
  extraFooter?: React.ReactNode;
}

const SIZE_MAP = { xs: '400px', s: '640px', m: '880px', l: '1120px', xl: '1360px' };
const TITLE_MAP = { view: '详情', create: '新建', edit: '编辑' };

const Footer = memo(function Footer(props: Partial<Props>) {
  const { type, onReset, onOk, resetText, okText, confirmLoading, extraFooter, onCancel } = props;
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
            onClick={onOk}
            loading={confirmLoading}
          >
            {okText}
          </Button>
        </>
      );
    default:
      return (
        <>
          {extraFooter ?? null}
          <Button key="ok" style={{ marginLeft: '10px' }} type="primary" onClick={onCancel}>{okText}</Button>
        </>
      );
  }
});

/**
 * 高度自适应当前视窗的弹窗，常用于详情/创建弹窗的使用
 * @description 为了UI统一，强烈建议使用该组件
 */
export default function DataModal(props: Props) {
  const {
    type = 'view',
    size = 'm',
    onReset,
    onOk,
    okText = '确定',
    resetText = '重置',
    fetchLoading = false,
    contentScrollY = true,
    bodyStyle,
    extraFooter,
    children,
    onCancel,
    title,
    showFooter = true,
    confirmLoading = false,
    ...rest
  } = props;

  const maxHeight = useAdaptiveHeight(150, 150, 100);

  return (
    <AntdModal
      {...rest}
      width={SIZE_MAP[size]}
      bodyStyle={{ ...bodyStyle, height: 'fit-content', maxHeight, overflowY: contentScrollY ? 'auto' : 'hidden' }}
      title={title ?? TITLE_MAP[type]}
      onOk={onOk}
      okText={okText}
      onCancel={onCancel}
      footer={showFooter
        ? (
          <Footer
            type={type}
            onOk={onOk}
            okText={okText}
            confirmLoading={confirmLoading}
            onReset={onReset}
            resetText={resetText}
            extraFooter={extraFooter}
            onCancel={onCancel}
          />
        )
        : null}
    >
      <Spin spinning={fetchLoading}>{children}</Spin>
    </AntdModal>
  );
}

export type DataModalProps = Props;
