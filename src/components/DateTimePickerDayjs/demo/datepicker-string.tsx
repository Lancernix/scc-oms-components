/**
 * title: 值为日期字符串
 * description: 如果你需要的是日期字符串，如`2023-09-09`，则传入`valueType='string'`即可。配合`format`参数，就可以直接获取你想要的数据类型和格式（`format`默认为`'YYYY-MM-DD'`）
 */
import { Button, Form } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { DatePickerDayjs, type DatePickerDayjsProps } from 'scc-oms-components';

const formValue = {
  date: '2023-09-09 18:00:00',
};

export default function Index() {
  const [value, setValue] = useState('2023-09-09 18:00:00');
  const handleChange: DatePickerDayjsProps<'string'>['onChange'] = (val, dayjsValue) => {
    setValue(val);
    console.log(dayjsValue);
  };

  const [form] = Form.useForm();
  const formDate = Form.useWatch('date', form);

  useEffect(() => {
    console.log('🚀form值变化', formDate);
  }, [formDate]);

  return (
    <>
      <DatePickerDayjs
        valueType="string"
        value={value}
        useEndOfDay="YYYY-MM-DD HH:mm:ss"
        onChange={handleChange}
        format="YYYY-MM-DD"
      />
      <span style={{ marginLeft: '40px' }}>
        组件值为：
        {value}
      </span>

      <Form form={form} initialValues={formValue}>
        <Form.Item label="日期选择器" name={'date'}>
          <DatePickerDayjs valueType="string" />
        </Form.Item>
      </Form>
      <Button onClick={() => form.resetFields()}>重置</Button>
    </>
  );
}
