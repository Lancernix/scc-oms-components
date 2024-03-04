"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard").default;
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectSpread2"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));
var _react = _interopRequireWildcard(require("react"));
var _antd = require("antd");
var _excluded = ["children", "withConfirm", "onClick", "popconfirmTitle", "popconfirmOkText", "popconfirmCancelText", "loading", "style"];
function TableButton(props) {
  var children = props.children,
    _props$withConfirm = props.withConfirm,
    withConfirm = _props$withConfirm === void 0 ? false : _props$withConfirm,
    onClick = props.onClick,
    _props$popconfirmTitl = props.popconfirmTitle,
    popconfirmTitle = _props$popconfirmTitl === void 0 ? '确定执行该操作吗？' : _props$popconfirmTitl,
    _props$popconfirmOkTe = props.popconfirmOkText,
    popconfirmOkText = _props$popconfirmOkTe === void 0 ? '确定' : _props$popconfirmOkTe,
    _props$popconfirmCanc = props.popconfirmCancelText,
    popconfirmCancelText = _props$popconfirmCanc === void 0 ? '取消' : _props$popconfirmCanc,
    loading = props.loading,
    style = props.style,
    rest = (0, _objectWithoutProperties2.default)(props, _excluded);
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    visible = _useState2[0],
    setVisible = _useState2[1];
  var handleBtnClick = function handleBtnClick(e) {
    if (withConfirm) {
      setVisible(true);
      return;
    }
    onClick === null || onClick === void 0 || onClick(e);
  };
  var handleConfirm = function handleConfirm(e) {
    if (withConfirm) {
      onClick === null || onClick === void 0 || onClick(e);
      setVisible(false);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_antd.Popconfirm, {
    title: popconfirmTitle,
    visible: withConfirm ? visible : false,
    onConfirm: handleConfirm,
    onCancel: function onCancel() {
      return setVisible(false);
    },
    okText: popconfirmOkText,
    cancelText: popconfirmCancelText
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, (0, _extends2.default)({
    type: "link",
    loading: loading,
    onClick: handleBtnClick,
    style: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, style), {}, {
      padding: 0,
      height: 'auto',
      margin: '0 4px'
    })
  }, rest), children));
}
var _default = exports.default = TableButton;