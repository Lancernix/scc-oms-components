import _defineProperty from "@babel/runtime-corejs3/helpers/defineProperty";
import _slicedToArray from "@babel/runtime-corejs3/helpers/slicedToArray";
import _JSON$stringify from "@babel/runtime-corejs3/core-js/json/stringify";
import { useEffect, useState } from 'react';
import { momentToValue, valueToMoment } from "../../utils/momentTransform";
/**
 * 初始值转换成moment对象数组
 */
function convertInitalValue(_value, format) {
  if (!_value.length) {
    return [void 0, void 0];
  }
  return [valueToMoment(_value[0], format), valueToMoment(_value[1], format)];
}
function useRangePicker(initialValue, options) {
  var form = options.form,
    fields = options.fields,
    format = options.format,
    valueType = options.valueType,
    showTime = options.showTime,
    useStartAndEndOfDay = options.useStartAndEndOfDay;
  var _useState = useState(convertInitalValue(initialValue, format)),
    _useState2 = _slicedToArray(_useState, 2),
    initValue = _useState2[0],
    setInitvalue = _useState2[1];

  /**
   * change事件
   */
  function onChange(momentValue) {
    var _result$, _result$2;
    var result = [];
    if (!momentValue || !momentValue.length) {
      form.setFieldsValue(_defineProperty({}, fields[0], void 0));
      form.setFieldsValue(_defineProperty({}, fields[1], void 0));
      return;
    }
    if (momentValue[0]) {
      result[0] = !showTime && useStartAndEndOfDay ? momentToValue(momentValue[0].startOf('day'), valueType, format) : momentToValue(momentValue[0], valueType, format);
    }
    if (momentValue[1]) {
      result[1] = !showTime && useStartAndEndOfDay ? momentToValue(momentValue[1].endOf('day'), valueType, format) : momentToValue(momentValue[1], valueType, format);
    }
    form.setFieldsValue(_defineProperty({}, fields[0], (_result$ = result[0]) !== null && _result$ !== void 0 ? _result$ : void 0));
    form.setFieldsValue(_defineProperty({}, fields[1], (_result$2 = result[1]) !== null && _result$2 !== void 0 ? _result$2 : void 0));
  }
  useEffect(function () {
    setInitvalue(convertInitalValue(initialValue, format));
  }, [_JSON$stringify(initialValue), format]);
  return [initValue, onChange];
}
export default useRangePicker;