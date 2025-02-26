/**
 * title: 值为时间字符串
 * description: 如果需要的是时间字符串，如`09:09:45`，则传入`valueType='string'`即可。获取你想要的值时，也需要配合`format`参数来实现（默认的`format`值为`'HH:mm:ss'`）
 */
import React, { useState } from 'react';
import { TimePickerDayjs, type TimePickerDayjsProps } from 'scc-oms-components';

export default function Index() {
  const [value, setValue] = useState('09:09:09');

  const handleChange: TimePickerDayjsProps<'string'>['onChange'] = (val, dayjsValue) => {
    setValue(val);
    console.log(dayjsValue);
  };

  return (
    <>
      <TimePickerDayjs valueType="string" value={value} onChange={handleChange} />
      <span style={{ marginLeft: '40px' }}>
        组件值为：
        {value}
      </span>
    </>
  );
}
