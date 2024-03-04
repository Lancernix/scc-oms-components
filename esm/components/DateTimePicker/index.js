import _extends from "@babel/runtime-corejs3/helpers/extends";
import _objectWithoutProperties from "@babel/runtime-corejs3/helpers/objectWithoutProperties";
var _excluded = ["value", "onChange", "valueType", "format", "picker"],
  _excluded2 = ["value", "onChange", "valueType", "format"];
import React, { useMemo } from 'react';
import { DatePicker as AntdDatePicker, TimePicker as AntdTimePicker } from 'antd';
import { momentToValue, valueToMoment } from "../../utils/momentTransform";
/** 日期组件 */
export function DatePicker(props) {
  var value = props.value,
    onChange = props.onChange,
    _props$valueType = props.valueType,
    valueType = _props$valueType === void 0 ? 'string' : _props$valueType,
    _props$format = props.format,
    format = _props$format === void 0 ? 'YYYY-MM-DD HH:mm:ss' : _props$format,
    picker = props.picker,
    rest = _objectWithoutProperties(props, _excluded);

  // 转换成antd需要的moment对象
  var momentValue = useMemo(function () {
    return valueToMoment(value, format);
  }, [format, value]);
  var handleChange = function handleChange(val) {
    var newVal = momentToValue(val, valueType, format);
    onChange === null || onChange === void 0 || onChange(newVal);
  };
  return /*#__PURE__*/React.createElement(AntdDatePicker, _extends({
    value: momentValue,
    onChange: handleChange,
    format: format,
    picker: picker
  }, rest));
}
/** 时间组件 */
export function TimePicker(props) {
  var value = props.value,
    onChange = props.onChange,
    _props$valueType2 = props.valueType,
    valueType = _props$valueType2 === void 0 ? 'string' : _props$valueType2,
    _props$format2 = props.format,
    format = _props$format2 === void 0 ? 'HH:mm:ss' : _props$format2,
    rest = _objectWithoutProperties(props, _excluded2);
  var momentValue = useMemo(function () {
    return valueToMoment(value, format);
  }, [format, value]);
  var handleChange = function handleChange(val) {
    var newVal = momentToValue(val, valueType, format);
    onChange === null || onChange === void 0 || onChange(newVal);
  };
  return /*#__PURE__*/React.createElement(AntdTimePicker, _extends({
    value: momentValue,
    onChange: handleChange,
    format: format
  }, rest));
}