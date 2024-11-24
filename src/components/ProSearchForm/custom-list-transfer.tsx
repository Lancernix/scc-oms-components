import { DeleteOutlined, MenuOutlined } from '@ant-design/icons';
import {
  type Edge,
  attachClosestEdge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { Button, Checkbox, Col, List, type ListProps, Row, Transfer } from 'antd';
import type { TransferProps } from 'antd/es/transfer';
import { cloneDeep } from 'lodash-es';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { DropIndicator } from './drop-indicator';

export interface ListTransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
  [name: string]: unknown;
}

interface ListRenderItemProps {
  onItemSelect?: (key: string, selected: boolean) => void;
  onItemSelectAll?: (keys: string[], selected: boolean) => void;
  onSelectChange?: TransferProps<ListTransferItem>['onSelectChange'];
  onChange?: TransferProps<ListTransferItem>['onChange'];
}

interface LeftListRenderItemProps extends ListRenderItemProps {
  selectedKeys?: TransferProps<ListTransferItem>['selectedKeys'];
}

interface RightListRenderItemProps extends ListRenderItemProps {
  targetKeys?: TransferProps<ListTransferItem>['targetKeys'];
}

interface ListTransferProps extends TransferProps<ListTransferItem> {
  dataSource: ListTransferItem[];
  leftListRenderItemFunc: (props: LeftListRenderItemProps) => ListProps<ListTransferItem>['renderItem'];
  rightListRenderItemFunc: (props: RightListRenderItemProps) => ListProps<ListTransferItem>['renderItem'];
}

type DraggableState =
  | { type: 'idle' }
  | { type: 'preview'; container: HTMLElement }
  | { type: 'dragging' }
  | {
      type: 'is-dragging-over';
      closestEdge: Edge | null;
    };

const idleState: DraggableState = { type: 'idle' };
const draggingState: DraggableState = { type: 'dragging' };

interface DraggableListItemProps extends RightListRenderItemProps {
  item: ListTransferItem;
}

type Key = string | number;

function reorderArray<T extends Key | { key: Key }>(
  array: Array<T>,
  sourceKey: T extends { key: Key } ? T['key'] : T,
  targetKey: T extends { key: Key } ? T['key'] : T,
  edge: Extract<Edge, 'top' | 'bottom'>,
) {
  let sourceIndex = -1;
  let targetIndex = -1;

  // 使用泛型约束，区分不同类型数组的处理方式
  const findIndex = (item: T, key: Key): boolean => {
    if (typeof item === 'object' && 'key' in item) {
      return item.key === key;
    }
    return item === key;
  };

  // 一次遍历找到source和target的索引
  for (let i = 0; i < array.length; i++) {
    if (findIndex(array[i], sourceKey)) {
      sourceIndex = i;
    }
    if (findIndex(array[i], targetKey)) {
      targetIndex = i;
    }
    // 如果已经找到source和target，则提前退出循环（优化效率）
    if (sourceIndex !== -1 && targetIndex !== -1) {
      break;
    }
  }
  // source、 target其中一个不存在
  // source和target相同
  // source在target前面且位置是top
  // source在target后面且位置是bottom
  // 上面这四种情况，都直接返回原数组就可以了
  if (
    sourceIndex === -1 ||
    targetIndex === -1 ||
    sourceIndex === targetIndex ||
    (edge === 'top' && sourceIndex + 1 === targetIndex) ||
    (edge === 'bottom' && sourceIndex - 1 === targetIndex)
  ) {
    return array;
  }
  // 用新的数组，避免修改原始数据
  const arrayCopy = cloneDeep(array);
  // 移除source元素并保存
  const [sourceItem] = arrayCopy.splice(sourceIndex, 1);
  // 要根据source、target的相对位置来计算插入位置
  let insertIndex: number;
  if (sourceIndex > targetIndex) {
    insertIndex = edge === 'top' ? targetIndex : targetIndex + 1;
  } else {
    insertIndex = edge === 'top' ? targetIndex - 1 : targetIndex;
  }
  // 插入元素
  arrayCopy.splice(insertIndex, 0, sourceItem);
  return arrayCopy;
}

const DraggableListItem: React.FC<DraggableListItemProps> = ({ item, onChange, targetKeys }) => {
  // 拖拽元素ref
  const dragHandleRef = useRef<HTMLLIElement>(null);
  // 拖拽状态
  const [draggableState, setDraggableState] = useState<DraggableState>(idleState);

  useEffect(() => {
    const dragHandleEle = dragHandleRef.current;

    if (dragHandleEle) {
      return combine(
        // drag元素的一些方法
        draggable({
          // element: 拖拽元素
          element: dragHandleEle,
          // 将你想要的数据附加到拖动操作，在拖动开始前调用一次
          getInitialData: () => item,
          // 拖拽过程中的预览
          onGenerateDragPreview({ nativeSetDragImage }) {
            setCustomNativeDragPreview({
              nativeSetDragImage,
              getOffset: pointerOutsideOfPreview({
                x: '16px',
                y: '8px',
              }),
              render({ container }) {
                setDraggableState({ type: 'preview', container });
                return () => setDraggableState(draggingState);
              },
            });
          },
          // 拖拽操作开始，可以在这里改变拖拽状态，获取拖拽数据、拖拽元素等
          onDragStart() {
            setDraggableState(draggingState);
          },
          // 拖拽操作结束，可以在这里改变拖拽状态，获取拖拽数据、拖拽元素等
          onDrop() {
            setDraggableState(idleState);
          },
        }),
        // drop元素的一些方法
        dropTargetForElements({
          element: dragHandleEle,
          // 判断drag元素是否可以drop，true可以/false不可以
          canDrop({ source }) {
            // drag元素自身不可以drop
            if (source.element === dragHandleEle) {
              return false;
            }
            return true;
          },
          // 附加自定义元素到drop元素上
          // element: drop元素（不包含数据）
          getData({ input, element }) {
            // 这里的item就是我们想附加到drop元素上的数据
            return attachClosestEdge(item as Record<string, unknown>, {
              element,
              input,
              allowedEdges: ['top', 'bottom'],
            });
          },
          onDrag({ self }) {
            // 这里通过当前所在drop元素，获取最贴近的边，然后设置相应的样式
            const closestEdge = extractClosestEdge(self.data);
            setDraggableState({ type: 'is-dragging-over', closestEdge });
          },
          // 当drag元素离开drop元素后，会触发该事件
          onDragLeave() {
            setDraggableState(idleState);
          },
          onDrop() {
            setDraggableState(idleState);
          },
        }),
      );
    }
  }, [item]);

  return (
    <Fragment>
      <List.Item
        ref={dragHandleRef}
        key={item.key}
        style={{
          padding: '6px 12px',
          cursor: 'grab',
          position: 'relative',
          opacity: draggableState.type === 'dragging' ? 0.5 : 1,
        }}
      >
        <Row style={{ width: '100%', alignItems: 'center' }}>
          <Col flex="none" style={{ marginRight: '8px' }}>
            <MenuOutlined style={{ color: '#999' }} />
          </Col>
          <Col flex="auto">{item.title}</Col>
          <Col flex="none" style={{ marginLeft: '8px' }}>
            <Button
              size="small"
              onClick={() => {
                // 删除指定的已选项，并移动到左侧备选区
                onChange(
                  targetKeys.filter(key => key !== item.key),
                  'left',
                  [item.key],
                );
              }}
              icon={<DeleteOutlined />}
              type="link"
              disabled={item.disabled}
            />
          </Col>
        </Row>
        {draggableState.type === 'is-dragging-over' && draggableState.closestEdge ? (
          <DropIndicator edge={draggableState.closestEdge} />
        ) : null}
      </List.Item>
      {draggableState.type === 'preview' &&
        ReactDOM.createPortal(
          <div style={{ border: '1px soild #999', padding: '4px 12px', borderRadius: '2px', backgroundColor: '#eee' }}>
            {item.title}
          </div>,
          draggableState.container,
        )}
    </Fragment>
  );
};

// 穿梭框左侧列表默认渲染函数
const defaultLeftListRenderItemFunc: ListTransferProps['leftListRenderItemFunc'] = ({ onItemSelect }) => {
  return item => (
    <List.Item key={item.key} style={{ padding: '6px 12px' }}>
      <Row style={{ width: '100%', alignItems: 'center' }}>
        <Col flex="none" style={{ marginRight: '8px' }}>
          <Checkbox
            onChange={e => {
              onItemSelect(item.key, e.target.checked);
            }}
            disabled={item.disabled}
          />
        </Col>
        <Col>{item.title}</Col>
      </Row>
    </List.Item>
  );
};

// 穿梭框右侧列表默认渲染函数
const defaultRightListRenderItemFunc: ListTransferProps['rightListRenderItemFunc'] = props => {
  return item => <DraggableListItem item={item} {...props} />;
};

// Customize List Transfer
const ListTransfer = ({
  leftListRenderItemFunc,
  rightListRenderItemFunc,
  targetKeys,
  onChange,
  onSelectChange,
  oneWay = true,
  showSearch = true,
  ...restProps
}: ListTransferProps) => (
  <Transfer<ListTransferItem>
    targetKeys={targetKeys}
    onSelectChange={onSelectChange}
    onChange={onChange}
    oneWay={oneWay}
    showSearch={showSearch}
    listStyle={{ overflowY: 'auto' }}
    {...restProps}
  >
    {({ direction, filteredItems, onItemSelectAll, onItemSelect, selectedKeys, disabled: listDisabled }) => {
      const renderItem =
        direction === 'left'
          ? leftListRenderItemFunc({ onItemSelect, onItemSelectAll, selectedKeys, onSelectChange, onChange })
          : rightListRenderItemFunc({
              onItemSelect,
              onItemSelectAll,
              targetKeys,
              onChange,
              onSelectChange,
            });

      return (
        <List
          split={false}
          size="small"
          pagination={false}
          dataSource={filteredItems}
          renderItem={renderItem}
          style={{ pointerEvents: listDisabled ? 'none' : undefined, overflowY: 'auto', padding: '2px 0' }}
        />
      );
    }}
  </Transfer>
);

type CustomTansferProps = Pick<ListTransferProps, 'titles' | 'dataSource' | 'targetKeys' | 'onChange' | 'filterOption'>;

export default function CustomTransfer(props: CustomTansferProps) {
  const {
    titles = ['备选项', '已选项'],
    dataSource,
    targetKeys,
    onChange,
    filterOption = (inputValue, item) => item.title.includes(inputValue.trim()),
  } = props;

  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {
        return targetKeys.includes(source.data.key as string);
      },
      onDrop({ location, source }) {
        // 从location中取出dropTarget
        const target = location.current.dropTargets[0];
        if (!target) {
          return;
        }

        const sourceData = source.data;
        const targetData = target.data;

        const closestEdgeOfTarget = extractClosestEdge(targetData);

        const newTargetKeys = reorderArray<string>(
          targetKeys,
          sourceData.key as string,
          targetData.key as string,
          closestEdgeOfTarget as 'top' | 'bottom',
        );
        // TODO: 这里的参数赋值，再看看有没有问题
        onChange(newTargetKeys, undefined, undefined);
      },
    });
  }, [targetKeys, onChange]);

  return (
    <ListTransfer
      titles={titles}
      dataSource={dataSource}
      targetKeys={targetKeys}
      onChange={onChange}
      filterOption={filterOption}
      leftListRenderItemFunc={defaultLeftListRenderItemFunc}
      rightListRenderItemFunc={defaultRightListRenderItemFunc}
    />
  );
}
