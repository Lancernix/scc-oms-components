import React from 'react';
import { type ModalProps } from 'antd';
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
/**
 * 高度自适应当前视窗的弹窗，常用于详情/创建弹窗的使用
 * @description 为了UI统一，强烈建议使用该组件
 */
export default function DataModal(props: Props): React.JSX.Element;
export type DataModalProps = Props;
export {};
