/**
 * title: 值为秒级时间戳
 * description: 如果需要的是秒级时间戳，如`1698922432`，则传入`valueType='secondTimestamp'`即可
 */
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { TimePickerDayjs, type TimePickerDayjsProps } from 'scc-oms-components';

export default function Index() {
  const [value, setValue] = useState<number>(dayjs().unix());

  const handleChange: TimePickerDayjsProps['onChange'] = val => {
    setValue(val as number);
  };

  return (
    <>
      <TimePickerDayjs valueType="secondTimestamp" value={value} onChange={handleChange} />
      <span style={{ marginLeft: '40px' }}>
        组件值为：
        {value}
      </span>
    </>
  );
}
