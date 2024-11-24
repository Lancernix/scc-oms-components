import type { FormInstance } from 'antd';
import type { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import { dayjsToValue, valueToDayjs } from 'utils/dayjsTransform';

interface IOptions {
  form: FormInstance; // formInstance
  fields: [string, string]; // 时间的两个字段
  format: string; // 格式化
  valueType: 'string' | 'secondTimestamp' | 'timestamp' | 'dayjs'; // 数据类型
  timeZone?: string; // 提交时的需要的时区
  sourceTimeZone?: string; // value来源时区
  useStartAndEndOfDay?: boolean; // 只展示日期时，是否格式化时间为一天的开始和结束
  showTime?: boolean; // 是否展示时间数据
}

/**
 * 初始值转换成Dayjs对象数组
 */
function convertInitalValue(
  _value: Array<Dayjs | string | number>,
  valueType: IOptions['valueType'],
  format: string,
  sourceTimeZone?: string,
): [Dayjs, Dayjs] {
  if (!_value?.length) {
    return [void 0, void 0];
  }
  return [
    valueToDayjs(_value[0], valueType, format, sourceTimeZone),
    valueToDayjs(_value[1], valueType, format, sourceTimeZone),
  ];
}

function useRangePicker(initialValue: [Dayjs, Dayjs] | [string, string] | [number, number], options: IOptions) {
  const { form, fields, format, valueType, timeZone, sourceTimeZone, showTime, useStartAndEndOfDay } = options;
  const initValue = useMemo(() => {
    return convertInitalValue(initialValue, valueType, format, sourceTimeZone);
  }, [initialValue, valueType, format, sourceTimeZone]);

  /**
   * change事件
   */
  function onChange(dayjsValue: [Dayjs, Dayjs]) {
    const result = [];
    if (!dayjsValue || !dayjsValue.length) {
      form.setFieldsValue({ [fields[0]]: void 0 });
      form.setFieldsValue({ [fields[1]]: void 0 });
      return;
    }
    if (dayjsValue[0]) {
      result[0] =
        !showTime && useStartAndEndOfDay
          ? dayjsToValue(dayjsValue[0].startOf('day'), valueType, format, timeZone)
          : dayjsToValue(dayjsValue[0], valueType, format, timeZone);
    }
    if (dayjsValue[1]) {
      result[1] =
        !showTime && useStartAndEndOfDay
          ? dayjsToValue(dayjsValue[1].endOf('day'), valueType, format, timeZone)
          : dayjsToValue(dayjsValue[1], valueType, format, timeZone);
    }

    form.setFieldsValue({ [fields[0]]: result[0] ?? void 0 });
    form.setFieldsValue({ [fields[1]]: result[1] ?? void 0 });
  }

  return [initValue, onChange] as [typeof initValue, typeof onChange];
}

export default useRangePicker;
