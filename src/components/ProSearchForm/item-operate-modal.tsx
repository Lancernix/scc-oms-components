import { Transfer } from 'antd';
import type { TransferDirection } from 'antd/es/transfer';
import React, { useState } from 'react';
import DataModal, { type DataModalProps } from '../DataModal';
import CustomListTransfer, { type ListTransferItem } from './custom-list-transfer';

interface RecordType {
  key: string;
  title: string;
  disabled: boolean;
  description?: string;
}

type Props = Required<Pick<DataModalProps, 'visible' | 'onCancel' | 'onOk'>> & {
  dataSource: RecordType[];
  targetKeys: string[];
  onTargetKeysChange: (targetKeys: string[]) => void;
};

export default function ItemOperateModal(props: Props) {
  const { dataSource, targetKeys, onTargetKeysChange, ...rest } = props;

  const handleChange = (newTargetKeys: string[], direction: TransferDirection, moveKeys: string[]) => {
    onTargetKeysChange(newTargetKeys);

    console.log('targetKeys: ', newTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  };

  return (
    // TODO: locale
    <DataModal
      {...rest}
      type="edit"
      size="fit"
      title="搜索项编辑"
      contentScrollY={true}
      showResetBtn={false}
      bodyStyle={{ display: 'flex' }}
    >
      <CustomListTransfer
        dataSource={dataSource as ListTransferItem[]}
        targetKeys={targetKeys}
        onChange={handleChange}
      />
    </DataModal>
  );
}
