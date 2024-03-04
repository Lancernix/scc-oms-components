"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard").default;
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.DatePicker = DatePicker;
exports.TimePicker = TimePicker;
var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _momentTransform = require("../../utils/momentTransform");
var _excluded = ["value", "onChange", "valueType", "format", "picker"],
  _excluded2 = ["value", "onChange", "valueType", "format"];
/** 日期组件 */
function DatePicker(props) {
  var value = props.value,
    onChange = props.onChange,
    _props$valueType = props.valueType,
    valueType = _props$valueType === void 0 ? 'string' : _props$valueType,
    _props$format = props.format,
    format = _props$format === void 0 ? 'YYYY-MM-DD HH:mm:ss' : _props$format,
    picker = props.picker,
    rest = (0, _objectWithoutProperties2.default)(props, _excluded);

  // 转换成antd需要的moment对象
  var momentValue = (0, _react.useMemo)(function () {
    return (0, _momentTransform.valueToMoment)(value, format);
  }, [format, value]);
  var handleChange = function handleChange(val) {
    var newVal = (0, _momentTransform.momentToValue)(val, valueType, format);
    onChange === null || onChange === void 0 || onChange(newVal);
  };
  return /*#__PURE__*/_react.default.createElement(_antd.DatePicker, (0, _extends2.default)({
    value: momentValue,
    onChange: handleChange,
    format: format,
    picker: picker
  }, rest));
}
/** 时间组件 */
function TimePicker(props) {
  var value = props.value,
    onChange = props.onChange,
    _props$valueType2 = props.valueType,
    valueType = _props$valueType2 === void 0 ? 'string' : _props$valueType2,
    _props$format2 = props.format,
    format = _props$format2 === void 0 ? 'HH:mm:ss' : _props$format2,
    rest = (0, _objectWithoutProperties2.default)(props, _excluded2);
  var momentValue = (0, _react.useMemo)(function () {
    return (0, _momentTransform.valueToMoment)(value, format);
  }, [format, value]);
  var handleChange = function handleChange(val) {
    var newVal = (0, _momentTransform.momentToValue)(val, valueType, format);
    onChange === null || onChange === void 0 || onChange(newVal);
  };
  return /*#__PURE__*/_react.default.createElement(_antd.TimePicker, (0, _extends2.default)({
    value: momentValue,
    onChange: handleChange,
    format: format
  }, rest));
}