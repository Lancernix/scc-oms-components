import _extends from "@babel/runtime-corejs3/helpers/extends";
import _objectSpread from "@babel/runtime-corejs3/helpers/objectSpread2";
import _slicedToArray from "@babel/runtime-corejs3/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime-corejs3/helpers/objectWithoutProperties";
var _excluded = ["children", "withConfirm", "onClick", "popconfirmTitle", "popconfirmOkText", "popconfirmCancelText", "loading", "style"];
import React, { useState } from 'react';
import { Button, Popconfirm } from 'antd';
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
    rest = _objectWithoutProperties(props, _excluded);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
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
  return /*#__PURE__*/React.createElement(Popconfirm, {
    title: popconfirmTitle,
    visible: withConfirm ? visible : false,
    onConfirm: handleConfirm,
    onCancel: function onCancel() {
      return setVisible(false);
    },
    okText: popconfirmOkText,
    cancelText: popconfirmCancelText
  }, /*#__PURE__*/React.createElement(Button, _extends({
    type: "link",
    loading: loading,
    onClick: handleBtnClick,
    style: _objectSpread(_objectSpread({}, style), {}, {
      padding: 0,
      height: 'auto',
      margin: '0 4px'
    })
  }, rest), children));
}
export default TableButton;