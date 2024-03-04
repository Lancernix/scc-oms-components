"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js/object/define-property");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard").default;
_Object$defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FormTable;
var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/map"));
var _antd = require("antd");
var _react = _interopRequireWildcard(require("react"));
var _icons = require("@ant-design/icons");
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _excluded = ["requiredMark", "hidden", "editable", "component", "rules", "initialValue", "tooltip"];
var StyledTable = (0, _styledComponents.default)(_antd.Table).withConfig({
  displayName: "StyledTable",
  componentId: "scc-oms-components__sc-s9a7ig-0"
})([".ant-table-thead > tr > th,.ant-table-tbody > tr > td,.ant-table tfoot > tr > th,.ant-table tfoot > tr > td{padding:8px;}.hidden{display:none;}.ant-table-thead > tr > th.ant-table-cell{.required-mark{color:#ff4d4f;margin-right:4px;}.title-icon{vertical-align:-0.2em;margin-left:4px;}}"]);

/** FormTableColumn类型定义 */

/** 字段展示组件 */
var Display = /*#__PURE__*/(0, _react.memo)(function Display(_ref) {
  var value = _ref.value;
  return /*#__PURE__*/_react.default.createElement("span", null, value);
});

/** 扩展title展示组件 */
var Title = /*#__PURE__*/(0, _react.memo)(function RequiredTitle(_ref2) {
  var title = _ref2.title,
    requiredMark = _ref2.requiredMark,
    tooltip = _ref2.tooltip;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, requiredMark ? /*#__PURE__*/_react.default.createElement("span", {
    className: "required-mark"
  }, "*") : null, title, tooltip ? /*#__PURE__*/_react.default.createElement(_antd.Tooltip, {
    title: tooltip
  }, /*#__PURE__*/_react.default.createElement(_icons.QuestionCircleOutlined, {
    className: "title-icon"
  })) : null);
});

/** 生成Antd需要的columns */
function genFormTableColumns(originColumns, _ref3) {
  var remove = _ref3.remove,
    add = _ref3.add,
    move = _ref3.move;
  return (0, _map.default)(originColumns).call(originColumns, function (originCol) {
    var resCol = {};
    // 一般是操作列
    if (typeof originCol === 'function') {
      resCol = originCol({
        remove: remove,
        add: add,
        move: move
      });
    } else {
      var _originCol$children;
      // 其他正常列
      if ((_originCol$children = originCol.children) !== null && _originCol$children !== void 0 && _originCol$children.length) {
        // 嵌套表头
        resCol.title = originCol.requiredMark ? /*#__PURE__*/_react.default.createElement(Title, {
          title: originCol.title,
          tooltip: originCol.tooltip,
          requiredMark: originCol.requiredMark
        }) : originCol.title;
        resCol.children = genFormTableColumns(originCol.children, {
          remove: remove,
          add: add,
          move: move
        });
      } else {
        var _originCol$key;
        var _originCol$requiredMa = originCol.requiredMark,
          requiredMark = _originCol$requiredMa === void 0 ? false : _originCol$requiredMa,
          _originCol$hidden = originCol.hidden,
          hidden = _originCol$hidden === void 0 ? false : _originCol$hidden,
          _originCol$editable = originCol.editable,
          editable = _originCol$editable === void 0 ? false : _originCol$editable,
          component = originCol.component,
          rules = originCol.rules,
          initialValue = originCol.initialValue,
          tooltip = originCol.tooltip,
          rest = (0, _objectWithoutProperties2.default)(originCol, _excluded);
        resCol = rest;
        // 正常表头
        resCol.title = requiredMark || tooltip ? /*#__PURE__*/_react.default.createElement(Title, {
          title: originCol.title,
          tooltip: tooltip,
          requiredMark: requiredMark
        }) : originCol.title;
        resCol.key = (_originCol$key = originCol.key) !== null && _originCol$key !== void 0 ? _originCol$key : originCol.dataIndex;
        resCol.width = originCol.width;
        if (hidden) {
          resCol.className = 'hidden'; // 通过display来控制列的隐藏
          resCol.colSpan = 0; // 同时需要设置一下colSpan，不然在表头分组时会出现列错位
        }
        if (originCol.render) {
          // 有render则直接使用（render优先级高）
          resCol.render = originCol.render;
        } else if (editable) {
          // 没有则根据editbale、component生成对应的render方法
          if (!component) {
            console.error('When `editable` is true, `component` cannot be empty.');
          } else {
            resCol.render = function (_, record) {
              return /*#__PURE__*/_react.default.createElement(_antd.Form.Item, {
                name: [record.name, originCol.dataIndex],
                style: {
                  margin: 0
                },
                rules: typeof rules === 'function' ? rules(record) : rules,
                hidden: originCol.hidden // 这里控制FormItem是否展示
                ,
                initialValue: typeof initialValue === 'function' ? initialValue(record) : initialValue
              }, typeof component === 'function' ? component(record) : component);
            };
          }
        } else {
          resCol.render = function (_, record) {
            return /*#__PURE__*/_react.default.createElement(_antd.Form.Item, {
              name: [record.name, originCol.dataIndex],
              style: {
                margin: 0
              },
              initialValue: typeof initialValue === 'function' ? initialValue(record) : initialValue
            }, /*#__PURE__*/_react.default.createElement(Display, null));
          };
        }
      }
    }
    return resCol;
  });
}
function FormTable(props) {
  var name = props.name,
    tableColumns = props.tableColumns,
    _props$operateBtnsPos = props.operateBtnsPosition,
    operateBtnsPosition = _props$operateBtnsPos === void 0 ? 'bottom' : _props$operateBtnsPos,
    operateBtnsNode = props.operateBtnsNode,
    _props$tableProps = props.tableProps,
    tableProps = _props$tableProps === void 0 ? {
      bordered: true,
      pagination: false
    } : _props$tableProps,
    initialValue = props.initialValue;
  return /*#__PURE__*/_react.default.createElement(_antd.Form.List, {
    name: name,
    initialValue: initialValue
  }, function (fields, _ref4) {
    var add = _ref4.add,
      remove = _ref4.remove,
      move = _ref4.move;
    return /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: operateBtnsPosition === 'bottom' ? 'column' : 'column-reverse'
      }
    }, /*#__PURE__*/_react.default.createElement(StyledTable, (0, _extends2.default)({}, tableProps, {
      rowKey: function rowKey(record) {
        return record.name;
      },
      dataSource: fields,
      columns: genFormTableColumns(tableColumns, {
        add: add,
        remove: remove,
        move: move
      })
    })), operateBtnsNode ? /*#__PURE__*/_react.default.createElement("div", {
      className: "operate-btns-area"
    }, typeof operateBtnsNode === 'function' ? operateBtnsNode({
      add: add,
      remove: remove,
      move: move
    }) : operateBtnsNode) : null);
  });
}