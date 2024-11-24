import { SettingOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { sortBy } from 'lodash-es';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SearchForm, { type SearchFormProps } from '../SearchForm';
import ItemOperateModal from './item-operate-modal';

type ProFieldItem = SearchFormProps['items'][number] & {
  /**
   * 是否是已选项
   * @description 已选即表示展示在表单中
   * @default true
   */
  selected?: boolean;
  /**
   * 是否是固定字段
   * @description 即固定在表单中，不可以设置为不展示，优先级高于selected
   * @default false
   */
  pinned?: boolean;
  /**
   * 展示顺序
   */
  displayOrder: number;
};

type SortedItem = ProFieldItem & { key: string; title: string; disabled: boolean };

type Props<VT> = Omit<SearchFormProps<VT>, 'extraOperateNode' | 'items'> & {
  /**
   * 表单项数组
   * @description 相比于SearchForm的item，多了一些展示、顺序相关的属性
   */
  items: ProFieldItem[];
  /**
   * 一次完整的排序操作结束时的回调
   * @param newItems 修改过items
   * @description 并不是每排序一次都会触发，而是当整个操作结束后才触发（具体来说就是关闭操作弹窗时触发）
   */
  onSortFinished?: (newItems: ProFieldItem[]) => void;
};

// 实际应该是弹窗内点击了【确定】按钮，操作才生效
// 现在是只要内部有移动，就会导致外部的selectedKeys变化
// 需要改成点击了确定按钮之后再将内部的selectedKeys同步给父组件

// 内部左侧不能全选（右侧能吗？）

/**
 * 根据传入的items和selectedKeys计算新的displayedItems
 * @param items 传入的items
 * @param selectedKeys 选中的key数组
 */
const calcDisplayedItems = (items: ProFieldItem[], selectedKeys: string[]): SearchFormProps['items'] => {
  const keyIndexMap: Record<string, number> = {};
  // 先获取所有选中的key和对应的顺序
  selectedKeys.forEach((key, index) => {
    keyIndexMap[key] = index + 1;
  });
  // 筛选选中的item并根据keyIndexMap排序
  const newDisplayedItems = items
    .filter(item => keyIndexMap[item.name.toString()] !== undefined)
    .sort((a, b) => keyIndexMap[a.name.toString()] - keyIndexMap[b.name.toString()])
    .map(item => {
      const { displayOrder, selected, pinned, ...rest } = item;
      return rest;
    });
  return newDisplayedItems;
};

export default function ProSearchForm<FormValue = Record<string, unknown>>(props: Props<FormValue>) {
  const { items, onSortFinished, ...rest } = props;
  const [modalVisible, setModalVisible] = useState(false);
  // 用于穿梭框的数据源
  const [sortedItems, setSortedItems] = useState<SortedItem[]>([]);
  // 用于穿梭框选中的key
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  // 表单中展示的表单项
  const [displayedItems, setDisplayedItems] = useState<SearchFormProps['items']>([]);

  // 如果items变化，要同步更新sortedItems、selectedKeys、displayedItems
  useEffect(() => {
    const sortedAllItems = sortBy(items, item => item.displayOrder);
    const res = [];
    const keys = [];
    for (const item of sortedAllItems) {
      // 给selected字段，设置默认值true
      if (item.selected === undefined) {
        item.selected = true;
      }
      res.push({
        ...item,
        key: item.name.toString(),
        title: item.label.toString(),
        disabled: item.pinned,
      });
      if (item.pinned || item.selected) {
        keys.push(item.name.toString());
      }
    }
    const newDisplayedItems = calcDisplayedItems(items, keys);
    setSelectedKeys(keys);
    setSortedItems(res);
    setDisplayedItems(newDisplayedItems);
  }, [items]);

  // 排序结束后最终的结果数组
  const resItems = useMemo(() => {
    const keyIndexMap: Record<string, number> = {};
    // 先获取所有选中的key和对应的顺序
    selectedKeys.forEach((key, index) => {
      keyIndexMap[key] = index + 1;
    });
    const newSortedItems = items.map<ProFieldItem>(item => {
      return {
        ...item,
        selected: keyIndexMap[item.name.toString()] !== undefined,
        displayOrder: keyIndexMap[item.name.toString()] ?? item.displayOrder,
      };
    });
    return newSortedItems;
  }, [items, selectedKeys]);

  // 更新表单中展示的表单项
  useEffect(() => {
    // 只有关闭弹窗的时候才更新
    if (!modalVisible) {
      const newDisplayedItems = calcDisplayedItems(items, selectedKeys);
      setDisplayedItems(newDisplayedItems);
    }
  }, [modalVisible, selectedKeys, items]);

  /**
   * 弹窗打开/关闭的回调
   * @param visible 弹窗状态
   * @param emitted 是否提交数据变更
   */
  const handleModalVisibleChange = useCallback(
    (visible: boolean, emitted: boolean) => {
      setModalVisible(visible);
      // 用户触发了数据变更，才调用onSortFinished
      if (emitted && onSortFinished) {
        onSortFinished(resItems);
      }
    },
    [onSortFinished, resItems],
  );

  const extraNode = useMemo(
    () => <Button icon={<SettingOutlined />} type="text" onClick={() => handleModalVisibleChange(true, false)} />,
    [handleModalVisibleChange],
  );

  return (
    <>
      <SearchForm items={displayedItems} {...rest} extraOperateNode={extraNode} />
      <ItemOperateModal
        dataSource={sortedItems}
        targetKeys={selectedKeys}
        onTargetKeysChange={newKeys => setSelectedKeys(newKeys)}
        visible={modalVisible}
        onCancel={() => handleModalVisibleChange(false, false)}
        onOk={() => handleModalVisibleChange(false, true)}
      />
    </>
  );
}

export type ProSearchFormProps<VT = Record<string, unknown>> = Props<VT>;
