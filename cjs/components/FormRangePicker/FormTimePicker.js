"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/concat"));
var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
var _hooks = _interopRequireDefault(require("./hooks"));
var RangePicker = _antd.TimePicker.RangePicker;
/**
 * 默认属性
 */
var formDefaultProps = {
  labelCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 4
    }
  },
  wrapperCol: {
    xs: {
      span: 24
    },
    sm: {
      span: 20
    }
  }
};

/**
 * 一个方便的时间范围选择组件，不再需要手动进行数据类型转换和字段赋值，组件已经替你做了～
 * @description 需要注意的一点是：组件会导致form的数据中多出一个额外的字段，所以需要你在提交的时候去剔除这个字段
 */
function FormTimePicker(props) {
  var _context, _initialValue$, _initialValue$2;
  var label = props.label,
    fields = props.fields,
    name = props.name,
    _props$initialValue = props.initialValue,
    initialValue = _props$initialValue === void 0 ? [void 0, void 0] : _props$initialValue,
    form = props.form,
    rules = props.rules,
    _props$allowClear = props.allowClear,
    allowClear = _props$allowClear === void 0 ? true : _props$allowClear,
    _props$format = props.format,
    format = _props$format === void 0 ? 'HH:mm:ss' : _props$format,
    _props$valueType = props.valueType,
    valueType = _props$valueType === void 0 ? 'string' : _props$valueType,
    _props$formItemLayout = props.formItemLayout,
    formItemLayout = _props$formItemLayout === void 0 ? formDefaultProps : _props$formItemLayout,
    _props$otherRangePick = props.otherRangePickerProps,
    otherRangePickerProps = _props$otherRangePick === void 0 ? {} : _props$otherRangePick,
    _props$otherFormItemP = props.otherFormItemProps,
    otherFormItemProps = _props$otherFormItemP === void 0 ? {} : _props$otherFormItemP;
  var _useRangePicker = (0, _hooks.default)(initialValue, {
      form: form,
      fields: fields,
      valueType: valueType,
      format: format
    }),
    _useRangePicker2 = (0, _slicedToArray2.default)(_useRangePicker, 2),
    initValue = _useRangePicker2[0],
    onChangeValue = _useRangePicker2[1];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_antd.Form.Item, (0, _extends2.default)({
    label: label,
    name: name !== null && name !== void 0 ? name : (0, _concat.default)(_context = "".concat(fields[0], "__")).call(_context, fields[1])
  }, formItemLayout, {
    initialValue: initValue,
    rules: rules
  }, otherFormItemProps), /*#__PURE__*/_react.default.createElement(RangePicker, (0, _extends2.default)({
    onChange: onChangeValue,
    allowClear: allowClear
  }, otherRangePickerProps))), /*#__PURE__*/_react.default.createElement(_antd.Form.Item, {
    hidden: true,
    name: fields[0],
    initialValue: (_initialValue$ = initialValue[0]) !== null && _initialValue$ !== void 0 ? _initialValue$ : ''
  }, /*#__PURE__*/_react.default.createElement(_antd.Input, null)), /*#__PURE__*/_react.default.createElement(_antd.Form.Item, {
    hidden: true,
    name: fields[1],
    initialValue: (_initialValue$2 = initialValue[1]) !== null && _initialValue$2 !== void 0 ? _initialValue$2 : ''
  }, /*#__PURE__*/_react.default.createElement(_antd.Input, null)));
}
var _default = exports.default = FormTimePicker;