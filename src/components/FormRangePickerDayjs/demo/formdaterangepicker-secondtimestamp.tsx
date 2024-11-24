/**
 * title: 格式为秒级时间戳
 * description: 从 Form 中可以直接取到拆分之后的字段，默认格式为秒级时间戳
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
        <Form.Item name="create_time" initialValue={[dayjs(), dayjs().add(1, 'day')]}>
          <FormDateRangePickerDayjs
            form={form}
            fields={['create_time_start', 'create_time_end']}
            format="YYYY-MM-DD"
            fieldValueType="secondTimestamp"
          />
        </Form.Item>
      </Form>
      <Button style={{ marginRight: '10px' }} onClick={() => form.resetFields()}>
        重置
      </Button>
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
