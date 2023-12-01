/**
 * title: 配合 useValidatedFromValues hook 使用
 * description: 从 Form 中获取的值中还存在原始的字段，通常我们用不到这个字段，这时就可以结合 hook 来从结果中剔除这个字段
 */
import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { FormDatePicker, useValidatedFormValues } from 'scc-oms-components';

export default function Index() {
  const [value, setValue] = useState<Record<string, unknown>>();
  const [form] = Form.useForm();
  const getFormValues = useValidatedFormValues(form);

  const handleSubmit = () => {
    getFormValues([{ name: 'create_time' }]).then(values => {
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
          valueType="secondTimestamp"
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
