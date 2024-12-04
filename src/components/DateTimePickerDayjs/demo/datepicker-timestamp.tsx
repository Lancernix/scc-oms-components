/**
 * title: 值为毫秒级时间戳
 * description: 如果需要的是毫秒级时间戳，如`1698922432885`，则传入`valueType='timestamp'`即可
 */
import moment from 'moment';
import React, { useState } from 'react';
import { DatePickerDayjs, type DatePickerDayjsProps } from 'scc-oms-components';
import { momentToMillisecond } from 'utils/momentTransform';

export default function Index() {
  const [value, setValue] = useState<number>(momentToMillisecond(moment()));

  const handleChange: DatePickerDayjsProps<'timestamp'>['onChange'] = (val, dayjsValue) => {
    setValue(val);
    console.log(dayjsValue);
  };

  return (
    <>
      <DatePickerDayjs valueType="timestamp" value={value} onChange={handleChange} format="YYYY-MM-DD" />
      <span style={{ marginLeft: '40px' }}>
        组件值为：
        {value}
      </span>
    </>
  );
}
