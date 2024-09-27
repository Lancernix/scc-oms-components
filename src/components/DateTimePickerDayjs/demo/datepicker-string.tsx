/**
 * title: 值为日期字符串
 * description: 如果你需要的是日期字符串，如`2023-09-09`，则传入`valueType='string'`即可（这也是默认行为）。配合`format`参数，就可以直接获取你想要的数据类型和格式（`format`默认为`'YYYY-MM-DD'`）
 */

import React, { useState } from 'react';
import { DatePickerDayjs, type DatePickerDayjsProps } from 'scc-oms-components';

export default function Index() {
  const [value, setValue] = useState('2023-0909');
  const handleChange: DatePickerDayjsProps['onChange'] = val => {
    setValue(val as string);
  };

  return (
    <>
      <DatePickerDayjs value={value} onChange={handleChange} />
      <span style={{ marginLeft: '40px' }}>
        组件值为：
        {value}
      </span>
    </>
  );
}
