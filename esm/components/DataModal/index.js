import _extends from "@babel/runtime-corejs3/helpers/extends";
import _objectSpread from "@babel/runtime-corejs3/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime-corejs3/helpers/objectWithoutProperties";
var _excluded = ["type", "size", "onReset", "onOk", "okText", "resetText", "fetchLoading", "contentScrollY", "bodyStyle", "extraFooter", "children", "onCancel", "title", "showFooter", "confirmLoading"];
import React, { memo } from 'react';
import { Modal as AntdModal, Button, Spin } from 'antd';
import useAdaptiveHeight from "../../hooks/useAdaptiveHeight";
var SIZE_MAP = {
  xs: '400px',
  s: '640px',
  m: '880px',
  l: '1120px',
  xl: '1360px'
};
var TITLE_MAP = {
  view: '详情',
  create: '新建',
  edit: '编辑'
};
var Footer = /*#__PURE__*/memo(function Footer(props) {
  var type = props.type,
    onReset = props.onReset,
    onOk = props.onOk,
    resetText = props.resetText,
    okText = props.okText,
    confirmLoading = props.confirmLoading,
    extraFooter = props.extraFooter,
    onCancel = props.onCancel;
  switch (type) {
    case 'edit':
    case 'create':
      return /*#__PURE__*/React.createElement(React.Fragment, null, extraFooter !== null && extraFooter !== void 0 ? extraFooter : null, /*#__PURE__*/React.createElement(Button, {
        style: {
          marginLeft: '10px'
        },
        key: "reset",
        onClick: onReset
      }, resetText), /*#__PURE__*/React.createElement(Button, {
        style: {
          marginLeft: '10px'
        },
        key: "submit",
        type: "primary",
        onClick: onOk,
        loading: confirmLoading
      }, okText));
    default:
      return /*#__PURE__*/React.createElement(React.Fragment, null, extraFooter !== null && extraFooter !== void 0 ? extraFooter : null, /*#__PURE__*/React.createElement(Button, {
        key: "ok",
        style: {
          marginLeft: '10px'
        },
        type: "primary",
        onClick: onCancel
      }, okText));
  }
});

/**
 * 高度自适应当前视窗的弹窗，常用于详情/创建弹窗的使用
 * @description 为了UI统一，强烈建议使用该组件
 */
export default function DataModal(props) {
  var _props$type = props.type,
    type = _props$type === void 0 ? 'view' : _props$type,
    _props$size = props.size,
    size = _props$size === void 0 ? 'm' : _props$size,
    onReset = props.onReset,
    onOk = props.onOk,
    _props$okText = props.okText,
    okText = _props$okText === void 0 ? '确定' : _props$okText,
    _props$resetText = props.resetText,
    resetText = _props$resetText === void 0 ? '重置' : _props$resetText,
    _props$fetchLoading = props.fetchLoading,
    fetchLoading = _props$fetchLoading === void 0 ? false : _props$fetchLoading,
    _props$contentScrollY = props.contentScrollY,
    contentScrollY = _props$contentScrollY === void 0 ? true : _props$contentScrollY,
    bodyStyle = props.bodyStyle,
    extraFooter = props.extraFooter,
    children = props.children,
    onCancel = props.onCancel,
    title = props.title,
    _props$showFooter = props.showFooter,
    showFooter = _props$showFooter === void 0 ? true : _props$showFooter,
    _props$confirmLoading = props.confirmLoading,
    confirmLoading = _props$confirmLoading === void 0 ? false : _props$confirmLoading,
    rest = _objectWithoutProperties(props, _excluded);
  var maxHeight = useAdaptiveHeight(150, 150, 100);
  return /*#__PURE__*/React.createElement(AntdModal, _extends({}, rest, {
    width: SIZE_MAP[size],
    bodyStyle: _objectSpread(_objectSpread({}, bodyStyle), {}, {
      height: 'fit-content',
      maxHeight: maxHeight,
      overflowY: contentScrollY ? 'auto' : 'hidden'
    }),
    title: title !== null && title !== void 0 ? title : TITLE_MAP[type],
    onOk: onOk,
    okText: okText,
    onCancel: onCancel,
    footer: showFooter ? /*#__PURE__*/React.createElement(Footer, {
      type: type,
      onOk: onOk,
      okText: okText,
      confirmLoading: confirmLoading,
      onReset: onReset,
      resetText: resetText,
      extraFooter: extraFooter,
      onCancel: onCancel
    }) : null
  }), /*#__PURE__*/React.createElement(Spin, {
    spinning: fetchLoading
  }, children));
}