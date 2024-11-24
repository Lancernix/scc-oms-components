/**
 * title: 值为日期字符串，且增加了时区转换
 * description: 可以根据传入的时区进行转换，只有在`valueType`为`string`的时候才有意义
 */

import { Button } from 'antd';
import React, { useState } from 'react';
import { TimePickerDayjs, type TimePickerDayjsProps } from 'scc-oms-components';

export default function Index() {
  const [value, setValue] = useState('18:00:00');
  const handleChange: TimePickerDayjsProps['onChange'] = (val, dayjsValue) => {
    setValue(val as string);
    console.log(dayjsValue);
  };

  return (
    <>
      <TimePickerDayjs value={value} onChange={handleChange} targetTimeZone="Asia/Tokyo" sourceTimeZone="Asia/Tokyo" />
      <span style={{ marginLeft: '40px' }}>
        组件值为（东京时区）：
        {value}
      </span>
      <div style={{ marginTop: '20px' }}>
        <Button type="primary" onClick={() => setValue('12:00:00')}>
          修改一下
        </Button>
        <Button type="primary" style={{ marginLeft: '20px' }} onClick={() => setValue('18:00:00')}>
          重置
        </Button>
      </div>
    </>
  );
}
