import _extends from "@babel/runtime-corejs3/helpers/extends";
import _slicedToArray from "@babel/runtime-corejs3/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime-corejs3/helpers/objectWithoutProperties";
var _excluded = ["picker"];
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js/instance/concat";
import React from 'react';
import { DatePicker, Form, Input } from 'antd';
import useRangePicker from "./hooks";
var RangePicker = DatePicker.RangePicker;
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
 * 一个方便的日期范围选择组件，不再需要手动进行数据类型转换和字段赋值，组件已经替你做了～
 * @description 需要注意的一点是：组件会导致form的数据中多出一个额外的字段，所以需要你在提交的时候去剔除这个字段，可以用useValidatedFormValues来完成
 */
function FormDatePicker(props) {
  var _context, _initialValue$, _initialValue$2;
  var label = props.label,
    name = props.name,
    rules = props.rules,
    _props$allowClear = props.allowClear,
    allowClear = _props$allowClear === void 0 ? true : _props$allowClear,
    fields = props.fields,
    _props$initialValue = props.initialValue,
    initialValue = _props$initialValue === void 0 ? [void 0, void 0] : _props$initialValue,
    form = props.form,
    _props$showTime = props.showTime,
    showTime = _props$showTime === void 0 ? false : _props$showTime,
    _props$useStartAndEnd = props.useStartAndEndOfDay,
    useStartAndEndOfDay = _props$useStartAndEnd === void 0 ? false : _props$useStartAndEnd,
    _props$format = props.format,
    format = _props$format === void 0 ? 'YYYY-MM-DD HH:mm:ss' : _props$format,
    _props$valueType = props.valueType,
    valueType = _props$valueType === void 0 ? 'string' : _props$valueType,
    _props$formItemLayout = props.formItemLayout,
    formItemLayout = _props$formItemLayout === void 0 ? formDefaultProps : _props$formItemLayout,
    _props$otherRangePick = props.otherRangePickerProps,
    otherRangePickerProps = _props$otherRangePick === void 0 ? {} : _props$otherRangePick,
    _props$otherFormItemP = props.otherFormItemProps,
    otherFormItemProps = _props$otherFormItemP === void 0 ? {} : _props$otherFormItemP;
  var picker = otherRangePickerProps.picker,
    rest = _objectWithoutProperties(otherRangePickerProps, _excluded);
  var _useRangePicker = useRangePicker(initialValue, {
      form: form,
      fields: fields,
      valueType: valueType,
      format: format,
      useStartAndEndOfDay: useStartAndEndOfDay,
      showTime: showTime
    }),
    _useRangePicker2 = _slicedToArray(_useRangePicker, 2),
    initValue = _useRangePicker2[0],
    onChangeValue = _useRangePicker2[1];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Form.Item, _extends({
    label: label,
    name: name !== null && name !== void 0 ? name : _concatInstanceProperty(_context = "".concat(fields[0], "__")).call(_context, fields[1])
  }, formItemLayout, {
    initialValue: initValue,
    rules: rules
  }, otherFormItemProps), /*#__PURE__*/React.createElement(RangePicker, _extends({
    showTime: showTime,
    picker: picker,
    allowClear: allowClear,
    onChange: onChangeValue
  }, rest))), /*#__PURE__*/React.createElement(Form.Item, {
    hidden: true,
    name: fields[0],
    initialValue: (_initialValue$ = initialValue[0]) !== null && _initialValue$ !== void 0 ? _initialValue$ : ''
  }, /*#__PURE__*/React.createElement(Input, null)), /*#__PURE__*/React.createElement(Form.Item, {
    hidden: true,
    name: fields[1],
    initialValue: (_initialValue$2 = initialValue[1]) !== null && _initialValue$2 !== void 0 ? _initialValue$2 : ''
  }, /*#__PURE__*/React.createElement(Input, null)));
}
export default FormDatePicker;