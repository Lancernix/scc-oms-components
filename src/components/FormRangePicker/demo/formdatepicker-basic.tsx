/**
 * title: 基础用法
 * description: 从 Form 中可以直接取到拆分之后的字段，且格式是你所需要的格式
 */
import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { FormDatePicker } from 'scc-oms-components';

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
        <FormDatePicker
          form={form}
          name="create_time"
          fields={['create_time_start', 'create_time_end']}
          valueType="string"
          format="YYYY-MM-DD"
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
};
