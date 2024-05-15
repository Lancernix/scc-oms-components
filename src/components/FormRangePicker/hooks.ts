import type { FormInstance } from 'antd';
import type { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { momentToValue, valueToMoment } from 'utils/momentTransform';

interface IOptions {
  form: FormInstance; // formInstance
  fields: [string, string]; // 时间的两个字段
  format: string; // 格式化
  valueType: 'string' | 'secondTimestamp' | 'timestamp' | 'moment'; // 数据类型
  useStartAndEndOfDay?: boolean; // 只展示日期时，是否格式化时间为一天的开始和结束
  showTime?: boolean; // 是否展示时间数据
}

/**
 * 初始值转换成moment对象数组
 */
function convertInitalValue(_value: Array<Moment | string | number>, format: string): [Moment, Moment] {
  if (!_value.length) {
    return [void 0, void 0];
  }
  return [valueToMoment(_value[0], format), valueToMoment(_value[1], format)];
}

function useRangePicker(initialValue: [Moment, Moment] | [string, string] | [number, number], options: IOptions) {
  const { form, fields, format, valueType, showTime, useStartAndEndOfDay } = options;
  const [initValue, setInitvalue] = useState<[Moment, Moment]>(convertInitalValue(initialValue, format));

  /**
   * change事件
   */
  function onChange(momentValue: [Moment, Moment]) {
    const result = [];
    if (!momentValue || !momentValue.length) {
      form.setFieldsValue({ [fields[0]]: void 0 });
      form.setFieldsValue({ [fields[1]]: void 0 });
      return;
    }
    if (momentValue[0]) {
      result[0] =
        !showTime && useStartAndEndOfDay
          ? momentToValue(momentValue[0].startOf('day'), valueType, format)
          : momentToValue(momentValue[0], valueType, format);
    }
    if (momentValue[1]) {
      result[1] =
        !showTime && useStartAndEndOfDay
          ? momentToValue(momentValue[1].endOf('day'), valueType, format)
          : momentToValue(momentValue[1], valueType, format);
    }
    form.setFieldsValue({ [fields[0]]: result[0] ?? void 0 });
    form.setFieldsValue({ [fields[1]]: result[1] ?? void 0 });
  }

  useEffect(() => {
    setInitvalue(convertInitalValue(initialValue, format));
  }, [initialValue, format]);

  return [initValue, onChange] as [typeof initValue, typeof onChange];
}

export default useRangePicker;
