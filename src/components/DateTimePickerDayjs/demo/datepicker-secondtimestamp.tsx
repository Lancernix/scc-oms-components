/**
 * title: 值为秒级时间戳
 * description: 如果需要的是秒级时间戳，如`1698922432`，则传入`valueType='secondTimestamp'`即可
 */
import moment from 'moment';
import React, { useState } from 'react';
import { DatePickerDayjs, type DatePickerDayjsProps } from 'scc-oms-components';
import { momentToSecond } from 'utils/momentTransform';

export default function Index() {
  const [value, setValue] = useState<number>(momentToSecond(moment()));

  const handleChange: DatePickerDayjsProps['onChange'] = (val, dayjsValue) => {
    setValue(val as number);
    console.log(dayjsValue);
  };

  return (
    <>
      <DatePickerDayjs valueType="secondTimestamp" value={value} onChange={handleChange} format="YYYY-MM-DD" />
      <span style={{ marginLeft: '40px' }}>
        组件值为：
        {value}
      </span>
    </>
  );
}
