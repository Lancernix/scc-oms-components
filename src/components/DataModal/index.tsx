import React, { memo, useContext } from 'react';
import { Modal as AntdModal, Button, type ModalProps, Spin } from 'antd';
import useAdaptiveHeight from 'hooks/useAdaptiveHeight';
import { LocaleContext } from 'components/LocaleProvider';

interface Props extends Omit<ModalProps, 'width' | 'footer'> {
  /**
   * 弹窗状态
   * @description 这个属性可以默认设置弹窗的title，如果不需要直接设置`title`属性覆盖即可
   */
  type?: 'view' | 'edit' | 'create' | 'copy';
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
  /**
   * 自定义底部内容，只有在`showFooter`为true时才有效
   * @description 大部分情况下，使用默认的footer就可以了，或者在默认的基础上增加`extraFooter`。如果你想覆盖默认的footer，则可以使用这个属性
   */
  customFooter?: React.ReactNode;
}

const SIZE_MAP = { xs: '400px', s: '640px', m: '880px', l: '1120px', xl: '1360px' };

const DefaultFooter = memo(function DefaultFooter(props: Partial<Props>) {
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
  const locale = useContext(LocaleContext);
  const {
    type,
    size = 'm',
    onReset,
    onOk,
    okText = locale.confirm,
    resetText = locale.reset,
    fetchLoading = false,
    contentScrollY = true,
    bodyStyle,
    extraFooter,
    customFooter,
    children,
    onCancel,
    title,
    showFooter = true,
    confirmLoading = false,
    ...rest
  } = props;

  const TITLE_MAP: Record<Props['type'], React.ReactNode> = {
    view: locale.view,
    create: locale.create,
    edit: locale.edit,
    copy: locale.copy,
  };

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
        ? (customFooter ?? (
          <DefaultFooter
            type={type}
            onOk={onOk}
            okText={okText}
            confirmLoading={confirmLoading}
            onReset={onReset}
            resetText={resetText}
            extraFooter={extraFooter}
            onCancel={onCancel}
          />
        ))
        : null}
    >
      <Spin spinning={fetchLoading}>{children}</Spin>
    </AntdModal>
  );
}

export type DataModalProps = Props;
