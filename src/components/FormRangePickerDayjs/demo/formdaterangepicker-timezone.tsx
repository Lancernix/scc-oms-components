/**
 * title: 根据时区进行转换
 * description: 从 Form 中可以直接取到拆分之后的字段，可以转换成你想要的时区
 */
import { Button, Form } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { FormDateRangePickerDayjs } from 'scc-oms-components';

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
        <Form.Item name="create_time" initialValue={[dayjs(), dayjs().add(3, 'day')]}>
          <FormDateRangePickerDayjs
            form={form}
            fields={['create_time_start', 'create_time_end']}
            fieldValueType="string"
            format="YYYY-MM-DD HH:mm:ss"
            targetTimeZone="Asia/Tokyo"
          />
        </Form.Item>
      </Form>
      <Button style={{ marginRight: '10px' }} onClick={() => form.resetFields()}>
        重置
      </Button>
      <Button type="primary" onClick={() => handleSubmit()}>
        提交
      </Button>
      <div style={{ marginTop: '20px' }}>
        <span>
          当前时区的值为：
          {JSON.stringify({
            create_time_start: form.getFieldValue('create_time')?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
            create_time_end: form.getFieldValue('create_time')?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
          })}
        </span>
        <br />
        <span>
          Form获取的值为（设置为东京时区）：
          {JSON.stringify({ create_time_start: value?.create_time_start, create_time_end: value?.create_time_end })}
        </span>
      </div>
    </>
  );
}
