"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/json/stringify"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _react = require("react");
var _momentTransform = require("../../utils/momentTransform");
/**
 * 初始值转换成moment对象数组
 */
function convertInitalValue(_value, format) {
  if (!_value.length) {
    return [void 0, void 0];
  }
  return [(0, _momentTransform.valueToMoment)(_value[0], format), (0, _momentTransform.valueToMoment)(_value[1], format)];
}
function useRangePicker(initialValue, options) {
  var form = options.form,
    fields = options.fields,
    format = options.format,
    valueType = options.valueType,
    showTime = options.showTime,
    useStartAndEndOfDay = options.useStartAndEndOfDay;
  var _useState = (0, _react.useState)(convertInitalValue(initialValue, format)),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    initValue = _useState2[0],
    setInitvalue = _useState2[1];

  /**
   * change事件
   */
  function onChange(momentValue) {
    var _result$, _result$2;
    var result = [];
    if (!momentValue || !momentValue.length) {
      form.setFieldsValue((0, _defineProperty2.default)({}, fields[0], void 0));
      form.setFieldsValue((0, _defineProperty2.default)({}, fields[1], void 0));
      return;
    }
    if (momentValue[0]) {
      result[0] = !showTime && useStartAndEndOfDay ? (0, _momentTransform.momentToValue)(momentValue[0].startOf('day'), valueType, format) : (0, _momentTransform.momentToValue)(momentValue[0], valueType, format);
    }
    if (momentValue[1]) {
      result[1] = !showTime && useStartAndEndOfDay ? (0, _momentTransform.momentToValue)(momentValue[1].endOf('day'), valueType, format) : (0, _momentTransform.momentToValue)(momentValue[1], valueType, format);
    }
    form.setFieldsValue((0, _defineProperty2.default)({}, fields[0], (_result$ = result[0]) !== null && _result$ !== void 0 ? _result$ : void 0));
    form.setFieldsValue((0, _defineProperty2.default)({}, fields[1], (_result$2 = result[1]) !== null && _result$2 !== void 0 ? _result$2 : void 0));
  }
  (0, _react.useEffect)(function () {
    setInitvalue(convertInitalValue(initialValue, format));
  }, [(0, _stringify.default)(initialValue), format]);
  return [initValue, onChange];
}
var _default = exports.default = useRangePicker;