/**
 * title: 指定时区
 * description: 获取到的值会转换成指定时区的字符串格式，只有在valueType是`string`的时候才生效
 */
import { Button, Form } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { FormDatePickerDayjs, dayjsToString } from 'scc-oms-components';

export default function Index() {
  const [value, setValue] = useState<Record<string, unknown>>();
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then(values => {
      console.log(values);
      setValue(values);
    });
  };

  return (
    <>
      <Form form={form}>
        <FormDatePickerDayjs
          form={form}
          name="create_time"
          fields={['create_time_start', 'create_time_end']}
          valueType="string"
          initialValue={['2024-06-24 08:00:00', '2024-06-25 04:00:00']}
          timeZone="America/Los_Angeles"
          displayTimeZone="Asia/Tokyo"
          showTime
        />
      </Form>
      <Button type="primary" onClick={() => handleSubmit()}>
        提交
      </Button>
      <span style={{ marginLeft: '40px' }}>
        Form获取的值为：
        {JSON.stringify(value)}
      </span>
    </>
  );
}
