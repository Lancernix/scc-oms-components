/**
 * title: 根据时区进行转换
 * description: 可以传入`sourceTimeZone`指定给定的日期字符串是哪个时区下的；也可以传入`timezone`将获取到的值换成目标时区的字符串（只有在valueType是`string`的时候才生效）
 */

import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { FormDatePickerDayjs } from 'scc-oms-components';

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
          sourceTimeZone="Asia/Tokyo"
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
