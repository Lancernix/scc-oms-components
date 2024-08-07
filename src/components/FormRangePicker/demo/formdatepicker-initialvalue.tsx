/**
 * title: 初始值的设置
 * description: 组件赋初值的时候，需要注意一点：初始值的类型必须和 valueType 保持一致，不然初始值无法成功解析
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
          initialValue={['2023-09-09', '2023-10-01']} // 这里的初始值类型和 valueType 不一致，会导致解析有问题
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
}
