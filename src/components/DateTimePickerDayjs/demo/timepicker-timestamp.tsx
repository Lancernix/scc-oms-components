/**
 * title: 值为毫秒级时间戳
 * description: 如果需要的是毫秒级时间戳，如`1698922432885`，则传入`valueType='timestamp'`即可
 */
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { TimePickerDayjs, type TimePickerDayjsProps } from 'scc-oms-components';

export default function Index() {
  const [value, setValue] = useState<number>(dayjs().valueOf());

  const handleChange: TimePickerDayjsProps['onChange'] = (val, dayjsValue) => {
    setValue(val as number);
    console.log(dayjsValue);
  };

  return (
    <>
      <TimePickerDayjs valueType="timestamp" value={value} onChange={handleChange} />
      <span style={{ marginLeft: '40px' }}>
        组件值为：
        {value}
      </span>
    </>
  );
}
