import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types';
import React from 'react';
import styled from 'styled-components';

interface DropIndicatorProps {
  /**
   * 放置位置
   * @description 'top' | 'bottom' | 'left' | 'right'
   */
  edge: Edge;
  /**
   * 指示器颜色
   * @default '#1890ff80'
   */
  color?: React.CSSProperties['backgroundColor'];
  /**
   * z-index属性
   * @default 10
   */
  zIndex?: React.CSSProperties['zIndex'];
  edgeStyles?: Record<Edge, Record<string, string>>;
}

const edgeStyles = {
  top: {
    top: '-1px',
    height: '2px',
    left: 0,
    right: 0,
  },
  bottom: {
    bottom: '-1px',
    height: '2px',
    left: 0,
    right: 0,
  },
  left: {
    left: '-1px',
    width: '2px',
    top: 0,
    bottom: 0,
  },
  right: {
    right: '-1px',
    width: '2px',
    top: 0,
    bottom: 0,
  },
};

const DropIndicatorContainer = styled.div<Omit<DropIndicatorProps, 'edge'> & { $edge: Edge }>`
  position: absolute;
  z-index: ${({ zIndex }) => zIndex ?? 10};
  background-color: ${({ color }) => color ?? '#1890ff80'};
  pointer-events: none;
  ${({ $edge }) => edgeStyles[$edge]}
`;

/**
 * 一个简单的拖拽指示器组件
 * @description 用于标识当前拖拽元素可用的放置位置
 * @description 支持修改颜色和z-index，如果不符合你的需求，可以自己实现一个
 */
export function DropIndicator({ edge, color, zIndex }: DropIndicatorProps) {
  return <DropIndicatorContainer $edge={edge} color={color} zIndex={zIndex} />;
}
