import type { FormInstance } from 'antd';
import type { Moment } from 'moment';
import { useMemo } from 'react';
import { momentToValue, valueToMoment } from 'utils/momentTransform';

interface IOptions {
  form: FormInstance; // formInstance
  fields: [string, string]; // 时间的两个字段
  format: string; // 格式化
  valueType: 'string' | 'secondTimestamp' | 'timestamp' | 'moment'; // 数据类型
  timeZone?: string; // 提交时的需要的时区
  sourceTimeZone?: string; // value来源时区
  useStartAndEndOfDay?: boolean; // 只展示日期时，是否格式化时间为一天的开始和结束
  showTime?: boolean; // 是否展示时间数据
}

/**
 * 初始值转换成moment对象数组
 */
function convertInitalValue(
  _value: Array<Moment | string | number>,
  valueType: 'string' | 'secondTimestamp' | 'timestamp' | 'moment',
  format: string,
  sourceTimeZone?: string,
): [Moment, Moment] {
  if (!_value?.length) {
    return [void 0, void 0];
  }
  return [
    valueToMoment(_value[0], valueType, format, sourceTimeZone),
    valueToMoment(_value[1], valueType, format, sourceTimeZone),
  ];
}

function useRangePicker(initialValue: [Moment, Moment] | [string, string] | [number, number], options: IOptions) {
  const { form, fields, format, valueType, timeZone, sourceTimeZone, showTime, useStartAndEndOfDay } = options;
  const initValue = useMemo(() => {
    return convertInitalValue(initialValue, valueType, format, sourceTimeZone);
  }, [initialValue, valueType, format, sourceTimeZone]);

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
          ? momentToValue(momentValue[0].startOf('day'), valueType, format, timeZone)
          : momentToValue(momentValue[0], valueType, format, timeZone);
    }
    if (momentValue[1]) {
      result[1] =
        !showTime && useStartAndEndOfDay
          ? momentToValue(momentValue[1].endOf('day'), valueType, format, timeZone)
          : momentToValue(momentValue[1], valueType, format, timeZone);
    }
    form.setFieldsValue({ [fields[0]]: result[0] ?? void 0 });
    form.setFieldsValue({ [fields[1]]: result[1] ?? void 0 });
  }

  return [initValue, onChange] as [typeof initValue, typeof onChange];
}

export default useRangePicker;
